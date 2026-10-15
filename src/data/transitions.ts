export interface TransitionCopy { index: string; title: string; message: string }

/** Shown on the curtain while navigating *to* each route. Edit freely. */
export const transitions: Record<string, TransitionCopy> = {
  '/': { index: '00', title: 'Studio', message: 'Back to the studio.' },
  '/projects': { index: '01', title: 'Projects', message: 'Pulling the drawings from the plan chest.' },
  '/services': { index: '02', title: 'Services', message: 'Laying out the scope of work.' },
  '/about': { index: '03', title: 'About', message: 'Meet the people behind the plans.' },
  '/contact': { index: '04', title: 'Contact', message: 'Let’s start a conversation.' },
};

export const transitionFor = (pathname: string): TransitionCopy =>
  transitions[pathname.replace(/\/$/, '') || '/'] ?? { index: '404', title: 'Off the map', message: 'This plot isn’t on the plan.' };
