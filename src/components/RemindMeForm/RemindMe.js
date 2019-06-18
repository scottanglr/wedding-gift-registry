import * as React from "react";
import PropTypes from "prop-types";

class RemindMeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      formValues: {
        "REMIND[year]": "2018"
      }
    };
  }

  onSubmit(e){
    this.props.closePopup();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => {
      return {
        formValues: Object.assign({}, prevState.formValues, { [name]: value })
      };
    });
    return value;
  }

  //Set the form action to your mail chimp email list url
  render() {
    return (
      <form
        action="#"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        onSubmit={this.onSubmit}
        target="_blank"
      >
        <div
          className={
            "modal-backdrop fade show"
          }
          style={{ pointerEvents: "none" }}
        />
        <div
          className={
            "modal fade show d-block"
          }
          tabIndex="-1"
          role="dialog"
        >
          <div
            onClick={this.props.closePopup}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute"
            }}
          />
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remind me later</h5>
                <button
                  type="button"
                  className="close"
                  onClick={this.props.closePopup}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div id="mc_embed_signup">
                  <div id="mc_embed_signup_scroll">
                    <div className="form-group">
                      <label htmlFor="mce-EMAIL" className={"w-100"}>
                        Email Address <span className="asterisk">*</span>
                      </label>
                      <input
                        onChange={this.handleInputChange}
                        type="email"
                        autoComplete='email'
                        value={this.state.formValues["EMAIL"] || ""}
                        name="EMAIL"
                        required
                        className="required email form-control"
                        id="mce-EMAIL"
                      />
                      <small className="form-text">
                        Enter your email address to receive a reminder by
                        email.
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mce-FNAME">First Name </label>
                      <input
                        onChange={this.handleInputChange}
                        type="text"
                        value={this.state.formValues["FNAME"] || ""}
                        name="FNAME"
                        className="form-control"
                        id="mce-FNAME"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mce-REMIND-day">
                        Remind on <span className="asterisk">*</span>
                      </label>
                      <div className="datefield">
                        <span className="subfield dayfield">
                          <input
                            onChange={this.handleInputChange}
                            className="datepart required px-1 form-control d-inline-block"
                            type="text"
                            pattern="[0-9]*"
                            placeholder="DD"
                            required
                            size="3"
                            maxLength="2"
                            name="REMIND[day]"
                            value={this.state.formValues["REMIND[day]"] || ""}
                            id="mce-REMIND-day"
                            style={{width: "initial"}}
                          />
                        </span>{" "}
                        /
                        <span className="subfield monthfield">
                          <input
                            onChange={this.handleInputChange}
                            className="datepart required px-1 form-control d-inline-block"
                            type="text"
                            pattern="[0-9]*"
                            placeholder="MM"
                            required
                            size="3"
                            maxLength="2"
                            style={{width: "initial"}}
                            name="REMIND[month]"
                            value={this.state.formValues["REMIND[month]"] || ""}
                            id="mce-REMIND-month"
                          />
                        </span>{" "}

                        <span className="subfield yearfield">
                          <input
                            onChange={this.handleInputChange}
                            className="datepart required px-1"
                            type="hidden"
                            pattern="[0-9]*"
                            placeholder="YYYY"
                            required
                            size="4"
                            maxLength="4"
                            name="REMIND[year]"
                            value={this.state.formValues["REMIND[year]"] || ""}
                            id="mce-REMIND-year"
                          />
                        </span>
                      </div>
                    </div>
                    <div id="mce-responses" className="clear">
                      <div
                        className="response"
                        id="mce-error-response"
                        style={{ display: "none" }}
                      />
                      <div
                        className="response"
                        id="mce-success-response"
                        style={{ display: "none" }}
                      />
                    </div>
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        onChange={this.handleInputChange}
                        type="text"
                        name="b_f683856eb60ea6c7b1048bf46_84b551a4bc"
                        value={
                          this.state.formValues[
                            "b_f683856eb60ea6c7b1048bf46_84b551a4bc"
                            ] || ""
                        }
                        tabIndex="-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  SET REMINDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

RemindMeForm.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default RemindMeForm;
