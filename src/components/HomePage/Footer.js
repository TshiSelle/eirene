import React from "react";
import ContactUsExt from "../ContactUs/ContactUsExt";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const SiteFooter = () => {
  const location = useLocation();
  return (
    <>
    {location.pathname !== '/contact'
      ? <Footer>
          <ContactUsExt />
        </Footer>
      : null}
  </>
  )
};


const Footer = styled.footer`
  margin: 100px 0 50px;
`;
export default SiteFooter;