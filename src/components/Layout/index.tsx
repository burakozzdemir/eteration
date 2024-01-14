import React from "react";

type ILayout = {
  children: React.ReactNode;
};

const Layout = ({ children }: ILayout) => {
  return (
    <>
        <main>{children}</main>
    </>
  );
};

export default Layout;
