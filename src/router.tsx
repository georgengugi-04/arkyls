import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RouteError } from '@/components/layout/RouteError';

/** Each page is its own chunk, loaded on navigation. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <RouteError />,
    HydrateFallback: () => <div className="min-h-svh bg-bg" aria-busy="true" />,
    children: [
      { index: true, ...page(() => import('@/pages/Home')) },
      { path: 'projects', ...page(() => import('@/pages/Projects')) },
      { path: 'services', ...page(() => import('@/pages/Services')) },
      { path: 'about', ...page(() => import('@/pages/About')) },
      { path: 'contact', ...page(() => import('@/pages/Contact')) },
      { path: '*', ...page(() => import('@/pages/NotFound')) },
    ],
  },
];

export const router = createBrowserRouter(routes);
