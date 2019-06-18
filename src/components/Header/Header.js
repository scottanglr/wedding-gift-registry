import * as React from "react";
import "./Header.css";
import RemindMeForm from "../RemindMeForm/RemindMe";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.state = {
      popupOpen: false
    }
  }

  closePopup(){
    this.setState({
      popupOpen: false
    })
  }

  openPopup(){
    this.setState({
      popupOpen: true
    })
  }

  render() {
    return (
      <div className={"header"}>
        <div className={"header-remind-me-wrapper"}>
          {/*<button type="button" onClick={this.openPopup} className="btn btn-primary header-remind-me-button">Remind Me About This Later</button>*/}
          <button type="button" onClick={this.openPopup} className="btn btn-primary btn-sm header-remind-me-button">Remind Me To Come Back Later</button>
          {/*Don't mount / unmount because the form needs to stay on the DOM to finish submitting*/}
          <div className={this.state.popupOpen ? "" : "d-none"}>
            <RemindMeForm closePopup={this.closePopup}/>
          </div>
        </div>
        <h1 className={"header-heading"}>Jack & Jill's Wedding</h1>
      </div>
    );
  }
}

Header.defaultProps = {};

export default Header;