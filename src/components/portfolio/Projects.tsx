import { Section, Reveal } from "./Section";
import { Brain } from "lucide-react";
import { Github, ExternalLink, Wallet, Hand, Users2 } from "lucide-react";
import trackifyImage from "../../assets/trackify-dashboard.png";
import gestureImage from "../../assets/gesture-media-player.png";
import crowdCountImage from "../../assets/crowd-count-analytics.png";
import hirelensImage from "../../assets/hirelensimage.png";

const projects = [
  {
    Icon: Wallet,
    title: "Trackify Finance",
    subtitle: "Expense Management Application",
    desc: "Full-stack expense management with secure JWT auth, transaction processing, REST APIs, and robust validation.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    github: "https://github.com/Sowmya1431/finance_tracker",
    accent: "from-cyan-400/30 to-blue-500/30",
    imageUrl: trackifyImage,
  },
  {
    Icon: Hand,
    title: "Gesture Controlled Media Player",
    subtitle: "Computer Vision · Real-time",
    desc: "Real-time gesture-based media controller using hand tracking, gesture recognition and low-latency action mapping.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/Sowmya1431/gesture_controlled_media_player_desktop",
    liveUrl: "https://gesture-controlled-media-player.onrender.com",
    accent: "from-purple-400/30 to-pink-500/30",
    imageUrl: gestureImage,
  },
  {
  Icon: Brain,
  title: "HireLens AI",
  subtitle: "GenAI · ATS Resume Analyzer",
  desc: "AI-powered ATS resume analyzer that matches resumes with job descriptions, calculates ATS scores, identifies missing skills, and provides resume optimization with interview preparation assistance.",
  stack: ["MERN", "Groq LLaMA", "PDF Parser"],
  github: "https://github.com/Sowmya1431/HireLens_AI",
  liveUrl: "",
  accent: "from-cyan-400/30 to-blue-500/30",
  imageUrl: hirelensImage,
},
  {
    Icon: Users2,
    title: "Crowd Count Video Analytics",
    subtitle: "AI Vision Dashboard",
    desc: "Real-time crowd analytics with YOLO object detection and a React dashboard for visualization and reliability.",
    stack: ["YOLO", "React", "Python"],
    github: "https://github.com/Sowmya1431/Crowd_count_video_analytics",
    accent: "from-emerald-400/30 to-teal-500/30",
    imageUrl: crowdCountImage,
  },
];

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured Work" subtitle="A selection of projects that showcase my engineering & AI skills.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <article className="group glass-strong rounded-2xl overflow-hidden h-full flex flex-col hover:-translate-y-2 hover:neon-glow transition-all duration-500">
              <div className={`relative h-44 bg-gradient-to-br ${p.accent} flex items-center justify-center overflow-hidden`}>
                {p.imageUrl ? (
                  <img 
                    src={p.imageUrl} 
                    alt={p.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <p.Icon className="w-16 h-16 text-white/90 relative group-hover:scale-110 transition-transform duration-500" />
                  </>
                )}
                <div className="absolute top-3 right-3 font-mono text-[10px] glass px-2 py-1 rounded">0{i + 1}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-1">{p.title}</h3>
                <p className="text-xs text-primary font-mono mb-3">{p.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/10 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg glass hover:bg-white/10 transition text-sm">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg glass hover:bg-white/10 transition text-sm">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  ) : (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--neon-2)] text-primary-foreground hover:scale-105 transition">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
