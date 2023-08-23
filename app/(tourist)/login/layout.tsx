import BackLayout from "@/components/Layout/BackLayout";
import { Layout } from "@/components/Layout";
import { ReactNode } from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <>
      <BackLayout type="orange" />
      <Layout>{children}</Layout>
    </>
  );
}
