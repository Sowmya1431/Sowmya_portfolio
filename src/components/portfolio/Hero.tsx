import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowRight, Code2, Cpu, Database, Sparkles } from "lucide-react";
import sowmya from "@/assets/sowmya.png";

const roles = ["Full Stack Developer", "Python Developer", "MERN Stack Developer", "AI/ML Enthusiast"];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = roles[i];
    const timeout = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % roles.length); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, del, i]);
  return text;
}

const FloatIcon = ({ Icon, className, delay = 0 }: { Icon: any; className: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    className={`absolute glass rounded-2xl p-3 animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <Icon className="w-5 h-5 text-primary" />
  </motion.div>
);

export function Hero() {
  const typed = useTyping();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Available for opportunities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Hi, I'm <span className="text-gradient">Sowmya Mahanthi</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Aspiring Software Developer & AI/ML Enthusiast</p>
          <div className="h-8 font-mono text-lg text-primary mb-8">
            <span className="caret">{typed}</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#projects" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--neon-2)] text-primary-foreground font-medium neon-glow hover:scale-[1.03] transition-transform">
              View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong hover:bg-white/10 transition">
              <Download className="w-4 h-4" /> Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/10 transition">
              <Mail className="w-4 h-4" /> Contact
            </a>
          </div>
          <div className="flex gap-3">
            {[
              { Icon: Github, href: "https://github.com/Sowmya1431" },
              { Icon: Linkedin, href: "https://linkedin.com/in/sowmya-mahanthi" },
              { Icon: Mail, href: "mailto:sowmya4554sp@gmail.com" },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="glass p-3 rounded-xl hover:text-primary hover:scale-110 transition">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="relative mx-auto w-[320px] h-[420px] md:w-[380px] md:h-[480px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--neon)]/30 to-[var(--neon-2)]/30 blur-3xl" />
            <div className="relative w-full h-full glass-strong rounded-[2rem] overflow-hidden neon-border">
              <img src={sowmya} alt="Sowmya Mahanthi" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3">
                <p className="text-xs text-muted-foreground">B.Tech · AI & Data Science</p>
                <p className="text-sm font-medium">KIET for Women, Kakinada</p>
              </div>
            </div>
            <FloatIcon Icon={Code2} className="-top-4 -left-6" delay={0.3} />
            <FloatIcon Icon={Cpu} className="top-1/3 -right-8" delay={0.6} />
            <FloatIcon Icon={Database} className="-bottom-2 -left-8" delay={0.9} />
            <FloatIcon Icon={Sparkles} className="-top-6 right-10" delay={1.2} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
