import { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";

const RegistLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      <BackLayout type="orange" />
      <Layout>{children}</Layout>
    </>
  );
};

export default RegistLayout;
