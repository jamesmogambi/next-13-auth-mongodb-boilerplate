"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/app/store";
interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>;
    </Provider>
  );
};

export default Providers;
