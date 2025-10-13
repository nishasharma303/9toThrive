import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { mockCandidates } from "@/pages/Recruitment/data/mockCandidates";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Candidate = {
  id: number;
  name: string;
  university?: string;
  score: number; // resume/ATS score
  matchPercent: number; // how well they match this job
  topSkills: string[];
  highlights: string[];
  yearsExp: number;
};

function makeCandidate(i: number): Candidate {
  const skills = [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "SQL",
    "Figma",
    "AWS",
    "Docker",
    "Kubernetes",
  ];
  const topSkills = [skills[i % skills.length], skills[(i + 2) % skills.length], skills[(i + 5) % skills.length]];
  return {
    id: i,
    name: `Candidate ${i + 1}`,
    university: [`IIT Delhi`, `NIT Trichy`, `BITS Pilani`, `IIIT Bangalore`][i % 4],
    score: Math.max(40, Math.round(60 + (i % 10) * 3 + (Math.random() * 10 - 5))),
    matchPercent: Math.min(99, Math.round(60 + (50 - (i % 50)) * 0.5 + (Math.random() * 10 - 5))),
    topSkills,
    highlights: [`Strong ${topSkills[0]} experience`, `Worked on 2 production projects`, `Great collaboration & communication skills`].slice(0, 3),
    yearsExp: 1 + (i % 6),
  };
}

const STACK_SIZE = 6; // how many cards to stack visually (top + a few behind)

