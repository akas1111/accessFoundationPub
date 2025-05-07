import { headers } from "next/headers";
import "./global.css";
import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Axcess Foundation Portal</title>
        <meta
          name="description"
          content="Axcess Foundation is a dedicated nonprofit organization committed to
          empowering individuals and fostering community well-being."
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
