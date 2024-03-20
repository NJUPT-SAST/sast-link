import { Metadata } from "next";

import { GlobalMessagePanel } from "@/components/message";
import { ReduxProvider } from "@/redux/reduxProvider";
import { SWRProvider } from "@/components/swrProvider";
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
  const fallback = {
    infoUpdate: {
      Success: false,
      Data: { email: "", username: "" },
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
