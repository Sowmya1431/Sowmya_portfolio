import { Section, Reveal } from "./Section";
import { Code, Layout, Server, Database, Brain, Wrench, Lightbulb } from "lucide-react";

const groups = [
  { Icon: Code, title: "Languages", items: ["Python", "JavaScript"] },
  { Icon: Layout, title: "Frontend", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
  { Icon: Server, title: "Backend", items: ["Node.js", "Express.js", "Flask", "REST APIs"] },
  { Icon: Database, title: "Databases", items: ["MongoDB", "MySQL"] },
  { Icon: Brain, title: "AI / ML", items: ["TensorFlow", "YOLO", "OpenCV", "Pandas", "NumPy"] },
  { Icon: Wrench, title: "Tools", items: ["Git", "GitHub", "VS Code", "Postman"] },
  { Icon: Lightbulb, title: "Core Concepts", items: ["OOP", "DSA", "Problem Solving", "Debugging", "Team Collaboration"] },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="My Tech Arsenal" subtitle="The tools, languages and frameworks I work with daily.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}>
            <div className="glass-strong rounded-2xl p-6 h-full hover:-translate-y-1 hover:neon-glow transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--neon)]/25 to-[var(--neon-2)]/25 flex items-center justify-center group-hover:scale-110 transition">
                  <g.Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold">{g.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full text-xs glass border border-white/10 hover:text-primary hover:border-primary/40 transition">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
