import React from "react";
import AuthNavbar from "../Navbars/AuthNavbar";
import Image from "next/image";

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthNavbar />
      <main className="relative w-full h-full py-40 min-h-screen">
        <Image
          className="absolute top-0 w-full h-full z-0 object-cover"
          src="/img/auth-bg.png"
          layout="fill"
        />
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
