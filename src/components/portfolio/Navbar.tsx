import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "problem-solving", label: "DSA" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      setScrolled(window.scrollY > 30);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,var(--neon),var(--neon-2))" }} />
      </div>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,94%)] rounded-2xl transition-all ${scrolled ? "glass-strong" : "glass"}`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <a href="#home" className="font-display font-bold text-lg">
            <span className="text-gradient">Sowmya</span>
            <span className="text-foreground">.dev</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${active === l.id ? "text-primary bg-white/5" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden flex flex-col gap-1 px-3 pb-3">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-sm rounded-lg ${active === l.id ? "text-primary bg-white/5" : "text-muted-foreground"}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </motion.header>
    </>
  );
}
