import { Section, Reveal } from "./Section";
import { Award } from "lucide-react";

const certs = [
  { title: "Python Foundation", issuer: "Infosys Springboard" },
  { title: "Machine Learning Foundations", issuer: "IIIT" },
  { title: "MERN Stack", issuer: "Infosys Springboard" },
];

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Credentials & Learning" subtitle="Continuous learning across software engineering and AI.">
      <div className="grid md:grid-cols-3 gap-5">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <div className="glass-strong rounded-2xl p-6 h-full hover:-translate-y-1 hover:neon-glow transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/25 to-[var(--neon-2)]/25 flex items-center justify-center mb-4 group-hover:rotate-6 transition">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
