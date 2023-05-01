import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { GlobalMessagePanel } from "@/components/message";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalMessagePanel />
    </>
  );
}
