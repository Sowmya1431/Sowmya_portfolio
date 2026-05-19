import { Section, Reveal } from "./Section";
import { GraduationCap, Lightbulb, Users, Code2, Brain } from "lucide-react";

const highlights = [
  { Icon: Lightbulb, title: "Real-world Impact", desc: "Passionate about solving meaningful problems with code." },
  { Icon: Brain, title: "AI & ML Focused", desc: "Deep interest in machine learning and intelligent systems." },
  { Icon: Code2, title: "Clean Code", desc: "Writing efficient, scalable, and maintainable software." },
  { Icon: Users, title: "Collaboration", desc: "Strong team player with great communication skills." },
];

export function About() {
  return (
    <Section id="about" eyebrow="About Me" title="Crafting Software, One Idea at a Time" subtitle="A short story about who I am and what drives me.">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <Reveal>
          <div className="glass-strong rounded-2xl p-8">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Aspiring Software Engineer with strong foundations in <span className="text-foreground font-medium">full-stack development</span> and <span className="text-foreground font-medium">AI/ML</span>. Experienced in building scalable web applications using MERN stack and Flask, along with integrating machine learning models into real-time systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Passionate about writing clean, efficient code and solving complex problems through a sharp problem-solving mindset and continuous learning.
            </p>
            <div className="mt-8 glass rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary"><GraduationCap className="w-6 h-6" /></div>
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-widest">Education</p>
                <h4 className="text-lg font-semibold mt-1">B.Tech – Artificial Intelligence & Data Science</h4>
                <p className="text-muted-foreground text-sm">KIET for Women, Kakinada</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.06] hover:-translate-y-1 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--neon)]/20 to-[var(--neon-2)]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <h.Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{h.title}</h4>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
