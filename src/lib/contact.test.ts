import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, contactSchema, submitContact } from './contact';

const valid = { name: 'Jane Doe', email: 'jane@example.com', subject: 'New home', service: 'Residential Design', message: 'We would like a three-bedroom home.' } as const;

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it('allows the service to be left empty', () => {
    expect(contactSchema.safeParse({ ...valid, service: '' }).success).toBe(true);
  });
  it('rejects bad email, short message and unknown service', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'nope', message: 'short', service: 'Spa' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.path[0])).toEqual(expect.arrayContaining(['email', 'message', 'service']));
  });
  it('rejects a filled honeypot', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false);
  });
});

describe('submitContact', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('resolves on 2xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 201 })));
    await expect(submitContact(valid)).resolves.toBeUndefined();
  });
  it('surfaces server field errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: 'Fix fields', fields: { email: 'bad' } }), { status: 422 })));
    await expect(submitContact(valid)).rejects.toMatchObject({ status: 422, fieldErrors: { email: 'bad' } });
  });
  it('wraps network failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    await expect(submitContact(valid)).rejects.toBeInstanceOf(ApiError);
  });
});
