// ml/kaggleJobLoader.ts
// Silent preprocessing for model training - NO UI, NO CONSOLE SPAM

import Papa from 'papaparse';

const SKILL_MAP: Record<string, string> = {
  '.net': '.NET', 'dotnet': '.NET', '.net core': '.NET Core',
  'javascript': 'JavaScript', 'js': 'JavaScript',
  'typescript': 'TypeScript', 'ts': 'TypeScript',
  'react': 'React', 'reactjs': 'React', 'react.js': 'React',
  'node': 'Node.js', 'nodejs': 'Node.js', 'node.js': 'Node.js',
  'python': 'Python', 'python3': 'Python',
  'c#': 'C#', 'csharp': 'C#', 'c++': 'C++', 'cpp': 'C++',
  'sql': 'SQL', 'sql server': 'SQL Server', 'mysql': 'MySQL',
  'postgresql': 'PostgreSQL', 'mongodb': 'MongoDB',
  'azure': 'Azure', 'aws': 'AWS', 'gcp': 'GCP',
  'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
};

function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase().trim();
  return SKILL_MAP[lower] || skill.trim();
}

function parseSkills(skillsStr: string): string[] {
  if (!skillsStr) return [];
  
  const skills = skillsStr
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      if (s.toLowerCase().includes(' with ')) {
        return s.split(/\s+with\s+/i).map(p => p.trim());
      }
      return [s];
    })
    .flat()
    .map(normalizeSkill)
    .filter(s => s.length > 1);

  return [...new Set(skills.map(s => s.toLowerCase()))].map(
    lower => skills.find(s => s.toLowerCase() === lower) || lower
  );
}

function parseExperience(expStr: string): number {
  if (!expStr) return 0;
  const lower = expStr.toLowerCase();
  
  if (lower.includes('0')) return 0;
  const plusMatch = expStr.match(/(\d+)\+/);
  if (plusMatch) return parseInt(plusMatch[1]);
  const rangeMatch = expStr.match(/(\d+)[–-](\d+)/);
  if (rangeMatch) return parseInt(rangeMatch[1]);
  const numberMatch = expStr.match(/(\d+)/);
  if (numberMatch) return parseInt(numberMatch[1]);
  
  if (lower.includes('entry') || lower.includes('fresher')) return 0;
  if (lower.includes('experienced')) return 3;
  if (lower.includes('senior')) return 5;
  
  return 2;
}

let cachedJobs: any[] | null = null;

export async function loadKaggleJobs(): Promise<any[]> {
  if (cachedJobs) return cachedJobs;

  return new Promise((resolve) => {
    Papa.parse('/datasets/job_description_2025.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        cachedJobs = (results.data as any[])
          .filter(row => row.job_id && row.title && row.required_skills)
          .map(row => {
            const requiredSkills = parseSkills(row.required_skills || '');
            const keywordSkills = parseSkills(row.keywords || '');
            const allSkills = [...new Set([...requiredSkills, ...keywordSkills])];

            return {
              job_id: row.job_id,
              title: row.title,
              experience: parseExperience(row.years_of_experience || '0'),
              skills: allSkills,
              description: row.responsibilities || '',
            };
          })
          .filter(job => job.skills.length > 0);

        resolve(cachedJobs);
      },
    });
  });
}