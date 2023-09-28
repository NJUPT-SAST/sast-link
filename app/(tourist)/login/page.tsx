"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginStep1 } from "./loginStep1";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addRedirect } from "@/redux/features/login";

const Login = () => {
  const searchParams = useSearchParams();
  // TODO 错误处理
  const redirectParams = searchParams.get("redirect");
  const redirect = redirectParams
    ? redirectParams?.split("?")[0] +
      "?" +
      JSON.parse(redirectParams?.split("?")[1] ?? "[]").join("&")
    : null;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!!redirect) {
      dispatch(addRedirect(redirect));
    }
  }, [redirect, dispatch]);
  return (
    <>
      <LoginStep1 />
    </>
  );
};

export default Login;
