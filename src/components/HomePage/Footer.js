import React from "react";
import ContactUsExt from "../ContactUs/ContactUsExt";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuthenticator } from "../../context/AuthContext";
import ContactUs from "../ContactUs/ContactUs";

const SiteFooter = () => {
  const location = useLocation();
  const { loggedIn } = useAuthenticator();
  return (
    <>
      {location.pathname !== "/contact" ? (
        <Footer>
          {loggedIn ? (<ContactUs />) : (<ContactUsExt />)}
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
