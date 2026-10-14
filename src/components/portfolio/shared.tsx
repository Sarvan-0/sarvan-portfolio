import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, X, FileText, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { emailHref, profile } from '@/lib/portfolio';
export function Logo() { return <a href="/#home" className="logo" aria-label={`${profile.name} home`}><span className="logo-name">{profile.name}</span></a>; }
export function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) { return <div className="section-heading"><div className="eyebrow"><span>{number} /</span> {label}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>; }
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const area = document.createElement('textarea');
      area.value = email; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.appendChild(area); area.select(); document.execCommand('copy'); document.body.removeChild(area);
    }
    setCopied(true);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };
  return <button type="button" className="copy-email" onClick={copy}>{copied ? <Check size={13}/> : <Copy size={13}/>}{copied ? 'Email copied' : 'Copy email'}</button>;
}
export function ConfigAction({ type, children, className = '', variant = 'outline', destination, subject }: { type: 'resume' | 'github' | 'email' | 'linkedin' | 'project'; children?: React.ReactNode; className?: string; variant?: 'default' | 'outline' | 'ghost'; destination?: string; subject?: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (!open) return;
  const previous = document.activeElement;
  const onKey = (event: KeyboardEvent) => {
   if (event.key === 'Escape') setOpen(false);
   if (event.key !== 'Tab') return;
   const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');
   const first = controls?.[0]; const last = controls?.[Math.max(0, (controls?.length ?? 0) - 1)];
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
   else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
   };
  document.addEventListener('keydown', onKey);
  const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; if (previous instanceof HTMLElement) previous.focus(); };
 }, [open]);
  const href = destination ?? (type === 'project' ? '' : profile[type]);
  const link = type === 'email' && href ? emailHref(subject) : href;
  const Icon = type === 'resume' ? Download : type === 'github' ? Github : type === 'email' ? Mail : type === 'linkedin' ? Linkedin : ArrowUpRight;
  const title = type === 'resume' ? 'Resume coming soon' : type === 'project' ? 'Project links coming soon' : `${type === 'email' ? 'Contact details' : type === 'github' ? 'GitHub profile' : 'LinkedIn profile'} coming soon`;
  return <><Button variant={variant} className={className} asChild={Boolean(href)} onClick={href ? undefined : () => setOpen(true)}>{href ? <a href={link} download={type === 'resume' ? 'developer-resume.pdf' : undefined} target={type === 'resume' || type === 'email' ? undefined : '_blank'} rel="noreferrer"><Icon size={15}/>{children}</a> : <><Icon size={15}/>{children}</>}</Button>{open && <div className="modal-backdrop" onClick={() => setOpen(false)}><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="config-title" className="config-dialog" onClick={event => event.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" aria-label="Close dialog" autoFocus onClick={() => setOpen(false)}><X/></Button><FileText className="text-primary" size={30}/><h3 id="config-title">{title}</h3><p>{type === 'resume' ? 'A resume hasn’t been uploaded yet. Please check back for the downloadable PDF.' : 'This portfolio is being personalized. Verified links will appear here when available.'}</p><Button onClick={() => setOpen(false)}>Got it <ArrowUpRight/></Button></div></div>}</>;
}
