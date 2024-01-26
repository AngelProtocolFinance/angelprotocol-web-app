/**
 * this module should be accessible to top level index.tsx, so theme can be loaded immediately
 */

type Theme = "dark" | "light";
const DARK: Theme = "dark";
const LIGHT: Theme = "light";
const THEME_KEY = "__ap_theme";

export function isPrevDark() {
  const userTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return (
    userTheme === DARK ||
    //user might not previously selected theme so check for system theme
    (!userTheme && isSystemThemeDark)
  );
}

const htmlNode = document.documentElement;

export function setToDarkMode() {
  htmlNode.classList.add(DARK);
  localStorage.setItem(THEME_KEY, DARK);
}
export function setToLightMode() {
  htmlNode.classList.remove(DARK);
  localStorage.setItem(THEME_KEY, LIGHT);
}

export function initTheme() {
  if (isPrevDark()) setToDarkMode();
}
