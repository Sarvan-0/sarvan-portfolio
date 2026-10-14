import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Download, Github, Mail, Linkedin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile, emailHref } from '@/lib/portfolio';

const nav = [
  ['Home', '/'], ['About', '/about'], ['Skills', '/skills'], ['Projects', '/projects'],
  ['Experience', '/experience'], ['Blog', '/blog'], ['Contact', '/contact'],
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  return <>
    <header className="site-header"><div className="nav-shell">
      <Link to="/" className="logo" aria-label="Sarvan C home"><span className="logo-name">Sarvan C</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, to]) => <Link key={to} to={to} className={pathname === to || (to === '/blog' && pathname.startsWith('/blog/')) ? 'active' : ''}>{label}</Link>)}</nav>
      <div className="nav-actions"><Button asChild variant="outline" className="nav-resume"><a href="/resume.pdf" download="Sarvan_C_Resume.pdf"><Download size={14}/> Resume <ArrowUpRight size={14}/></a></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button></div>
    </div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label, to]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={15}/></Link>)}</nav>}</header>
    {children}
    <footer className="site-footer container"><Link to="/" className="logo"><span className="logo-name">Sarvan C</span></Link><nav className="footer-links" aria-label="Contact links"><a href={emailHref('Opportunity for Sarvan C')} aria-label="Email Sarvan"><Mail size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={14}/></a></nav><p>© 2026 {profile.name}. Built with curiosity and code.</p><Link to="/">HOME <ArrowUpRight size={13}/></Link></footer>
  </>;
}
