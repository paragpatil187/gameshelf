import React, { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-white">Loading login...</div>}>
      <LoginClient />
    </Suspense>
  );
}
