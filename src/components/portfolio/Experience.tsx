import { Section, Reveal } from "./Section";
import { Briefcase } from "lucide-react";

const items = [
  {
    role: "Python Full Stack Intern",
    company: "Infosys Springboard",
    duration: "Oct – Dec 2025",
    bullets: ["Developed Flask REST APIs", "Integrated React frontend with backend", "API validation and debugging", "Collaborated through Git workflows"],
  },
  {
    role: "Applied AI Intern",
    company: "Edunet Foundation",
    duration: "2024 – 2025",
    bullets: ["Performed data preprocessing", "Trained and evaluated ML models", "Integrated models into AI workflows"],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've Worked" subtitle="Real-world internships building production-grade software & AI systems.">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        {items.map((it, i) => (
          <Reveal key={it.role} delay={i * 0.15}>
            <div className={`relative mb-10 md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div]:col-start-2" : ""}`}>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[var(--neon)] to-[var(--neon-2)] neon-glow ring-4 ring-background" />
              <div className="ml-12 md:ml-0 glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs text-primary">{it.duration}</span>
                </div>
                <h3 className="font-bold text-lg">{it.role}</h3>
                <p className="text-sm text-muted-foreground mb-3">{it.company}</p>
                <ul className="space-y-1.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">▹</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
