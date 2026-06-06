import "./globals.css";
import { Fraunces, Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--preferred-font",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--article-title-font",
  style: "italic",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} ${fraunces.variable}`}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
