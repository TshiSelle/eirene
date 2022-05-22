import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";


const SiteFooter = () => {

  return (

    <footer class="footer">
      <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
          <span> About Eirene</span> The next step to self-care therapy. We at Eirene are driven to help people with their daily life, support their emotional state and always be there for them in their time of need.
        </p>
        <div class="icons">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-center col-md-4 col-sm-6">
        <div>
          <i class="fa fa-map-marker"></i>
          <p><span> Tareek AL Jadeeda</span> Beirut, Lebanon</p>
        </div>
        <div>
          <i class="fa fa-phone"></i>
          <p> (+961) 76 93 92 83</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="#">office@eirene.com</a></p>
        </div>
      </div>
      <div class="footer-right col-md-4 col-sm-6">
        <h2> Eirene<span> <img src="./images/eirene_logo.svg" /></span></h2>
        <p class="menu">
          <Link to={'/'}>Home.</Link>
          <Link to={'/find-therapists'}>Therapists.</Link>
          <Link to={'/Journal'}>Journal.</Link>
          <Link to={'/Meditations'}>Meditation.</Link>
          <Link to={'/about'}>About Us.</Link>
          <Link to={'/contact'}>Contact.</Link>
        </p>
        <p class="name"> Eirene &copy; 2022</p>
      </div>
    </footer>

  );
};


export default SiteFooter;
