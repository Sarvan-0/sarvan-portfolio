import { createFileRoute } from '@tanstack/react-router';
import { BrainCircuit, Code2, Globe2, Terminal } from 'lucide-react';
import { SiteLayout } from '@/components/portfolio/site-layout';
import { SectionHeading } from '@/components/portfolio/shared';
import { skillGroups } from '@/lib/portfolio';
export const Route = createFileRoute('/skills')({ component: SkillsPage, head: () => ({ meta: [{ title: 'Skills — Sarvan C' }] }) });
const icons = [Code2, BrainCircuit, Globe2, Terminal];
function SkillsPage() { return <SiteLayout><main className="section section-band"><div className="container"><SectionHeading number="02" label="SKILLS & TOOLKIT" title="The right tools. A builder’s mindset." description="Technologies I have used across coursework, research, and projects. Skill depth varies by tool; this is not a proficiency ranking."/><div className="skills-grid">{skillGroups.map((group,index)=>{const Icon=icons[index]??Code2;return <article className="skill-card" key={group.title}><div className="skill-title"><Icon size={21}/><h3>{group.title}</h3></div><div className="skill-tags">{group.skills.map(skill=><span key={skill}>{skill}</span>)}</div></article>})}</div></div></main></SiteLayout>; }
