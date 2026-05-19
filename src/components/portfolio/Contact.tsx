import { Section, Reveal } from "./Section";
import { useState } from "react";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio contact from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("email")}`);
      window.location.href = `mailto:sowmya4554sp@gmail.com?subject=${subject}&body=${body}`;
      toast.success("Opening your email client…");
      setLoading(false);
      form.reset();
    }, 600);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's Build Something" subtitle="Open to internships, full-time roles and exciting collaborations.">
      <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        <Reveal>
          <div className="lg:col-span-2 glass-strong rounded-2xl p-7 h-full">
            <h3 className="font-bold text-lg mb-5">Get in touch</h3>
            <div className="space-y-4">
              {[
                { Icon: Mail, label: "Email", value: "sowmya4554sp@gmail.com", href: "mailto:sowmya4554sp@gmail.com" },
                { Icon: Linkedin, label: "LinkedIn", value: "sowmya-mahanthi", href: "https://linkedin.com/in/sowmya-mahanthi" },
                { Icon: Github, label: "GitHub", value: "Sowmya1431", href: "https://github.com/Sowmya1431" },
                { Icon: MapPin, label: "Location", value: "Kakinada, India" },
              ].map((it) => {
                const Inner = (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><it.Icon className="w-4 h-4" /></div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{it.label}</p>
                      <p className="text-sm">{it.value}</p>
                    </div>
                  </>
                );
                return it.href ? (
                  <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 glass rounded-xl p-3 hover:bg-white/10 transition">{Inner}</a>
                ) : (
                  <div key={it.label} className="flex items-center gap-3 glass rounded-xl p-3">{Inner}</div>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-2xl p-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                <input required name="name" className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input required type="email" name="email" className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea required name="message" rows={5} className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition resize-none" placeholder="Tell me about your project or opportunity…" />
            </div>
            <button disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--neon-2)] text-primary-foreground font-medium neon-glow hover:scale-[1.03] transition disabled:opacity-60">
              {loading ? "Sending…" : "Send Message"} <Send className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
