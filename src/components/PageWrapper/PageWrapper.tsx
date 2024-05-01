import React, { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface PageWrapperProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  return (
    <React.Fragment>
      {!props.hideNavbar && <Navbar />}
      {props.children}
      {!props.hideFooter && <Footer />}
    </React.Fragment>
  );
};

export default PageWrapper;
