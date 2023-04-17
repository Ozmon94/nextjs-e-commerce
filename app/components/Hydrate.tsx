"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <body
          data-theme={themeStore.mode}
          className="min-h-screen px-4 md:px-24 lg:px-48 "
        >
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}
