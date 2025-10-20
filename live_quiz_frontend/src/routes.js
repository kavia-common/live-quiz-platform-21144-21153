import React from 'react';

// PUBLIC_INTERFACE
export const useHashRouter = (defaultRoute = 'lobby') => {
  /** Simple hash router hook that tracks current route and params */
  const getRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const [path, query] = hash.split('?');
    const params = Object.fromEntries(new URLSearchParams(query || ''));
    return { path: path || defaultRoute, params };
  };

  const [route, setRoute] = React.useState(getRoute());

  React.useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (path, params) => {
    const qs = params ? `?${new URLSearchParams(params).toString()}` : '';
    window.location.hash = `#/${path}${qs}`;
  };

  return { route, navigate };
};

// PUBLIC_INTERFACE
export const ROUTES = {
  lobby: 'lobby',
  play: 'play',
  leaderboard: 'leaderboard',
};
