import { Section, Reveal } from "./Section";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
} from "lucide-react";

const LEETCODE_USERNAME = "sowmya4554sp";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

// Authentic baseline stats (provided by the user). Live API overrides if available.
const FALLBACK = {
  totalSolved: 158,
  easy: 115,
  medium: 42,
  hard: 1,
  maxStreak: 20,
  activeDays: 75,
  totalSubmissions: 286,
};

type Stats = typeof FALLBACK & { calendar?: Record<string, number> };

function Counter({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / duration, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Build a 53-week heatmap grid (GitHub-style) from {YYYY-MM-DD: count}
function Heatmap({ calendar }: { calendar: Record<string, number> }) {
  const weeks = useMemo(() => {
    const today = new Date();
    const days: { date: string; count: number }[] = [];
    // Start ~52 weeks back, aligned to Sunday
    const start = new Date(today);
    start.setDate(start.getDate() - 52 * 7);
    start.setDate(start.getDate() - start.getDay());
    for (let i = 0; i < 53 * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: calendar[key] ?? 0 });
    }
    const cols: { date: string; count: number }[][] = [];
    for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
    return cols;
  }, [calendar]);

  const intensity = (c: number) => {
    if (c <= 0) return "bg-white/5";
    if (c === 1) return "bg-primary/25";
    if (c <= 3) return "bg-primary/50";
    if (c <= 6) return "bg-primary/75";
    return "bg-primary";
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-[3px] min-w-full">
        {weeks.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count} submission${d.count === 1 ? "" : "s"}`}
                className={`w-[10px] h-[10px] rounded-[2px] ${intensity(d.count)} transition-colors`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-white/5" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/25" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/50" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/75" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary" />
        <span>More</span>
      </div>
    </div>
  );
}

export function ProblemSolving() {
  const [stats, setStats] = useState<Stats>(FALLBACK);
  const [live, setLive] = useState(false);

  // Try public LeetCode mirrors. Fail silently → keep authentic fallback.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
        if (!res.ok) throw new Error("api");
        const j = await res.json();
        if (cancelled || !j) return;
        const next: Stats = {
          totalSolved: j.totalSolved ?? FALLBACK.totalSolved,
          easy: j.easySolved ?? FALLBACK.easy,
          medium: j.mediumSolved ?? FALLBACK.medium,
          hard: j.hardSolved ?? FALLBACK.hard,
          maxStreak: FALLBACK.maxStreak,
          activeDays: FALLBACK.activeDays,
          totalSubmissions: j.totalSubmissions?.[0]?.submissions ?? FALLBACK.totalSubmissions,
        };
        // Calendar
        try {
          const cal = await fetch(`https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${LEETCODE_USERNAME}`);
          if (cal.ok) {
            const cj = await cal.json();
            const raw = cj?.data?.matchedUser?.userCalendar?.submissionCalendar;
            if (raw) {
              const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
              const map: Record<string, number> = {};
              let streak = 0;
              let active = 0;
              for (const [ts, count] of Object.entries(parsed)) {
                const d = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
                map[d] = Number(count);
                if (Number(count) > 0) active++;
              }
              next.calendar = map;
              next.activeDays = active || FALLBACK.activeDays;
              const cu = cj?.data?.matchedUser?.userCalendar;
              if (cu?.streak) streak = cu.streak;
              if (streak) next.maxStreak = streak;
            }
          }
        } catch {}
        if (!cancelled) {
          setStats(next);
          setLive(true);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const difficultyCards = [
    { label: "Easy", value: stats.easy, color: "from-emerald-400/20 to-emerald-600/20", textColor: "text-emerald-400" },
    { label: "Medium", value: stats.medium, color: "from-amber-400/20 to-orange-500/20", textColor: "text-amber-400" },
    { label: "Hard", value: stats.hard, color: "from-rose-400/20 to-rose-600/20", textColor: "text-rose-400" },
  ];

  const statCards = [
    { label: "Max Streak", value: stats.maxStreak, unit: "days" },
    { label: "Active Coding", value: stats.activeDays, unit: "days" },
    { label: "Total Submissions", value: stats.totalSubmissions },
  ];

  return (
    <Section
      id="problem-solving"
      eyebrow="LeetCode & Problem Solving"
      title="Consistent DSA Practice"
      subtitle="Clean, professional approach to Data Structures and Algorithms."
    >
      {/* Main hero section - Left/Right layout */}
      <Reveal>
        <div className="glass-strong rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side: Logo, Username, Description */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-xs font-mono mb-5">
                <span className={`w-2 h-2 rounded-full ${live ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                {live ? "Live from LeetCode" : "Verified profile"}
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2">
                <Counter to={stats.totalSolved} suffix="+" />
              </h3>
              <p className="text-lg text-muted-foreground mb-6 font-medium">
                Problems Solved
              </p>
              
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm">
                I regularly practice Data Structures and Algorithms on LeetCode to improve logical thinking, debugging, and problem-solving skills.
              </p>
              
              <a
                href={LEETCODE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:neon-glow transition text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" /> View My Profile
              </a>
            </div>

            {/* Right Side: Stats Cards */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {difficultyCards.map((d) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`glass rounded-xl p-4 text-center border border-primary/10 bg-gradient-to-br ${d.color}`}
                  >
                    <div className={`text-2xl font-bold ${d.textColor}`}>
                      <Counter to={d.value} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{d.label}</p>
                  </motion.div>
                ))}
              </div>

              {statCards.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 flex items-center justify-between border border-primary/10 hover:bg-white/5 transition"
                >
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="text-xl font-bold text-gradient">
                    <Counter to={s.value} suffix={s.unit ? ` ${s.unit}` : ""} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Closing statement */}
      <Reveal>
        <div className="glass rounded-2xl p-6 border-l-2 border-primary">
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-primary font-semibold">Strong focus:</span> Python and DSA practice. 
            <span className="text-primary font-semibold ml-3">Mindset:</span> Consistent learner, 
            improving developer, disciplined coder with a strong problem-solving mindset.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