export default function QuickHire() {
  const navigate = useNavigate();
  // map mockCandidates to internal shape
  const allCandidates = useMemo(() =>
    mockCandidates.map((c, idx) => ({
      id: Number(c.id),
      name: c.name,
      university: c.college,
      score: c.phssScore || 60,
      matchPercent: Math.min(99, Math.round((c.phssScore || 60) * 0.9 + (idx % 10))),
      topSkills: c.skills.slice(0, 4),
      highlights: c.projects?.slice(0,2).map((p:any) => p.title) || [],
      yearsExp: c.experience || 0,
    })), [] as any);

  const JOBS = [
    { id: 'j1', title: 'Frontend Engineer', skills: ['React','TypeScript','CSS'] },
    { id: 'j2', title: 'Backend Engineer', skills: ['Node.js','SQL','Docker'] },
    { id: 'j3', title: 'ML Engineer', skills: ['Python','Machine Learning','TensorFlow'] },
  ];

  const [selectedJobId, setSelectedJobId] = useState(JOBS[0].id);

  // sortedCandidates is derived from allCandidates and selected job
  const sortedCandidates = useMemo(() => {
    const job = JOBS.find(j => j.id === selectedJobId)!;
    return [...allCandidates].map(c => ({
      ...c,
      matchPercent: Math.min(99, Math.round((c.topSkills.filter((s:any) => job.skills.includes(s)).length / job.skills.length) * 100 * 0.8 + c.score * 0.2))
    })).sort((a:any,b:any) => b.matchPercent - a.matchPercent);
  }, [allCandidates, selectedJobId]);

  // lazy-load pages of candidates
  const PAGE = 25;
  const [loadedCandidates, setLoadedCandidates] = useState(() => sortedCandidates.slice(0, PAGE));

  useEffect(() => {
    // when job changes reset index and loaded candidates
    setLoadedCandidates(sortedCandidates.slice(0, PAGE));
    setIndex(0);
    setAccepted([]);
    setRejected([]);
  }, [selectedJobId]);

  const [index, setIndex] = useState(0); // index of top visible candidate
  const [accepted, setAccepted] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('acceptedCandidates')||'[]') || []; } catch { return []; }
  });
  const [rejected, setRejected] = useState<number[]>([]);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const [actionHistory, setActionHistory] = useState<{id:number, side:'accept'|'reject'}[]>([]);

  function handleDecision(id: number, side: "accept" | "reject") {
    // record action for undo
    setActionHistory((h) => [...h, { id, side }]);

    if (side === "accept") {
      setAccepted((s) => {
        const next = [...s, id];
        localStorage.setItem("acceptedCandidates", JSON.stringify(next));
        return next;
      });
    } else {
      setRejected((s) => [...s, id]);
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);

    // lazy-load next page when close to end
    if (nextIndex + 5 >= loadedCandidates.length) {
      const next = sortedCandidates.slice(loadedCandidates.length, loadedCandidates.length + PAGE);
      if (next.length) setLoadedCandidates((l) => [...l, ...next]);
    }
  }

  // jobRole derived from selectedJobId
  const jobRole = JOBS.find(j => j.id === selectedJobId)!;
  const [detailCandidate, setDetailCandidate] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Quick Hire — Top candidates</h2>
            <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Remaining: {Math.max(0, sortedCandidates.length - index)}</div>
            <div className="text-sm text-muted-foreground">Accepted: {accepted.length}</div>
            <div className="text-sm text-muted-foreground">Rejected: {rejected.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm text-muted-foreground mr-2">Job:</label>
                <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)} className="rounded-md px-2 py-1 bg-card border">
                  {JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => {
                  const last = actionHistory[actionHistory.length - 1];
                  if (!last) return;
                  setActionHistory(h => h.slice(0, -1));
                  if (last.side === 'accept') {
                    setAccepted(a => a.filter(id=>id!==last.id));
                    localStorage.setItem('acceptedCandidates', JSON.stringify(accepted.filter(id=>id!==last.id)));
                  } else {
                    setRejected(r => r.filter(id=>id!==last.id));
                  }
                  setIndex(i=>Math.max(0, i-1));
                }}>Undo</Button>
              </div>
            </div>

            <div
              ref={constraintsRef}
              className={`relative w-full mx-auto h-[760px] max-w-3xl ${detailCandidate ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
            >
              <AnimatePresence initial={false}>
                {loadedCandidates.slice(index, index + STACK_SIZE + 1).map((cand:any, i) => {
                  const position = i;
                  if (position > STACK_SIZE) return null;
                  const isTop = position === 0;
                  return (
                    <CandidateCard
                      key={cand.id}
                      candidate={cand}
                      position={position}
                      isTop={isTop}
                      onDecision={(side) => handleDecision(cand.id, side)}
                      onOpenDetail={() => setDetailCandidate(cand.id)}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <aside className="lg:col-span-1 p-4 border border-border rounded-lg h-[620px] bg-card">
            <h3 className="text-lg font-semibold">{jobRole.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">Skills: {jobRole.skills.join(', ')}</p>
            <div className="mt-6">
              <h4 className="font-medium">Shortlisted Candidates</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {accepted.map((id) => {
                  const c = allCandidates.find((x: any) => x.id === id);
                  return <li key={id} className="text-primary">{c?.name || `#${id}`}</li>;
                })}
              </ul>
              <div className="mt-4">
                <Button variant="default" onClick={() => navigate('/recruitment/matching')}>Go to Candidate Matching</Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Candidate detail modal */}
        {detailCandidate !== null && (
          (() => {
            const data = mockCandidates.find((m) => Number(m.id) === detailCandidate);
            if (!data) return null;
            return (
              <Dialog open={true} onOpenChange={(v) => { if (!v) setDetailCandidate(null); }}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{data.name}</DialogTitle>
                    <DialogDescription>{data.college} — {data.branch}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-3">
                    <p><strong>CGPA:</strong> {data.cgpa} • <strong>Experience:</strong> {data.experience} yrs</p>
                    <p><strong>Top Skills:</strong> {data.skills.slice(0,5).join(', ')}</p>
                    <div>
                      <strong>Projects:</strong>
                      <ul className="list-disc pl-5 mt-2">
                        {data.projects?.map((p, i) => (
                          <li key={i}><strong>{p.title}</strong>: {p.description}</li>
                        ))}
                      </ul>
                    </div>
                    <p><strong>PHSS Score:</strong> {data.phssScore}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })()
        )}

        <div className="flex items-center justify-center gap-6 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              const cur = loadedCandidates[index] ?? sortedCandidates[index];
              if (cur) handleDecision(cur.id, "reject");
            }}
          >
            Reject
          </Button>
          <Button
            onClick={() => {
              const cur = loadedCandidates[index] ?? sortedCandidates[index];
              if (cur) handleDecision(cur.id, "accept");
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ candidate, position, isTop, onDecision, onOpenDetail }: { candidate: Candidate; position: number; isTop: boolean; onDecision: (side: "accept" | "reject") => void; onOpenDetail?: () => void; }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-20, 20]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 0.6, 1, 0.6, 0]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
  style={{ x, rotate, opacity, zIndex: 1000 - position }}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        const vx = info.velocity.x;
        const moved = info.offset.x; // total offset in x during drag
        // decide threshold
        if (moved > 150 || vx > 500) {
          // accept -> fly right
          onDecision("accept");
        } else if (moved < -150 || vx < -500) {
          onDecision("reject");
        }
      }}
      initial={{ scale: 1 - position * 0.03, y: position * 12, opacity: 0 }}
      animate={{ scale: 1 - position * 0.03, y: position * 12, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className={`absolute left-6 top-8 w-full max-w-lg touch-none`}
    >
    <div className="bg-card border border-border rounded-2xl shadow-lg p-8 relative">
      <button onClick={(e) => { e.stopPropagation(); onOpenDetail && onOpenDetail(); }} className="absolute right-6 top-6 p-2 rounded-full bg-muted/30 hover:bg-muted/50">
      <Info className="w-4 h-4 text-muted-foreground" />
    </button>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl">
            {candidate.name.split(" ").map((s) => s[0]).slice(0,2).join("")}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{candidate.name}</h3>
              <div className="text-base text-muted-foreground">{candidate.university}</div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <Badge variant="secondary">Match {candidate.matchPercent}%</Badge>
              <div className="text-base text-muted-foreground">Score: {candidate.score}</div>
              <div className="text-base text-muted-foreground">Exp: {candidate.yearsExp} yr</div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{candidate.highlights.join(" • ")}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {candidate.topSkills.map((s) => (
                <span key={s} className="px-4 py-1 rounded-full bg-primary/10 text-primary text-base">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button variant="ghost" onClick={() => onDecision("reject")} className="grow py-3">Reject</Button>
          <Button onClick={() => onDecision("accept")} className="grow py-3 px-6 text-lg">Accept</Button>
        </div>
      </div>
    </motion.div>
  );
}
