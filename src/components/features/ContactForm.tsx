import { useId, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, contactSchema, serviceOptions, submitContact, type ContactInput } from '@/lib/contact';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

const input = 'w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-fg outline-none transition-colors placeholder:text-dim/60';

function Field({ label, error, children, id, required }: { label: string; error?: string; children: ReactNode; id: string; required?: boolean }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="mono mb-1 block text-dim">{label}{required && <span aria-hidden className="text-accent"> *</span>}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mono mt-2 text-accent">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { service: '', website: '' } });

  const cls = (k: keyof ContactInput) => cn(input, errors[k] ? 'border-accent' : 'border-rule focus:border-fg');
  const a11y = (k: keyof ContactInput, id: string) => ({ id, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id}-error` : undefined });

  const onSubmit = handleSubmit(async (data) => {
    setStatus('idle');
    try {
      await submitContact(data);
      reset();
      setStatus('sent');
    } catch (e) {
      const err = e instanceof ApiError ? e : new ApiError('Something went wrong. Please try again.');
      Object.entries(err.fieldErrors ?? {}).forEach(([k, m]) => setError(k as keyof ContactInput, { message: m }));
      setServerError(err.message);
      setStatus('error');
    }
  });

  return (
    <div>
      <h2 className="display mb-3 text-[clamp(1.75rem,3vw,2.5rem)]">Send a message</h2>
      <p className="mb-10 text-dim">Fill out the form and we'll get back to you within 24 hours.</p>

      <div aria-live="polite">
        {status === 'sent' && <p className="mb-6 flex items-center gap-2 border border-accent px-5 py-4"><Check width={18} className="text-accent" /> Thank you — your message has been sent. We'll be in touch soon.</p>}
        {status === 'error' && <p role="alert" className="mb-6 border border-accent px-5 py-4 text-accent">{serverError}</p>}
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field id={`${uid}-name`} label="Full Name" required error={errors.name?.message}>
            <input {...register('name')} {...a11y('name', `${uid}-name`)} className={cls('name')} autoComplete="name" placeholder="Your name" />
          </Field>
          <Field id={`${uid}-email`} label="Email Address" required error={errors.email?.message}>
            <input {...register('email')} {...a11y('email', `${uid}-email`)} type="email" className={cls('email')} autoComplete="email" placeholder="you@email.com" />
          </Field>
        </div>
        <Field id={`${uid}-subject`} label="Subject" required error={errors.subject?.message}>
          <input {...register('subject')} {...a11y('subject', `${uid}-subject`)} className={cls('subject')} placeholder="What is this about?" />
        </Field>
        <Field id={`${uid}-service`} label="Service Interested In" error={errors.service?.message}>
          <select {...register('service')} {...a11y('service', `${uid}-service`)} className={cn(cls('service'), 'appearance-none')}>
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => <option key={s} value={s} className="bg-base text-fg">{s}</option>)}
          </select>
        </Field>
        <Field id={`${uid}-message`} label="Message" required error={errors.message?.message}>
          <textarea {...register('message')} {...a11y('message', `${uid}-message`)} rows={5} className={cn(cls('message'), 'min-h-[140px] resize-y')} placeholder="Tell us about your project, timeline, and budget…" />
        </Field>

        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input {...register('website')} tabIndex={-1} autoComplete="off" /></label>
        </div>

        <Button type="submit" arrow={!isSubmitting} disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'}</Button>
      </form>
    </div>
  );
}
