import { Metadata } from "next";

import { ReduxProvider } from "@/redux/reduxProvider";
import "./globals.scss";

export const metadata = {
  title: "SAST Link",
  description: "OAuth of SAST",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
