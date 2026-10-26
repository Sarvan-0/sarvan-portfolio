import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Github, Mail, Linkedin } from 'lucide-react';
import { profile, emailHref } from '@/lib/portfolio';
import GooeyNav from '@/components/portfolio/GooeyNav';

const nav = [
  ['Home', '/'], ['About', '/about'], ['Skills', '/skills'], ['Projects', '/projects'],
  ['Experience', '/experience'], ['Blog', '/blog'], ['Contact', '/contact'],
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: state => state.location.pathname });
  return <>
    <header className="site-header"><div className="nav-shell">
      <GooeyNav
        items={nav.map(([label, href]) => ({ label, href }))}
        initialActiveIndex={Math.max(0, nav.findIndex(([, href]) => href === (pathname.startsWith('/blog/') ? '/blog' : pathname)))}
        theme="dark"
        size="lg"
        frame={false}
        color="#a99bff"
        colors={['#a99bff']}
        particleCount={5}
        spread={34}
        animationTime={380}
        timeVariance={100}
        gooeyness={0.42}
        wobble={0.35}
        hoverEffect={true}
        className="site-gooey-nav"
        onChange={(_, item) => { if (item?.href) window.location.href = item.href; }}
      />
    </div></header>
    {children}
    <footer className="site-footer container"><Link to="/" className="logo"><span className="logo-name">Sarvan C</span></Link><nav className="footer-links" aria-label="Contact links"><a href={emailHref('Opportunity for Sarvan C')} aria-label="Email Sarvan"><Mail size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={14}/></a></nav><p>© 2026 {profile.name}. Built with curiosity and code.</p><Link to="/">HOME <ArrowUpRight size={13}/></Link></footer>
  </>;
}
