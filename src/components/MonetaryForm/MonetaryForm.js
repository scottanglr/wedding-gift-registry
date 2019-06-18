import * as React from "react";
import PropTypes from "prop-types";

class MonetaryForm extends React.Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.props.closePopup();
  }

  render() {
    return (
      <div>
        <div className={"modal-backdrop fade show"} style={{ pointerEvents: "none" }}/>
        <div className={"modal fade show d-block"} tabIndex="-1" role="dialog">
          <div onClick={this.closePopup} style={{ top: 0, left: 0, right: 0, bottom: 0, position: "absolute" }}/>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Give A Monetary Gift (PayPal)</h5>
                <button type="button" className="close" onClick={this.closePopup} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div>
                  There will be a wishing well on the day if you would prefer not to give online or cannot use PayPal.
                </div>
                <br/>
                <small>
                  If you use your bank account or PayPal balance to pay, there is no fee. If you use your credit or
                  debit card, the fee is 2.4% + $0.30.
                </small>
              </div>
              <div className="modal-footer">
                {/*Put in paypal user ID*/}
                <a target={"__blank"} href={"https://paypal.me/"} onClick={this.closePopup}
                   className="btn btn-primary">Continue to PayPal</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MonetaryForm.propTypes = {
  _id: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default MonetaryForm;