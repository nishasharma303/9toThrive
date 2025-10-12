import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Required for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map((item: any) => item.str).join(" ");
    }
    return fullText;
  };

  const extractTextFromDocx = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value;
  };

  const handleUpload = async () => {
  if (!file) return alert("Please upload a resume first!");
  setLoading(true);

  try {
    // send the file directly to backend as form-data
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setResumeText(data.resumeText || "");
    setSkills(data.skills || []);
    // backend returns jobRecommendations (not job_titles)
    setJobTitles(data.jobRecommendations?.map((j: any) => j.title) || []);
  } catch (error) {
    console.error("Error calling backend:", error);
    alert("Error analyzing resume. Check backend logs.");
  }

  setLoading(false);
};

  const analyzeResume = (text: string) => {
    // Sample skill database
    const skillList = [
      "Python", "Java", "C++", "JavaScript", "React", "Node.js", "SQL", "HTML", "CSS", "MongoDB",
      "AWS", "Git", "Machine Learning", "Data Analysis", "TensorFlow", "Communication", "Leadership",
      "Problem Solving", "TypeScript", "Express", "Firebase"
    ];

    const matchedSkills = skillList.filter(skill =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    setSkills(matchedSkills);

    // Map skill sets to job titles
    const jobMap: Record<string, string[]> = {
      "Frontend Developer": ["React", "JavaScript", "HTML", "CSS"],
      "Backend Developer": ["Node.js", "Express", "MongoDB", "SQL"],
      "Full Stack Developer": ["React", "Node.js", "MongoDB"],
      "Data Analyst": ["Python", "SQL", "Data Analysis"],
      "ML Engineer": ["Python", "TensorFlow", "Machine Learning"],
      "Cloud Engineer": ["AWS", "DevOps", "Docker"],
    };

    const suggestedJobs = Object.entries(jobMap)
      .filter(([_, reqSkills]) =>
        reqSkills.some(skill => matchedSkills.includes(skill))
      )
      .map(([title]) => title);

    setJobTitles(suggestedJobs.length ? suggestedJobs : ["Software Developer", "Intern"]);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#011627ff] text-[#f1f7edff] px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-[#012a4aff] p-8 rounded-2xl shadow-lg border border-[#e25c28ff]/40"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-[#e25c28ff]">
          Upload Your Resume
        </h2>
        <p className="text-center mb-6">
          We’ll read your resume and suggest top skills and job roles.
        </p>

        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="text-sm"
          />

          <Button
            size="lg"
            onClick={handleUpload}
            className="bg-[#e25c28ff] hover:bg-[#e25c28cc] text-[#f1f7edff] px-8 py-5 text-lg font-semibold rounded-xl"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
            {!loading && <Upload className="ml-2" size={20} />}
          </Button>
        </div>

        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-semibold mb-3 text-[#e25c28ff]">Top Skills:</h3>
            <ul className="list-disc list-inside mb-6">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-3 text-[#e25c28ff]">
              Recommended Job Titles:
            </h3>
            <ul className="list-disc list-inside">
              {jobTitles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ResumeUpload;