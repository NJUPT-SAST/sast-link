import BackLayout from "@/components/Layout/BackLayout";
import { Layout } from "@/components/Layout";
import { ReactNode } from "react";

export default function LoginLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <>
      <BackLayout type="orange" />
      <Layout>{children}</Layout>
    </>
  );
}
