# app.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pdfplumber
import io
import docx
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline
import asyncio

app = FastAPI()

hf_token = "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"

# Allow your frontend origin (change to your domain in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models once at startup
# NER model for resumes
ner_pipeline = pipeline(
    "token-classification",
    model="dslim/bert-base-NER",
    aggregation_strategy="simple"
)

# Sentence transformer for resume -> job matching
embed_model = SentenceTransformer("anass1209/resume-job-matcher-all-MiniLM-L6-v2")

# Pre-defined job titles/descriptions you want to compare against.
# You can expand this list with full job descriptions for better results.
JOB_LIST = [
    {"title": "Frontend Developer", "desc": "HTML, CSS, JavaScript, React, responsive UI, frontend optimization"},
    {"title": "Backend Developer", "desc": "Node.js, Express, REST APIs, SQL/NoSQL, server-side development"},
    {"title": "Full Stack Developer", "desc": "React, Node.js, Databases, REST APIs, deployment"},
    {"title": "Data Scientist", "desc": "Python, machine learning, pandas, scikit-learn, model evaluation"},
    {"title": "Machine Learning Engineer", "desc": "TensorFlow/PyTorch, model training, MLOps, production models"},
    {"title": "DevOps Engineer", "desc": "CI/CD, Docker, Kubernetes, AWS, cloud infrastructure"},
    {"title": "Software Engineer", "desc": "General software engineering, problem solving, algorithms"},
    {"title": "QA Engineer", "desc": "Testing, automation, pytest, selenium, test frameworks"},
    {"title": "Data Analyst", "desc": "SQL, Excel, data visualization, Tableau, business insights"},
    {"title": "Cloud Engineer", "desc": "AWS/GCP/Azure, cloud architecture, IaC, terraform"}
]

# Precompute embeddings for job descriptions (at startup)
job_texts = [f"{j['title']}: {j['desc']}" for j in JOB_LIST]
job_embeddings = embed_model.encode(job_texts, convert_to_tensor=True)

class AnalysisResult(BaseModel):
    skills: list[str]
    jobRecommendations: list[dict]
    resumeText: str

def extract_text_from_pdf_bytes(data_bytes: bytes) -> str:
    text = []
    with pdfplumber.open(io.BytesIO(data_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)
    return "\n".join(text)

def extract_text_from_docx_bytes(data_bytes: bytes) -> str:
    doc = docx.Document(io.BytesIO(data_bytes))
    paras = [p.text for p in doc.paragraphs if p.text and p.text.strip()]
    return "\n".join(paras)

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_resume(file: UploadFile = File(...)):
    filename = file.filename.lower()
    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX are supported")

    data = await file.read()

    # 1) Extract text
    try:
        if filename.endswith(".pdf"):
            resume_text = extract_text_from_pdf_bytes(data)
        else:
            resume_text = extract_text_from_docx_bytes(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting text: {e}")

    if not resume_text or len(resume_text.strip()) == 0:
        raise HTTPException(status_code=400, detail="No text could be extracted from the resume")

    # 2) Run NER to extract skills (DunnBC22/ResumeNER)
    try:
        ner_results = ner_pipeline(resume_text)
        # The model returns entity groups; collect those labeled 'Skills', or fallback to 'SKILL' variants
        extracted_skills = []
        for ent in ner_results:
            lbl = ent.get("entity_group") or ent.get("entity")
            # typical label name in these resume NERs: 'SKILLS' or 'Skills' etc.
            if str(lbl).lower() in ("skills", "skill", "skil"):
                word = ent.get("word") or ent.get("entity")
                skill_clean = word.strip()
                if skill_clean and skill_clean not in extracted_skills:
                    extracted_skills.append(skill_clean)
        # If the model doesn't label as 'Skills' (some models vary), we attempt heuristic fallback:
        if not extracted_skills:
            # simple heuristic: find common skill tokens in text (very lightweight fallback)
            common_skills = ["python","java","c++","javascript","react","node.js","sql","aws","docker","tensorflow","pytorch","html","css","mongodb","git"]
            found = []
            text_lower = resume_text.lower()
            for s in common_skills:
                if s in text_lower and s not in found:
                    found.append(s)
            extracted_skills = found
    except Exception as e:
        # If NER pipeline fails, fallback to simple keyword scan
        extracted_skills = []
        text_lower = resume_text.lower()
        common_skills = ["python","java","c++","javascript","react","node.js","sql","aws","docker","tensorflow","pytorch","html","css","mongodb","git"]
        for s in common_skills:
            if s in text_lower:
                extracted_skills.append(s)

    # 3) Use embedding model to find top job matches
    try:
        # Encode resume (we can encode the whole resume_text or a skill-joined string; both work)
        # To keep embeddings smaller, we use the first 1200 chars of resume_text if it's enormous.
        snippet = resume_text if len(resume_text) < 3000 else resume_text[:3000]
        resume_emb = embed_model.encode(snippet, convert_to_tensor=True)
        sims = util.cos_sim(resume_emb, job_embeddings)[0]  # shape: (num_jobs,)
        # Build list with scores
        recs = []
        for idx, score in enumerate(sims):
            recs.append({"title": JOB_LIST[idx]["title"], "score": float(score.item())})
        recs_sorted = sorted(recs, key=lambda r: r["score"], reverse=True)
        top_recs = recs_sorted[:5]
    except Exception as e:
        top_recs = [{"title": "Software Engineer", "score": 0.0}]

    return {"skills": extracted_skills, "jobRecommendations": top_recs, "resumeText": resume_text}
