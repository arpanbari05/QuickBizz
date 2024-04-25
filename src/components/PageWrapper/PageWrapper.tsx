import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default PageWrapper;
