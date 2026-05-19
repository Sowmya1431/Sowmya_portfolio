import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#home" className="font-display font-bold text-lg">
          <span className="text-gradient">Sowmya</span>.dev
        </a>
        <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#skills" className="hover:text-primary transition">Skills</a>
          <a href="#projects" className="hover:text-primary transition">Projects</a>
          <a href="#experience" className="hover:text-primary transition">Experience</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </nav>
        <div className="flex gap-3">
          {[
            { Icon: Github, href: "https://github.com/Sowmya1431" },
            { Icon: Linkedin, href: "https://linkedin.com/in/sowmya-mahanthi" },
            { Icon: Mail, href: "mailto:sowmya4554sp@gmail.com" },
          ].map(({ Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="glass p-2.5 rounded-lg hover:text-primary hover:scale-110 transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} Sowmya Mahanthi. Crafted with passion & code.</p>
    </footer>
  );
}
