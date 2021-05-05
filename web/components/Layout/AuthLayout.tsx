import React from "react";
import AuthNavbar from "../Navbars/AuthNavbar";

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthNavbar />
      <main>
        <section>
          <div></div>
          {children}
        </section>
      </main>
    </>
  );
};

export default AuthLayout;
