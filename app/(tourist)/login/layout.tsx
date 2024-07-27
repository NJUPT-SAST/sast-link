import BackLayout from "@/components/Layout/BackLayout";
import { Layout } from "@/components/Layout";
import LinkLogo from "@/public/linklogo.svg";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <>
      <BackLayout type="orange" />
      <Layout>
        {" "}
        <div className={"pageTitle"}>
          <Image src={LinkLogo} width={220} height={40} alt="link logo" />
        </div>
        <div className={"globalContainer"}>{children}</div>
      </Layout>
    </>
  );
}
