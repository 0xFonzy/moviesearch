import { SearchProvider } from "@/context/SearchContext";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextUIProvider id='Providers'>
      <SearchProvider>
        {children}
      </SearchProvider>
    </NextUIProvider>
  );
}