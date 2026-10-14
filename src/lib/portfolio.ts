export const profile = {
  name: 'Sarvan C', initials: 'SC', role: 'Computer Science Engineer',
  email: 'sarvan.cvnss@gmail.com', github: 'https://github.com/Sarvan-0', linkedin: 'https://www.linkedin.com/in/sarvan-c/', resume: '/resume.pdf',
  college: 'Geethanjali College of Engineering and Technology', graduation: '2027',
  status: 'Open to opportunities',
};
export const githubHandle = 'Sarvan-0';
export function emailHref(subject = '', body = '') {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${profile.email}${query ? `?${query}` : ''}`;
}
export const categories = ['Projects'] as const;
export type Category = (typeof categories)[number];
export const projects = [
  { id: 'cryptopulse', title: 'CryptoPulse', category: 'Time Series', label: 'MACHINE LEARNING · CRYPTOCURRENCY', date: 'September 2026', description: 'Predicting cryptocurrency price direction from 1-minute market data for BTC, ETH, SOL, BNB, and XRP. Engineered technical features and trained Logistic Regression models for a 30-minute forecasting horizon, evaluated with rolling and walk-forward validation.', stack: ['Python', 'Scikit-learn', 'FastAPI', 'React'], visual: 'crypto', github: 'https://github.com/Sarvan-0/CryptoPulse', demo: '' },
  { id: 'student-performance', title: 'Student Performance Predictor', category: 'Regression', label: 'MACHINE LEARNING · EDUCATION', date: 'August 2026', description: 'Predicting student exam performance using academic and personal factors. Built a machine learning workflow with data preprocessing, model training, and predictive performance evaluation using Scikit-learn.', stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'], visual: 'student', github: 'https://github.com/Sarvan-0/student-performance-predictor', demo: '' },
];
export function filterProjects(_category: Category) { return projects; }
export const skillGroups = [
  { title: 'Programming languages', icon: 'code', skills: ['Python', 'C++', 'Java', 'SQL', 'JavaScript'] },
  { title: 'AI & machine learning', icon: 'brain', skills: ['NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'Data preprocessing', 'Exploratory data analysis', 'Model evaluation', 'Deep learning fundamentals'] },
  { title: 'Web development', icon: 'globe', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Tools & platforms', icon: 'terminal', skills: ['Git', 'GitHub', 'Linux', 'MySQL', 'VS Code', 'Jupyter Notebook'] },
];
export const articles = [
 { slug: 'model-evaluation-beyond-accuracy', title: 'Accuracy is a starting point, not a verdict.', subtitle: 'Evaluating machine learning models beyond accuracy', category: 'Machine learning', excerpt: 'Precision, recall, class imbalance, and the uncomfortable questions a single score can hide.', topic: 'evaluation' },
 { slug: 'diffusion-models-from-noise', title: 'Learning to reverse the noise.', subtitle: 'A practical mental model for diffusion models', category: 'ML research', excerpt: 'How a noise schedule, a denoising network, and repeated sampling combine to generate images.', topic: 'diffusion' },
 { slug: 'esports-data-and-decision-making', title: 'The match is more than the scoreboard.', subtitle: 'What esports analytics can reveal about decisions', category: 'Esports', excerpt: 'Reading momentum, objectives, and player choices without reducing a team to one statistic.', topic: 'esports' },
 { slug: 'gameplay-systems-that-feel-good', title: 'Good game feel is engineered.', subtitle: 'Building responsive gameplay systems', category: 'Game development', excerpt: 'Feedback loops, input latency, readable states, and the small details that make controls feel right.', topic: 'gamedev' },
 { slug: 'why-walks-help-debugging', title: 'Sometimes the best debug tool is a walk.', subtitle: 'A small case for stepping away from the screen', category: 'Off the clock', excerpt: 'Why a deliberate break can help you return to a stubborn problem with a better question.', topic: 'random' },
];
export function isConfigured(value: string) { return value.trim().length > 0; }
