import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";

type AnalysisResult = {
  resumeText?: string;
  skills?: string[];
  jobRecommendations?: { title: string }[];
};

const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setFile(null);
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResumeText("");
    setSkills([]);
    setJobTitles([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFiles = useCallback((candidate?: File) => {
    setError(null);
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setError("File is too large. Max size is 5MB.");
      return;
    }
    setFile(candidate);
    const url = URL.createObjectURL(candidate);
    setPreviewUrl(url);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFiles(f);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleFiles(f);
  };

  const handleUpload = async () => {
    if (!file) return setError("Please choose a file first.");
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: AnalysisResult = await res.json();

      setResumeText(data.resumeText || "");
      setSkills(data.skills || []);
      setJobTitles(data.jobRecommendations?.map(j => j.title) || []);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Check backend or network.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#011627ff] text-[#f1f7edff] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#012a4aff] p-8 rounded-2xl shadow-lg border border-[#e25c28ff]/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1 text-[#e25c28ff]">Upload Your Resume</h2>
            <p className="text-sm text-muted-foreground">Drag & drop or click to choose a PDF / DOCX. We’ll analyze and suggest skills & job matches.</p>
          </div>
          <div className="flex items-center gap-2">
            {file && (
              <button aria-label="clear file" onClick={reset} className="p-2 rounded-md bg-[#e25c28ff]/10 hover:bg-[#e25c28ff]/20">
                <X className="h-4 w-4 text-[#e25c28ff]" />
              </button>
            )}
          </div>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className={`mt-6 border-2 ${error ? "border-red-500" : "border-dashed border-[#e25c28ff]/30"} rounded-lg p-6 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-transparent to-[#00000033]`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputRef.current) inputRef.current.click();
          }}
        >
          {!file ? (
            <>
              <Upload className="h-12 w-12 text-[#e25c28ff]" />
              <p className="font-medium">Drag & drop your resume here</p>
              <p className="text-xs text-muted-foreground">PDF or DOCX — max 5MB</p>
              <input ref={inputRef} id="resume-upload" type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
              <Button variant="ghost" className="mt-2" onClick={() => inputRef.current?.click()}>Choose file</Button>
            </>
          ) : (
            <div className="w-full flex items-center gap-4">
              <div className="flex items-center justify-center w-24 h-32 bg-[#091826] rounded-md border border-[#e25c28ff]/20">
                <FileText className="h-10 w-10 text-[#e25c28ff]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div>
                    <Button size="sm" onClick={handleUpload} disabled={loading} className="bg-[#e25c28ff] hover:bg-[#e25c28cc] text-[#f1f7edff]">
                      {loading ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </div>
                {previewUrl && (
                  <div className="mt-3">
                    <object data={previewUrl} type="application/pdf" className="w-full h-48 rounded-md border border-[#e25c28ff]/10" aria-label="resume preview" />
                  </div>
                )}
                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
              </div>
            </div>
          )}
        </div>

        {(skills.length > 0 || jobTitles.length > 0 || resumeText) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-6">
            {skills.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mb-2 text-[#e25c28ff]">Top Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <li key={i} className="px-3 py-1 bg-[#0f3b53] rounded-full text-sm">{s}</li>
                  ))}
                </ul>
              </>
            )}

            {jobTitles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-[#e25c28ff]">Recommended Roles</h3>
                <ul className="list-disc list-inside">
                  {jobTitles.map((j, idx) => <li key={idx}>{j}</li>)}
                </ul>
              </div>
            )}

            {resumeText && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-[#e25c28ff]">Resume Text</h3>
                <div className="max-h-48 overflow-auto text-sm p-3 rounded-md bg-[#031621] border border-[#e25c28ff]/6">{resumeText}</div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ResumeUpload;