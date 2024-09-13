"use client"; // Ensure this directive is present

import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./theme"; // Ensure this import is correct
import { Head } from "./head";

// Define your ThemeProvider as a functional component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <NextUIProvider >
      <div style={{ backgroundColor: theme.colors.background, color: theme.colors.primary }}>
        {children}
      </div>
    </NextUIProvider>
  );
};

// Main layout component
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="relative flex flex-col h-screen">
        <Head />
        <main className="container flex-grow pt-16 mx-auto w-full">
          {children}
        </main>
        <footer className="flex items-center justify-center w-full py-3">      
            <span className="text-default-600">Copyright</span>
            <p className="text-secondary">ⓒ 2024 Cod Sapi Digital</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
