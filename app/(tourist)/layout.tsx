import { ReactNode, useEffect } from "react";

const AuthGuard = (props: { children: ReactNode }) => {
  const { children } = props;

  return <>{children}</>;
};

export default AuthGuard;
