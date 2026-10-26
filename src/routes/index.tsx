import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Braces, BrainCircuit, Code2, GitBranch, Layers, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/components/portfolio/site-layout';
import DepthText from '@/components/portfolio/DepthText';
import ScrollExpand from '@/components/portfolio/ScrollExpand';
import { profile } from '@/lib/portfolio';
import heroArt from '@/assets/hero-helix.jpg';
export const Route = createFileRoute('/')({ head: () => ({ meta: [{ title: 'Sarvan C — AI/ML & Software Engineer' }, { name: 'description', content: 'The engineering portfolio of Sarvan C, focused on machine learning and software engineering.' }] }), component: HomePage });
function HomePage() { return <SiteLayout><main><ScrollExpand
          src={heroArt}
          alt="Luminous cyan and violet fiber-optic helix"
          title="Sarvan C"
          scrollHint="Scroll to explore"
          startWidth={58}
          startHeight={62}
          startRadius={22}
          endRadius={0}
          mediaZoom={1.22}
          scrollDistance={1.05}
          holdDistance={0.12}
          smoothing={0.08}
          overlayScrim={0.5}
          useWindowScroll
          className="hero hero-scroll-expand"
          style={{ height: 'auto' }}
        >
          <div className="container hero-content">
            <div className="availability"><span/>{profile.status}<ArrowUpRight size={12}/></div>
            <div className="hero-eyebrow"><span/> COMPUTER SCIENCE ENGINEER <span className="eyebrow-separator">/</span> AI/ML & SOFTWARE DEVELOPMENT</div>
            <div className="hero-depth-name"><DepthText text="Sarvan C" layers={38} depth={4.2} depthColor="#6251c7" faceColor="#f4f3f8" gradientDepth={false} float={false} tilt={5} pointerTracking autoOrbit={false} smoothing={0.14} perspective={900} fontSize="clamp(3.4rem, 7vw, 6rem)" fontWeight={900} shadow intro /></div>
            <p>I build software, explore machine learning, and turn complex<br className="desktop-break"/> technical ideas into practical applications.</p>
            <div className="hero-actions"><Button asChild size="lg"><Link to="/projects">Explore my projects <ArrowUpRight/></Link></Button><Button asChild variant="outline" size="lg"><a href="/resume.pdf" download="Sarvan_C_Resume.pdf">Download resume</a></Button></div>
            <div className="hero-footnote"><span><Braces size={14}/> Thoughtful code. Real-world impact.</span></div>
          </div>
        </ScrollExpand><div className="tech-strip"><div className="container"><span className="strip-label">EXPLORING & BUILDING WITH</span><span><Code2/> Python</span><span><Braces/> React</span><span><BrainCircuit/> PyTorch</span><span><Layers/> Node.js</span><span><GitBranch/> Git</span><span><Terminal/> Linux</span></div></div><section className="section container"><div className="section-top"><div className="section-heading"><div className="eyebrow"><span>01 /</span> SELECTED WORK</div><h2>Projects built to solve problems.</h2><p>Machine learning experiments and software systems, built hands-on.</p></div><Button asChild variant="ghost" className="section-link"><Link to="/projects">View projects <ArrowUpRight/></Link></Button></div><div className="info-grid"><div className="info-item"><BrainCircuit size={19}/><span>RESEARCH</span><h3>Diffusion models & image generation</h3><p>NIT Andhra Pradesh · 2026</p></div><div className="info-item"><Code2 size={19}/><span>ENGINEERING</span><h3>Machine learning and full-stack applications</h3></div><div className="info-item"><GitBranch size={19}/><span>OPEN SOURCE</span><h3>Projects and experiments</h3><p><a href="https://github.com/Sarvan-0" target="_blank" rel="noreferrer">github.com/Sarvan-0 ↗</a></p></div></div></section></main></SiteLayout>; }
