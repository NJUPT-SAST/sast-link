import React from "react";

export interface LoginContextProps {
  redirectParams: null | string;
  redirect: null | string;
  loginTicket?: string;
  handleTitle: (title: string) => void;
  handleStep: (step: 1 | -1) => void;
  handleTicket: (ticket: string) => void;
}

export const LoginContext = React.createContext<LoginContextProps>({
  redirectParams: null,
  redirect: null,
  handleTitle: (title: string) => void 0,
  handleStep: (step: 1 | -1) => void 0,
  handleTicket: () => void 0,
});

interface RegistContextProps {
  redirect: null | string;
  username?: string;
  registTicket?: string;
  currentStep: number;
  handleStep: (step: -1 | 1) => void;
  handleTicket: (ticket: string) => void;
  handleUsername: (username: string) => void;
}

export const RegistContext = React.createContext<RegistContextProps>({
  redirect: null,
  currentStep: 1,
  handleStep: (step: 1 | -1) => void 0,
  handleTicket: (ticket: string) => void 0,
  handleUsername: (username: string) => void 0,
});

export const SelectedAccountContext = React.createContext({
  selected: 0,
  setSelected: (index: number) => {},
});
