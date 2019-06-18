import * as React from "react";
import "./Description.css";

const Description = (props) => {
  return (
    <div className={"description-container-outer"}>
    <div className={"description-container border-primary"}>
      <div className={"description-container-header"}>
        Gift Registry
      </div>
      <div className={"description-container-body-text-wrapper"}>
        <div className={"description-container-body-text"}>
          <div>
          We are thankful for the contribution that each of you has made to our lives. If you choose to bestow a gift, we have listed some ideas below.
          </div>
          <br/>
          <div>
            We look forward to celebrating with you!
          </div>
          <br/>
          <div>
            With love,
          </div>
          <div>
            Jack and Jill
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

Description.defaultProps = {};

export default Description;