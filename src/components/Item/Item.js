import * as React from "react";
import PropTypes from "prop-types";
import "./Item.css";
import ReserveForm from "../ReserveForm/ReserveForm";
import MonetaryForm from "../MonetaryForm/MonetaryForm";

class Item extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = {
      showingPopup: false,
    }
  }

  showPopup(){
    this.setState({
      showingPopup: true
    })
  }

  closePopup(){
    this.setState({
      showingPopup: false
    })
  }

  render() {
    return (
      <React.Fragment>
      <div className={"m-auto m-md-0 col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 item-card-container" + (!this.props.available ? " item-unavailable" : "")}>
       <div className="card item-card">
          <img className="card-img-top item-image" rel="noreferrer" src={this.props.imageUrl} alt={"Image for " + this.props.title}/>
          <div className="card-body text-center">
            <h5 className="card-title item-title">{this.props.title}</h5>
            <h6 className="card-title font-italic text-primary">{!this.props.available ? "Already Reserved" : ""}</h6>
            <button onClick={this.showPopup} className="btn btn-primary item-button">{this.props.available ? "Give This Gift" : "Cancel Reservation"}</button>
          </div>
        </div>
      </div>
        {this.state.showingPopup && !this.props.monetaryGift &&
        <ReserveForm changeAvailability={this.props.changeAvailability} fetchItems={this.props.fetchItems} title={this.props.title} available={this.props.available} closePopup={this.closePopup} _id={this.props._id}/>
        }
        {this.state.showingPopup && this.props.monetaryGift &&
        <MonetaryForm closePopup={this.closePopup} _id={this.props._id}/>
        }
        </React.Fragment>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func,
  changeAvailability: PropTypes.func,
  monetaryGift: PropTypes.bool
};

export default Item;
