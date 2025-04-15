import { Providers } from "@/components/providers/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Game Store",
  description: "A modern game store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
