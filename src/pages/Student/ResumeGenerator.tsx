import React, { useRef, useState, useEffect } from "react";
import { FileDown, Plus, X, Upload, Trash, Eye, Save, Sparkles, Copy, CheckCircle } from "lucide-react";

const ResumeGenerator = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState([
    { company: "", role: "", duration: "", description: "" },
  ]);

  const [educations, setEducations] = useState([
    { institution: "", degree: "", year: "", gpa: "" },
  ]);

  const [skills, setSkills] = useState("");
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [showPreview, setShowPreview] = useState(true);
  const [template, setTemplate] = useState("modern");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  const [projects, setProjects] = useState([
    { name: "", description: "", technologies: "", duration: "", link: "" },
  ]);

  const [certifications, setCertifications] = useState([
    { name: "", issuer: "", date: "", id: "" },
  ]);

  const [achievements, setAchievements] = useState([
    { title: "", description: "", date: "" },
  ]);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (!autoSaveEnabled) return;
    const timer = setTimeout(() => {
      showNotification("Progress auto-saved", "success");
    }, 3000);
    return () => clearTimeout(timer);
  }, [personalInfo, experiences, educations, skills, projects, certifications, achievements, template, autoSaveEnabled]);

  const skillSuggestions = {
    "Programming": ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust", "Swift"],
    "Web Dev": ["React", "Vue", "Angular", "Next.js", "Node.js", "Express", "Django", "Flask"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "Redis", "Elasticsearch", "BigQuery"],
    "Cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
    "Tools": ["Git", "Jenkins", "GitHub Actions", "Jira", "Figma", "Postman"]
  };

  const addSkillFromSuggestion = (skill) => {
    if (!skills.includes(skill)) {
      setSkills(prev => prev ? `${prev}, ${skill}` : skill);
      showNotification(`Added ${skill}`, "success");
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", duration: "", description: "" }]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducations([...educations, { institution: "", degree: "", year: "", gpa: "" }]);
  };

  const removeEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", technologies: "", duration: "", link: "" }]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuer: "", date: "", id: "" }]);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: "", description: "", date: "" }]);
  };

  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  // Build resume HTML string (print-ready, black & white)
  const buildHTML = () => {
    const printStyles = `
      /* Force black & white for print/PDF */
      html, body { background: #fff; color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; line-height: 1.45; }
      .header { padding-bottom: 10px; margin-bottom: 20px; }
      .header h1 { margin: 0 0 6px 0; font-size: 28px; font-weight: 700; }
      .header .contact { font-size: 12px; color: #222; }
      .section { margin: 18px 0; }
      .section-title { font-size: 14px; font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 6px; margin-bottom: 10px; }
      .item { margin-bottom: 12px; }
      .item-title { font-weight: 700; font-size: 13px; }
      .item-subtitle { color: #111; font-size: 12px; margin: 2px 0; }
      .item-description { margin-top: 6px; white-space: pre-line; font-size: 12px; }
      .skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .skill-tag { border: 1px solid #000; color: #000; padding: 4px 8px; border-radius: 3px; font-size: 12px; }
      @media print { @page { margin: 20mm; } }
    `;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.name || 'Resume'}</title>
  <style>${printStyles}</style>
