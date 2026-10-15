export const INTRO_KEY = 'arkyls:intro';

/** Has the welcome screen already been shown this browser session? */
export const introSeen = () => { try { return sessionStorage.getItem(INTRO_KEY) === '1'; } catch { return false; } };
