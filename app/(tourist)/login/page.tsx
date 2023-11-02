"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginStep1 } from "./loginStep1";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addRedirect } from "@/redux/features/login";

const Login = () => {
  const searchParams = useSearchParams();
  // TODO 错误处理
  function formatRedirectParams(redirectParams: string | null) {
    if (redirectParams === null) return null;
    const redirectArray = redirectParams.split("?");
    if (redirectArray.length > 2) {
      return redirectArray[0] + "?" + JSON.parse(redirectArray[1]).join("&");
    }
    return null;
  }
  const redirectParams = searchParams.get("redirect");
  const redirect = formatRedirectParams(redirectParams);
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
