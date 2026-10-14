import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteLayout } from '@/components/portfolio/site-layout';
import { articles, profile } from '@/lib/portfolio';
export const Route = createFileRoute('/blogs/$slug')({
 loader: ({ params }) => articles.find(item => item.slug === params.slug) ?? null,
 head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.subtitle} — ${profile.name}` : `Article unavailable — ${profile.name}` }, { name: 'description', content: loaderData?.excerpt ?? 'This article could not be found.' }, { property: 'og:title', content: loaderData?.subtitle ?? 'Article unavailable' }, { property: 'og:description', content: loaderData?.excerpt ?? 'Explore notes on engineering and AI.' }, { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' }, ...(!loaderData ? [{ name: 'robots', content: 'noindex' }] : [])] }),
 component: ArticlePage,
});
const content: Record<string, { intro: string; principle: string; rows: string[][]; code: string; language: string; takeaway: string }> = {
 evaluation: {
  intro: 'A model can make mostly correct predictions and still fail at the task that matters. When one class is much more common than another, accuracy can hide the errors that deserve the most attention.',
  principle: 'Start with the cost of a mistake. Precision asks how many predicted positives were correct. Recall asks how many actual positives were found. Neither metric wins in every situation; the use case determines the trade-off.',
  rows: [['Accuracy', 'Correct predictions / all predictions', 'Useful when classes and error costs are reasonably balanced'], ['Precision', 'Correct positives / predicted positives', 'Useful when false alarms are expensive'], ['Recall', 'Correct positives / actual positives', 'Useful when missed positives are expensive']],
  code: 'from sklearn.metrics import classification_report\n\npredictions = model.predict(X_test)\nprint(classification_report(y_test, predictions))',
  language: 'PYTHON', takeaway: 'Use a held-out test set, inspect the confusion matrix, and compare with a simple baseline. A good evaluation makes trade-offs visible instead of hiding them behind one number.'
 },
 diffusion: {
  intro: 'Diffusion models generate data by learning how to reverse a gradual corruption process. During training, noise is added to clean examples at different timesteps, and a neural network learns to predict the noise or another related target.',
  principle: 'The forward process is a known noise schedule. The reverse process is learned. The model is not simply memorizing a finished image; it learns statistical structure that can guide iterative denoising from a noisy starting point.',
  rows: [['Forward process', 'Adds controlled noise over timesteps', 'Defines the corruption process'], ['Denoising network', 'Predicts a noise-related target', 'Learns patterns in the training data'], ['Sampling', 'Iteratively updates a noisy sample', 'Produces a generated candidate']],
  code: 'noise = torch.randn_like(images)\nnoisy = scheduler.add_noise(images, noise, timesteps)\npredicted = model(noisy, timesteps)\nloss = torch.nn.functional.mse_loss(predicted, noise)',
  language: 'PYTORCH · CONCEPTUAL EXAMPLE', takeaway: 'Keep data preprocessing, the noise schedule, the training objective, and the sampling procedure distinct when debugging. Generated quality depends on the complete pipeline, not one model setting.'
 },
 esports: {
  intro: 'A final score tells you who won, but often says little about why. In a competitive match, timing, map control, objective trades, resource use, and coordinated decisions shape the result long before the scoreboard settles.',
  principle: 'Good esports analysis begins with a specific question. Instead of asking whether a player is “good,” ask whether a team converts an early advantage, how often it wins contested objectives, or which decisions precede a lost round. Context matters: the same statistic can mean different things across roles, maps, patches, and opponents.',
  rows: [['Outcome metrics', 'Win rate, rounds, objective control', 'Summarize what happened'], ['Process metrics', 'Positioning, timing, resource use', 'Help explain how it happened'], ['Context', 'Patch, map, role, opponent strength', 'Prevents misleading comparisons']],
  code: 'match_summary = {\n    "objectives_taken": 7,\n    "objectives_lost": 4,\n    "rounds_won": 13,\n    "rounds_lost": 9,\n}\n\n# Compare patterns across matches, not one game.',
  language: 'PYTHON · ILLUSTRATIVE EXAMPLE', takeaway: 'Use data to sharpen review, not replace it. Pair a small set of meaningful metrics with replay context and ask what decision could be changed next time.'
 },
 gamedev: {
  intro: 'A responsive mechanic is more than an animation that plays when a button is pressed. The player needs immediate feedback, predictable rules, and a clear sense of control. Small delays or unclear states can make a technically correct mechanic feel wrong.',
  principle: 'Treat gameplay as a feedback loop: input, game-state update, response, and player interpretation. Keep the rules understandable, separate state changes from presentation where possible, and test edge cases such as repeated input, collisions, and interrupted actions.',
  rows: [['Input', 'Capture intent consistently', 'Controls should feel immediate'], ['Game state', 'Apply rules and transitions', 'Avoid contradictory states'], ['Feedback', 'Animation, sound, camera, UI', 'Communicate the result clearly']],
  code: 'if (canJump && jumpPressed) {\n    velocity.y = jumpImpulse;\n    canJump = false;\n    PlayJumpFeedback();\n}',
  language: 'C++ · SIMPLIFIED GAMEPLAY EXAMPLE', takeaway: 'Prototype the smallest version, test it with real input, and tune one variable at a time. “Feels good” becomes easier to improve when you can identify which part of the feedback loop is failing.'
 },
 random: {
  intro: 'When a problem stops moving, adding more hours is not always the best next step. Staring at the same code can make the current explanation feel inevitable, even when the explanation is wrong.',
  principle: 'A short break works best when it has a boundary. Write down the exact question you are trying to answer, step away from the screen, and return with one hypothesis to test. The point is not to magically solve the problem while walking; it is to interrupt an unproductive loop.',
  rows: [['Before stepping away', 'Write the failing behavior and expected behavior', 'Preserves the concrete problem'], ['During the break', 'Avoid replacing it with another screen', 'Creates distance from the current approach'], ['On return', 'Test one new hypothesis', 'Turns reflection into action']],
  code: 'actual = run_case(input_data)\nexpected = reference_case(input_data)\n\nif actual != expected:\n    print("Smallest failing case:", input_data)',
  language: 'PYTHON · DEBUGGING CHECKLIST', takeaway: 'A break is not a substitute for disciplined debugging. Use it to return with a sharper question, then verify the answer with a minimal reproducible case.'
 },
};
function HighlightedCode({ code }: { code: string }) { return <>{code.split(/(#[^\n]*|\/\/[^\n]*|"[^"\n]*"|\b(?:from|import|def|return|for|in|if|not|async|function|const|await|throw|new)\b)/g).map((part, i) => <span key={i} className={part.startsWith('#') || part.startsWith('//') ? 'code-comment' : part.startsWith('"') ? 'code-string' : /^(from|import|def|return|for|in|if|not|async|function|const|await|throw|new)$/.test(part) ? 'code-keyword' : undefined}>{part}</span>)}</>; }
function ArticlePage() {
 const article = Route.useLoaderData();
 if (!article) return <SiteLayout><main className="container section article-not-found"><div className="eyebrow">FIELD NOTE / 404</div><h1>Article not found.</h1><p>This article may have moved or the link may be incorrect.</p><a href="/blog"><ArrowLeft size={15}/> Back to field notes</a></main></SiteLayout>;
 const body = content[article.topic] ?? content['evaluation'];
 const next = articles[(articles.findIndex(item => item.slug === article.slug) + 1) % articles.length];
 return <SiteLayout><><div className="container"><a href="/blog" className="article-back"><ArrowLeft size={15}/> Back to field notes</a></div><main className="container"><div className="article-cover"><div className="eyebrow"><span>FIELD NOTE /</span> {article.category.toUpperCase()}</div><h1>{article.subtitle}</h1><p>{article.excerpt}</p><div className="article-meta"><span>{profile.name}</span><span>Notes by {profile.name}</span></div><div className="article-reading-note"><span>READING NOTE</span><p>These are personal learning notes: practical explanations, trade-offs, and questions worth exploring further.</p></div></div><div className="article-layout"><article className="article-content"><h2 id="overview">The starting point</h2><p>{body.intro}</p><h2 id="principles">First principles</h2><p>{body.principle}</p><div className="article-table-wrap"><table><thead><tr><th>Concept</th><th>What it means</th><th>Why it matters</th></tr></thead><tbody>{body.rows.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><h2 id="example">A practical example</h2><p>A small example helps make the idea concrete. This snippet is illustrative; it assumes the surrounding data and setup are already in place.</p><pre aria-label={body.language}><code><HighlightedCode code={body.code}/></code></pre><h2 id="takeaways">What to take away</h2><p>{body.takeaway}</p><p>The goal isn’t to memorize a recipe. It’s to understand the choices well enough to make them deliberately.</p><div className="article-end"><a href="/blog">← All notes</a>{next && <a href={`/blogs/${next.slug}`}>Next article <ArrowUpRight size={12} className="inline"/></a>}</div></article><aside className="article-toc"><div><h3>ON THIS PAGE</h3><a href="#overview">The starting point</a><a href="#principles">First principles</a><a href="#example">A practical example</a><a href="#takeaways">What to take away</a></div></aside></div></main></></SiteLayout>;
}
