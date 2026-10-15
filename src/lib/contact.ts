import { z } from 'zod';

export const serviceOptions = ['Residential Design', 'Commercial Design', 'Sustainable Design', 'Urban Planning', 'Interior Design', 'Landscape Architecture', 'Other'] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(255),
  subject: z.string().trim().min(3, 'Please add a short subject').max(150, 'Subject is too long'),
  service: z.union([z.enum(serviceOptions), z.literal('')]).optional(),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters)').max(4000, 'Message is too long'),
  /** Honeypot — real users never see or fill this. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export class ApiError extends Error {
  constructor(message: string, readonly status?: number, readonly fieldErrors?: Record<string, string>) {
    super(message);
  }
}

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact.php';

export async function submitContact(data: ContactInput, signal?: AbortSignal): Promise<void> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal });
  } catch {
    throw new ApiError('Network error — please check your connection and try again.');
  }
  if (res.ok) return;
  const body = (await res.json().catch(() => null)) as { error?: string; fields?: Record<string, string> } | null;
  throw new ApiError(body?.error ?? 'Something went wrong. Please try again shortly.', res.status, body?.fields);
}
