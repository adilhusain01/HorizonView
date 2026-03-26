import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HorizonView — Buildings Explorer",
  description: "Track building development over time with satellite data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
