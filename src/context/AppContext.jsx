import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const Context = createContext(null);
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => read('oh-user', null)),
    [favorites, setFavorites] = useState(() => read('oh-favorites', [])),
    [enrollments, setEnrollments] = useState(() => read('oh-enrollments', [])),
    [completed, setCompleted] = useState(() => read('oh-completed', [])),
    [theme, setTheme] = useState(() => read('oh-theme', 'light'));
  useEffect(() => {
    localStorage.setItem('oh-user', JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem('oh-favorites', JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem('oh-enrollments', JSON.stringify(enrollments));
  }, [enrollments]);
  useEffect(() => {
    localStorage.setItem('oh-completed', JSON.stringify(completed));
  }, [completed]);
  useEffect(() => {
    localStorage.setItem('oh-theme', JSON.stringify(theme));
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const value = useMemo(
    () => ({
      user,
      setUser,
      favorites,
      toggleFavorite: (id) =>
        setFavorites((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id])),
      enrollments,
      enroll: (id) => setEnrollments((v) => (v.includes(id) ? v : [...v, id])),
      completed,
      setCompleted,
      theme,
      toggleTheme: () => setTheme((v) => (v === 'light' ? 'dark' : 'light')),
      logout: () => setUser(null),
    }),
    [user, favorites, enrollments, completed, theme],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useApp = () => useContext(Context);
