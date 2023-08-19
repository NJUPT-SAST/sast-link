"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

const SWRProvider = (props: { fallback: any; children: ReactNode }) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>{props.children}</SWRConfig>
  );
};

export { SWRProvider };
