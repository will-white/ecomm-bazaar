import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type ThemeOpt = 'light' | 'dark';

export interface ThemeContextInterface {
  theme: ThemeOpt;
  setTheme: Dispatch<SetStateAction<ThemeOpt>>;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export interface ThemeProviderInterface {
  readonly children: ReactNode[] | ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderInterface) => {
  const [theme, setTheme] = useState<ThemeOpt>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]); // every time the theme state updates we also update in local storage

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
