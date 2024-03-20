"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginStep1 } from "./loginStep1";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addRedirect } from "@/redux/features/login";

const Login = () => {
  // TODO 错误处理
  return (
    <>
      <LoginStep1 />
    </>
  );
};

export default Login;
