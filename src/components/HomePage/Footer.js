import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";
import "./footer.css"


const SiteFooter = () => {

  return (

    <footer className="footer">
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> About Eirene</span> The next step to self-care therapy. We at Eirene are driven to help people with their daily life, support their emotional state and always be there for them in their time of need.
        </p>
        {/*  <div className="icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
  </div> */}
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span> Tareek AL Jadeeda</span> Beirut, Lebanon</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p> (+961) 76 93 92 83</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="#">office@eirene.com</a></p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <h2> Eirene<div className="eireneImg"> </div></h2>
        <p className="menu">
          <Link to={'/'}>Home</Link> |
          <Link to={'/find-therapists'}> Therapists</Link> |
          <Link to={'/Journal'}> Journal</Link> |
          <Link to={'/Meditations'}> Meditation</Link> |
          <Link to={'/about'}> About Us  </Link> |
          <Link to={'/contact'}> Contact</Link>
        </p>
        <p className="name"> Eirene &copy; 2022</p>
      </div>
    </footer>

  );
};


export default SiteFooter;
