import * as React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <a className={"footer-anchor"} href={"mailto:email@example.com"}>Contact Us By Email</a>
  );
};

Footer.defaultProps = {};

export default Footer;