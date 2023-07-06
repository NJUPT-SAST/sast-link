"use client";

import { Provider } from "react-redux";
import { defaultStore, store } from ".";
import { ReactNode } from "react";

export const ReduxProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  return <Provider store={store} serverState={defaultStore}>{children}</Provider>;
};
