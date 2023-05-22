import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { GlobalMessagePanel } from "@/components/message";
import { store } from "@/redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GlobalMessagePanel />
    </Provider>
  );
}
