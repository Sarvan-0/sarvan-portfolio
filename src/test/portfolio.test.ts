import { describe, expect, it } from 'vitest';
import { categories, filterProjects, projects } from '../lib/portfolio';

describe('portfolio projects', () => {
  it('shows only the All projects section', () => {
    expect(categories).toEqual(['All projects']);
  });

  it('shows every project in the All projects section', () => {
    expect(filterProjects('All projects')).toEqual(projects);
    expect(filterProjects('All projects')).toHaveLength(2);
  });

  it('preserves project links and details', () => {
    expect(projects[0]?.title).toBe('CryptoPulse');
    expect(projects[0]?.github).toBe('https://github.com/Sarvan-0/CryptoPulse');
    expect(projects[1]?.title).toBe('Beverage Hub');
    expect(projects[1]?.github).toBe('https://github.com/Sarvan-0/beverage-hub');
  });
});
