import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, BrainCircuit, Gamepad2, Trophy, Compass, Sparkles } from 'lucide-react';
import { SiteLayout } from '@/components/portfolio/site-layout';
import { SectionHeading } from '@/components/portfolio/shared';
import { articles } from '@/lib/portfolio';

export const Route = createFileRoute('/blog')({
  component: BlogPage,
  head: () => ({ meta: [{ title: 'Writing — Sarvan C' }, { name: 'description', content: 'Notes on machine learning, esports, game development, and ideas beyond code.' }] }),
});

const articleIcons = [BrainCircuit, Sparkles, Trophy, Gamepad2, Compass];

function BlogPage() {
  return (
    <SiteLayout>
      <main className="section container blog-page">
        <SectionHeading
          number="05"
          label="FIELD NOTES"
          title="Ideas worth exploring."
        />
        <div className="blog-grid">
          {articles.map((article, index) => {
            const Icon = articleIcons[index] ?? BrainCircuit;
            return (
              <a key={article.slug} href={`/blogs/${article.slug}`} className={`blog-card blog-card-${index + 1}`}>
                <div className={`blog-illustration blog-art-${index % 3}`}>
                  <div className="blog-art-index">0{index + 1} <span>/ FIELD NOTE</span></div>
                  <div className="blog-art-orbit blog-art-orbit-one" />
                  <div className="blog-art-orbit blog-art-orbit-two" />
                  <span className="blog-icon"><Icon strokeWidth={1.4} /></span>
                  <div className="blog-art-lines" />
                </div>
                <div className="blog-body">
                  <div className="blog-meta">{article.category}<span>NOTE 0{index + 1}</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="blog-bottom"><span>By Sarvan C</span><span>Read article <ArrowUpRight size={14} /></span></div>
                </div>
              </a>
            );
          })}
        </div>
        <div className="blog-end-note"><span className="blog-end-mark">SC.</span><p>Written to understand things more deeply. Updated as the ideas evolve.</p><a href="https://github.com/Sarvan-0" target="_blank" rel="noreferrer">More experiments on GitHub <ArrowUpRight size={13} /></a></div>
      </main>
    </SiteLayout>
  );
}
