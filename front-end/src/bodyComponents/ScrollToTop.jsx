import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * This component listens for route changes and automatically scrolls
 * the window to the top of the page whenever the user navigates to a new route.
 * 
 * @component
 * @returns {null} This component does not render any visible output.
 */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
