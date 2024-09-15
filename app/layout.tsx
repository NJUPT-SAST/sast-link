import { Metadata } from "next";

import { GlobalMessagePanel } from "@/components/message";
import { ReduxProvider } from "@/redux/reduxProvider";
import { SWRProvider } from "@/components/swrProvider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "SAST Link",
  description: "OAuth of SAST",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fallback = {
    infoUpdate: {
      success: false,
      data: { email: "", username: "" },
    },
  };
  return (
    <html lang="zh">
      <body>
        <ReduxProvider>
          <SWRProvider fallback={fallback}>{children}</SWRProvider>
          <GlobalMessagePanel />
        </ReduxProvider>
      </body>
    </html>
  );
}
