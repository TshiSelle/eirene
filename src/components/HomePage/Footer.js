import React from "react";
import ContactUsExt from "../ContactUs/ContactUsExt";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const SiteFooter = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/contact" ? (
        <Footer>
          <ContactUsExt />
        </Footer>
      ) : null}
    </>
  );
};

const Footer = styled.footer`
  padding: 100px 0 50px;
  background-color: #f5f5f5;
`;
export default SiteFooter;
