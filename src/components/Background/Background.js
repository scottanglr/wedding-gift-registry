import * as React from "react";
import "./Background.css";
import PropTypes from "prop-types";


const Background = (props) => {
  return (
    <React.Fragment>
      {/*This image is used to detect when the header image has downloaded to then grab the items*/}
      <img aria-hidden alt={"image-onload-helper"} style={{ display: "none" }} onLoad={props.onImageLoad} src={"/header-image.jpg"}/>
      <div className={"background-image"}/>
    </React.Fragment>
  );
};

Background.defaultProps = {};

Background.propTypes = {
  onImageLoad: PropTypes.func,
};

export default Background;