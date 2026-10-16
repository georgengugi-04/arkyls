import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home hero scroll button', () => {
  it('scrolls to the studio section when clicked', async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(document.getElementById('studio')).not.toBeNull();
    await userEvent.click(screen.getByRole('button', { name: /scroll down to the studio/i }));
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });
});
