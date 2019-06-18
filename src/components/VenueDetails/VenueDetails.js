import * as React from "react";
import "./VenueDetails.css";


const ParkingText = () => {
  return (
    <React.Fragment>
      <div>
        There is parking available along Small Street and Long Street, as well as a parking area off Long Street.
      </div>
      <br/>
      <div>
        Please leave parking within the church grounds to the wedding party.
      </div>
      <br/>
      <div>
        <a target="_blank" href={"https://www.google.com/maps?daddr=address"}>Get Directions</a>
      </div>
    </React.Fragment>
  );
};

const VenueDetails = (props) => {
  return (
    <div className={"venue-details-container-outer"}>
      <div className={"venue-details-container container-fluid border-primary"}>
        <div className={"row venue-details-top-group my-5"}>
            <div className={"col-12 px-3 col-md-6 d-flex align-items-center justify-content-center text-center"}>
              <div>
                <div className={"venue-details-container-header mb-4"}>
                  Anthony Memorial Church
                </div>
                <div className={"d-none d-md-block venue-details-body-text"}>
                  <ParkingText/>
                </div>
              </div>
            </div>
            <div className={"venue-details-image-wrapper col-12 col-md-6"}>
              <img alt={"Anthony Memorial Church"} src={"/church.jpg"} className={"venue-details-image img-fluid"}/>
            </div>
          </div>
        <div className={"row d-md-none my-5"}>
          <div className={"venue-details-container-body-text-wrapper col"}>
            <div className={"venue-details-body-text text-center mx-auto px-3"}>
              <ParkingText/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VenueDetails.defaultProps = {};

export default VenueDetails;