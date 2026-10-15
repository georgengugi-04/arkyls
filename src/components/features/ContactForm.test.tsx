import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows validation errors and does not call the API when empty', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits valid data and shows a success message', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await userEvent.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'New home');
    await userEvent.type(screen.getByLabelText(/message/i), 'We would like a three-bedroom home.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(await screen.findByText(/your message has been sent/i)).toBeInTheDocument();
  });

  it('shows the server error when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"error":"Too many messages."}', { status: 429 })));
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await userEvent.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Hello');
    await userEvent.type(screen.getByLabelText(/message/i), 'A long enough message here.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/too many messages/i);
  });
});