</head>
<body>
  <div class="header">
    <h1>${personalInfo.name || 'Your Name'}</h1>
    <div class="contact">${personalInfo.email || 'email@example.com'} | ${personalInfo.phone || '+1234567890'} | ${personalInfo.location || 'Location'}</div>
  </div>

  ${personalInfo.summary ? `
  <div class="section">
    <div class="section-title">PROFESSIONAL SUMMARY</div>
    <div>${personalInfo.summary}</div>
  </div>
  ` : ''}

  ${experiences.some(e => e.company || e.role) ? `
  <div class="section">
    <div class="section-title">WORK EXPERIENCE</div>
    ${experiences.filter(e => e.company || e.role).map(exp => `
      <div class="item">
        <div class="item-title">${exp.role || 'Position'}</div>
        <div class="item-subtitle">${exp.company || 'Company'} | ${exp.duration || 'Duration'}</div>
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${educations.some(e => e.institution || e.degree) ? `
  <div class="section">
    <div class="section-title">EDUCATION</div>
    ${educations.filter(e => e.institution || e.degree).map(edu => `
      <div class="item">
        <div class="item-title">${edu.degree || 'Degree'}</div>
        <div class="item-subtitle">${edu.institution || 'Institution'} | ${edu.year || 'Year'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${projects.some(p => p.name || p.description) ? `
  <div class="section">
    <div class="section-title">PROJECTS</div>
    ${projects.filter(p => p.name || p.description).map(proj => `
      <div class="item">
        <div class="item-title">${proj.name || 'Project'}</div>
        <div class="item-subtitle">${[proj.technologies ? 'Tech: ' + proj.technologies : null, proj.duration, proj.link].filter(Boolean).join(' | ')}</div>
        ${proj.description ? `<div class="item-description">${proj.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${certifications.some(c => c.name) ? `
  <div class="section">
    <div class="section-title">CERTIFICATIONS</div>
    ${certifications.filter(c => c.name).map(cert => `
      <div class="item">
        <div class="item-title">${cert.name}</div>
        <div class="item-subtitle">${[cert.issuer, cert.date, cert.id ? 'ID: ' + cert.id : null].filter(Boolean).join(' | ')}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${achievements.some(a => a.title) ? `
  <div class="section">
    <div class="section-title">ACHIEVEMENTS</div>
    ${achievements.filter(a => a.title).map(ach => `
      <div class="item">
        <div class="item-title">${ach.title}</div>
        ${ach.date ? `<div class="item-subtitle">${ach.date}</div>` : ''}
        ${ach.description ? `<div class="item-description">${ach.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${skills ? `
  <div class="section">
    <div class="section-title">SKILLS</div>
    <div class="skills">${skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}</div>
  </div>
  ` : ''}
</body>
</html>`;

    return html;
  };

  const downloadHTML = () => {
    const html = buildHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name || 'Resume'}-ATS.html`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Resume downloaded successfully!', 'success');
  };

  // Generate PDF by printing an offscreen iframe containing the resume HTML.
  // The user can then choose "Save as PDF" in the print dialog.
  const generatePDF = () => {
    const html = buildHTML();
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.srcdoc = html;
    document.body.appendChild(iframe);

    const cleanup = () => {
      try { document.body.removeChild(iframe); } catch (e) {}
    };

    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        // Small timeout to allow rendering in some browsers
        setTimeout(() => {
          try {
            iframe.contentWindow?.print();
          } catch (err) {
            // fallback: open in new window
            const w = window.open();
            if (w) {
              w.document.write(html);
              w.document.close();
              w.focus();
              w.print();
            }
          } finally {
            cleanup();
            showNotification('Print dialog opened — choose "Save as PDF" to export.', 'info');
          }
        }, 250);
      } catch (e) {
        cleanup();
        showNotification('Unable to generate PDF automatically. HTML file download is available.', 'error');
      }
    };
  };

  const copyAsText = () => {
    let text = `${personalInfo.name || 'Your Name'}\n`;
    text += `${personalInfo.email || 'email@example.com'} | ${personalInfo.phone || '+1234567890'} | ${personalInfo.location || 'Location'}\n\n`;

    if (personalInfo.summary) {
      text += `PROFESSIONAL SUMMARY\n${personalInfo.summary}\n\n`;
    }

    if (experiences.some(e => e.company || e.role)) {
      text += `WORK EXPERIENCE\n`;
      experiences.filter(e => e.company || e.role).forEach(exp => {
        text += `\n${exp.role || 'Position'}\n`;
        text += `${exp.company || 'Company'} | ${exp.duration || 'Duration'}\n`;
        if (exp.description) text += `${exp.description}\n`;
      });
      text += '\n';
    }

    if (educations.some(e => e.institution || e.degree)) {
      text += `EDUCATION\n`;
      educations.filter(e => e.institution || e.degree).forEach(edu => {
        text += `\n${edu.degree || 'Degree'}\n`;
        text += `${edu.institution || 'Institution'} | ${edu.year || 'Year'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}\n`;
      });
      text += '\n';
    }

    if (projects.some(p => p.name)) {
      text += `PROJECTS\n`;
      projects.filter(p => p.name).forEach(p => {
        text += `\n${p.name}\n`;
        if (p.technologies || p.duration) text += `${[p.technologies, p.duration].filter(Boolean).join(' | ')}\n`;
        if (p.description) text += `${p.description}\n`;
      });
      text += '\n';
    }

    if (certifications.some(c => c.name)) {
      text += `CERTIFICATIONS\n`;
      certifications.filter(c => c.name).forEach(c => {
        text += `\n${c.name}\n`;
        text += `${[c.issuer, c.date].filter(Boolean).join(' | ')}\n`;
      });
      text += '\n';
    }

    if (achievements.some(a => a.title)) {
      text += `ACHIEVEMENTS\n`;
      achievements.filter(a => a.title).forEach(a => {
        text += `\n${a.title}${a.date ? ` (${a.date})` : ''}\n`;
        if (a.description) text += `${a.description}\n`;
      });
      text += '\n';
    }

    if (skills) {
      text += `SKILLS\n${skills}\n`;
    }

    navigator.clipboard.writeText(text);
    showNotification("Resume copied to clipboard!", "success");
  };

  const quickFill = () => {
    setPersonalInfo({
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Results-driven Software Engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies."
    });
    setExperiences([
      {
        company: "Tech Corp",
        role: "Senior Software Engineer",
        duration: "Jan 2021 - Present",
        description: "• Led development of microservices architecture\n• Improved application performance by 40%\n• Mentored team of 5 junior developers"
      }
    ]);
    setEducations([
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2015 - 2019",
        gpa: "3.8/4.0"
      }
    ]);
    setSkills("JavaScript, TypeScript, React, Node.js, Python, AWS, Docker");
    showNotification("Sample data loaded!", "success");
  };

  const skillKeywords = ["JavaScript","TypeScript","React","Node.js","Python","SQL","AWS","Docker","Kubernetes","HTML","CSS"];

  const detectSkillsFromText = (text) => {
    const found = [];
    for (const k of skillKeywords) {
      const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (re.test(text)) found.push(k);
    }
    return Array.from(new Set(found));
  };

  const handleImportResume = async (file) => {
    const f = file ?? fileInputRef.current?.files?.[0];
    if (!f) return;
    try {
      showNotification("Importing resume...", "info");
      const text = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve((e.target?.result) ?? "");
        reader.onerror = reject;
        reader.readAsText(f);
      });
      const skillsFound = detectSkillsFromText(text);
      if (skillsFound.length) {
        setDetectedSkills(skillsFound);
        setSkills(prev => prev ? prev + ", " + skillsFound.join(", ") : skillsFound.join(", "));
        showNotification(`Detected ${skillsFound.length} skills`, "success");
      }
    } catch (err) {
      showNotification("Failed to import resume", "error");
    }
  };

  const removeDetectedSkill = (s) => {
    setDetectedSkills(prev => prev.filter(x => x !== s));
    setSkills(prev => prev.split(",").map(p => p.trim()).filter(x => x && x !== s).join(", "));
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#011627ff', color: '#e25c28ff' }}>
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              ATS Resume Generator
            </h1>
            <p style={{ color: '#f1f7edff' }}>Create professional, ATS-friendly resumes</p>
          </div>
          <button onClick={quickFill} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600">
            <Sparkles className="h-4 w-4 mr-2 inline" />
            Quick Fill
          </button>
        </div>

  {/* Control Bar */}
  <div className="border-2 border-blue-100 rounded-lg shadow-lg p-4" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
          <div className="flex flex-wrap gap-3 items-center">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".txt,.doc,.docx" 
              className="hidden" 
              onChange={(e) => handleImportResume(e.target.files?.[0])} 
            />
            <button onClick={() => fileInputRef.current?.click()} className="border rounded px-3 py-2 hover:bg-slate-100">
              <Upload className="h-4 w-4 mr-2 inline" /> Import
            </button>

            <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-1.5" style={{ backgroundColor: 'transparent' }}>
              <label className="text-sm font-semibold">Template:</label>
              <select 
                value={template} 
                onChange={(e) => setTemplate(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="compact">Compact</option>
              </select>
            </div>

            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="border rounded px-3 py-2 hover:bg-slate-100"
            >
              <Eye className="h-4 w-4 mr-2 inline" />
              Preview
            </button>

            <div className="ml-auto flex gap-2">
              <button onClick={copyAsText} className="border rounded px-3 py-2 hover:opacity-90" style={{ color: '#e25c28ff' }}>
                <Copy className="h-4 w-4 mr-2 inline" />
                Copy Text
              </button>
              <button onClick={downloadHTML} className="text-black rounded px-4 py-2 hover:opacity-90" style={{ backgroundColor: '#f1f7edff' }}>
                <FileDown className="h-4 w-4 mr-2 inline" />
                Download HTML
              </button>
              <button onClick={generatePDF} className="bg-black text-white rounded px-4 py-2 hover:opacity-90">
                <FileDown className="h-4 w-4 mr-2 inline" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

  {/* Skill Suggestions */}
  <div className="border-2 border-purple-100 rounded-lg p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
    <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#e25c28ff' }}>
            <Sparkles className="h-5 w-5" />
            Quick Add Skills
          </h3>
          <div className="space-y-3">
            {Object.entries(skillSuggestions).map(([category, skillList]) => (
              <div key={category}>
                <div className="text-xs font-semibold mb-2" style={{ color: '#f1f7edff' }}>{category}</div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkillFromSuggestion(skill)}
                      className="px-3 py-1 rounded-full border text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(226,92,40,0.32)' }}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="border-2 border-blue-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#e25c28ff' }}>Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold block text-sm mb-1">Full Name *</label>
                  <input
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full border-2 rounded px-3 py-2"
                    style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                  />
                </div>
                <div>
                  <label className="font-semibold block text-sm mb-1">Email *</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full border-2 rounded px-3 py-2"
                    style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                  />
                </div>
                <div>
                  <label className="font-semibold block text-sm mb-1">Phone *</label>
                  <input
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full border-2 rounded px-3 py-2"
                    style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                  />
                </div>
                <div>
                  <label className="font-semibold block text-sm mb-1">Location</label>
                  <input
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    placeholder="City, State"
                    className="w-full border-2 rounded px-3 py-2"
                    style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                  />
                </div>
                <div>
                  <label className="font-semibold block text-sm mb-1">Professional Summary</label>
                  <textarea
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                    placeholder="Your professional summary..."
                    rows={3}
                    className="w-full border-2 rounded px-3 py-2"
                    style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="border-2 border-green-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#e25c28ff' }}>Work Experience</h2>
                <button onClick={addExperience} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  <Plus className="h-4 w-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 pl-3 py-2" style={{ borderLeftColor: '#e25c28ff' }}>
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[i].company = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Company"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[i].role = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Role"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[i].duration = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Duration"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[i].description = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <button onClick={() => removeExperience(i)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline mr-1" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="border-2 border-yellow-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#e25c28ff' }}>Education</h2>
                <button onClick={addEducation} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
                  <Plus className="h-4 w-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {educations.map((edu, i) => (
                  <div key={i} className="border-l-4 pl-3 py-2" style={{ borderLeftColor: '#e25c28ff' }}>
                    <input
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...educations];
                        updated[i].institution = e.target.value;
                        setEducations(updated);
                      }}
                      placeholder="Institution"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...educations];
                        updated[i].degree = e.target.value;
                        setEducations(updated);
                      }}
                      placeholder="Degree"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={edu.year}
                      onChange={(e) => {
                        const updated = [...educations];
                        updated[i].year = e.target.value;
                        setEducations(updated);
                      }}
                      placeholder="Year"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={edu.gpa}
                      onChange={(e) => {
                        const updated = [...educations];
                        updated[i].gpa = e.target.value;
                        setEducations(updated);
                      }}
                      placeholder="GPA"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <button onClick={() => removeEducation(i)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline mr-1" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="border-2 border-red-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#e25c28ff' }}>Skills</h2>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, ..."
                rows={4}
                className="w-full border-2 rounded px-3 py-2"
                style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
              />
              {detectedSkills.length > 0 && (
                <div className="mt-3 p-3 rounded border" style={{ borderColor: 'rgba(241,247,237,0.06)', backgroundColor: 'transparent' }}>
                  <div className="text-sm font-semibold mb-2" style={{ color: '#f1f7edff' }}>Detected Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {detectedSkills.map(s => (
                      <button 
                        key={s} 
                        onClick={() => removeDetectedSkill(s)} 
                        className="px-2 py-1 rounded text-sm"
                        style={{ backgroundColor: '#011627ff', color: '#f1f7edff', border: '1px solid rgba(226,92,40,0.18)' }}
                      >
                        {s} <X className="h-3 w-3 inline ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="border-2 border-indigo-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#e25c28ff' }}>Projects</h2>
                <button onClick={addProject} className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                  <Plus className="h-4 w-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {projects.map((proj, i) => (
                  <div key={i} className="border-l-4 pl-3 py-2" style={{ borderLeftColor: '#e25c28ff' }}>
                    <input
                      value={proj.name}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].name = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Project Name"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={proj.technologies}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].technologies = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Technologies"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <textarea
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].description = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={proj.duration}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].duration = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Duration"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={proj.link}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].link = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="Link (optional)"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <button onClick={() => removeProject(i)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline mr-1" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="border-2 border-orange-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#e25c28ff' }}>Certifications</h2>
                <button onClick={addCertification} className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
                  <Plus className="h-4 w-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="border-l-4 pl-3 py-2" style={{ borderLeftColor: '#e25c28ff' }}>
                    <input
                      value={cert.name}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[i].name = e.target.value;
                        setCertifications(updated);
                      }}
                      placeholder="Certification Name"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[i].issuer = e.target.value;
                        setCertifications(updated);
                      }}
                      placeholder="Issuer"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={cert.date}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[i].date = e.target.value;
                        setCertifications(updated);
                      }}
                      placeholder="Date"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={cert.id}
                      onChange={(e) => {
                        const updated = [...certifications];
                        updated[i].id = e.target.value;
                        setCertifications(updated);
                      }}
                      placeholder="Certificate ID"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <button onClick={() => removeCertification(i)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline mr-1" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="border-2 border-pink-100 rounded-lg shadow-md p-6" style={{ backgroundColor: 'transparent', color: '#f1f7edff', borderColor: '#e25c28ff' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#e25c28ff' }}>Achievements</h2>
                <button onClick={addAchievement} className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700">
                  <Plus className="h-4 w-4 inline mr-1" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {achievements.map((ach, i) => (
                  <div key={i} className="border-l-4 pl-3 py-2" style={{ borderLeftColor: '#e25c28ff' }}>
                    <input
                      value={ach.title}
                      onChange={(e) => {
                        const updated = [...achievements];
                        updated[i].title = e.target.value;
                        setAchievements(updated);
                      }}
                      placeholder="Achievement Title"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <input
                      value={ach.date}
                      onChange={(e) => {
                        const updated = [...achievements];
                        updated[i].date = e.target.value;
                        setAchievements(updated);
                      }}
                      placeholder="Date"
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <textarea
                      value={ach.description}
                      onChange={(e) => {
                        const updated = [...achievements];
                        updated[i].description = e.target.value;
                        setAchievements(updated);
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full border rounded px-2 py-1 mb-2 text-sm"
                      style={{ backgroundColor: '#011627ff', color: '#f1f7edff', borderColor: 'rgba(241,247,237,0.06)' }}
                    />
                    <button onClick={() => removeAchievement(i)} className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline mr-1" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview area */}
        {showPreview && (
          <div className="mt-6 border rounded-lg p-2" style={{ backgroundColor: 'transparent', color: '#f1f7edff' }}>
            <div className="text-sm font-semibold mb-2" style={{ color: '#f1f7edff' }}>Preview</div>
            <iframe
              title="Resume Preview"
              style={{ width: '100%', minHeight: 600, border: '1px solid rgba(241,247,237,0.08)', background: '#fff' }}
              srcDoc={buildHTML()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeGenerator;