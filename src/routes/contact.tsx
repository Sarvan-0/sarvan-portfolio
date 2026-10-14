import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { SiteLayout } from '@/components/portfolio/site-layout';
import { Button } from '@/components/ui/button';
import { CopyEmail, SectionHeading } from '@/components/portfolio/shared';
import { emailHref, profile } from '@/lib/portfolio';
export const Route = createFileRoute('/contact')({ component: ContactPage, head: () => ({ meta: [{ title: 'Contact — Sarvan C' }] }) });
function ContactPage(){return <SiteLayout><main className="section contact-section"><div className="container"><SectionHeading number="06" label="CONTACT" title="Have an interesting problem to solve?" description="Open to relevant opportunities in AI/ML and software engineering."/><div className="contact-actions"><Button asChild className="contact-email"><a href={emailHref('Opportunity for Sarvan C')}><Mail size={16}/> Email me <ArrowUpRight/></a></Button><Button asChild variant="outline"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight/></a></Button><Button asChild variant="outline"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight/></a></Button></div><div className="contact-direct"><a className="contact-address" href={emailHref('Opportunity for Sarvan C')}>{profile.email}</a><CopyEmail email={profile.email}/></div><p className="contact-note">Include the role, problem area, and relevant technology stack when reaching out.</p></div></main></SiteLayout>}
