import { Metadata } from "next";

import { GlobalMessagePanel } from "@/components/message";
import { ReduxProvider } from "@/redux/reduxProvider";
import "./globals.scss";

const metadata = {
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
        <ReduxProvider>
          {children}
          <GlobalMessagePanel />
        </ReduxProvider>
      </body>
    </html>
  );
}
