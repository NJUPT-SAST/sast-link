"use client";

import dynamic from "next/dynamic";

const LoginStep1 = dynamic(() => import("@/app/(tourist)/login/loginStep1"), {
  ssr: false,
});

const Login = () => {
  return (
    <>
      <LoginStep1 />
    </>
  );
};

export default Login;
