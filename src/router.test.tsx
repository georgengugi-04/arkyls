import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './router';

const renderAt = (path: string) => render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

describe('routing', () => {
  it.each([
    ['/', /spaces\s+built\s+to\s+endure/i],
    ['/projects', /from\s+concept\s+to\s+creation/i],
    ['/services', /from\s+concept\s+to\s+creation/i],
    ['/about', /architecture\s+with\s+purpose/i],
    ['/contact', /build\s+something\s+together/i],
  ])('renders %s', async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('renders the 404 page for unknown routes', async () => {
    renderAt('/nope');
    expect(await screen.findByRole('heading', { level: 1, name: /isn't\s+on\s+the\s+plan/i })).toBeInTheDocument();
  });

  it('marks the current page in the nav', async () => {
    renderAt('/about');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getAllByRole('link', { name: /about/i }).some((l) => l.getAttribute('aria-current') === 'page')).toBe(true);
  });
});

describe('transition copy', () => {
  it('has a message for every route and a fallback', async () => {
    const { transitionFor } = await import('./data/transitions');
    for (const p of ['/', '/projects', '/services', '/about', '/contact', '/projects/']) expect(transitionFor(p).message.length).toBeGreaterThan(5);
    expect(transitionFor('/zzz').title).toBe('Off the map');
  });
});
