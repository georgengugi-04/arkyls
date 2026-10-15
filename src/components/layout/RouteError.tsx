import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function RouteError() {
  const err = useRouteError();
  const message = isRouteErrorResponse(err) ? `${err.status} ${err.statusText}` : 'Something went wrong while loading this page.';
  return (
    <section className="theme-dark grid min-h-svh place-items-center bg-base px-6 text-center text-fg">
      <div>
        <p className="mono mb-4 text-accent">Unexpected error</p>
        <h1 className="display mb-4 text-6xl">We hit a snag.</h1>
        <p className="mb-8 text-dim">{message}</p>
        <Button href="/">Reload Home</Button>
      </div>
    </section>
  );
}
