import { useEffect, useState } from 'react';

function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.remove(nextTheme);
    rootElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, nextTheme]);

  return [nextTheme, setTheme];
}

export default useTheme;
