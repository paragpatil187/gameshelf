"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
}
