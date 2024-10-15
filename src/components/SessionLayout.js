// src/components/SessionLayout.js
"use client"; // تأكد من أن هذا مكون عميل
import { SessionProvider } from "next-auth/react";

const SessionLayout = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionLayout;