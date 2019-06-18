import * as React from "react";
import PropTypes from "prop-types";

class ReserveForm extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.formFailedWithThrownError = this.formFailedWithThrownError.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = {
      resultMessage: "",
      resultSuccess: null,
      ajaxState: "ready",
      formValues: {}
    };
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

  formFailedWithThrownError(errorInstance){
    console.error("ERROR", errorInstance);
    this.setState({
      resultSuccess: false,
      resultMessage: errorInstance.message
    });
  }

  onSubmit(e){
    try {
      e.preventDefault();
      this.setState({
        ajaxState: "processing"
      });
      if (!window.fetch) {
        throw new Error("Your browser is not supported.");
      }
      let URL;
      let data;
      if(this.props.available){
        URL = "/api/reserve/";
        data = {email: this.state.formValues.email, name: this.state.formValues.name};
      }else{
        URL = "/api/cancel-reservation/";
        data = {email: this.state.formValues.email}
      }
      window.fetch(URL + this.props._id, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then((response) => {
        console.log(response);
        if(response.headers.get("content-type").includes("application/json")) {
          return response.json();
        }
        throw new Error("Content type was not json.")
      })
      .then((jsonObj)=>{
        console.log(jsonObj);
        if(jsonObj.success === true){
          this.setState({
            resultSuccess: true
          });
          this.props.changeAvailability && this.props.changeAvailability(this.props._id, !this.props.available);
        }else{
          this.setState({
            resultSuccess: false,
          })
        }
        this.setState({
          resultMessage: jsonObj.message,
        })
      })
      .catch((errorInstance) => {
        this.formFailedWithThrownError(errorInstance)
      })
      .then(()=>{
        this.setState({
          ajaxState: "ready"
        });
        this.props.fetchItems && this.props.fetchItems(); //Always update: on request or fail
      })
    }catch(errorInstance){
      this.formFailedWithThrownError(errorInstance)
    }
    return false;
  }

  closePopup(){ //Update on close if success
    //The logic has been moved so that it updates as soon as its done
    // if(this.state.resultSuccess === true){
    //   this.props.changeAvailability && this.props.changeAvailability(this.props._id, !this.props.available);
    //   this.props.fetchItems && this.props.fetchItems(); //Fetching items done just to make sure it is in sync
    // }else if (this.state.resultSuccess === false){
    //   this.props.fetchItems && this.props.fetchItems();
    // }
    this.props.closePopup();
    //Unmounting will clear the state
    //Changing the availability after close will set the form to the appropriate state for next time
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <div>
        <div className={"modal-backdrop fade show"} style={{ pointerEvents: "none" }}/>
        <div className={"modal fade show d-block"} tabIndex="-1" role="dialog">
          <div onClick={this.closePopup} style={{ top: 0, left: 0, right: 0, bottom: 0, position: "absolute" }}/>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {!this.props.available &&
                <h5 className="modal-title">Cancel reservation for {this.props.title}</h5>
                }
                {this.props.available &&
                <h5 className="modal-title">Give {this.props.title}</h5>
                }
                <button type="button" className="close" onClick={this.closePopup} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                {/*Only show form if have not successfully submitted*/}
                {/*otherwise it will change from a reserve to a cancel form while you are still looking at it*/}
                {this.state.resultSuccess !== true &&
                <React.Fragment>
                  {this.props.available &&
                  <div className="form-group">
                    <label className={"w-100"} htmlFor={"form-name-" + this.props._id}>Name(s)</label>
                    <input type="text" name={"name"} value={this.state.formValues["name"] || ""}
                           onChange={this.handleInputChange} required className="form-control"
                           id={"form-name-" + this.props._id} aria-describedby={"form-name-help-" + this.props._id}/>
                    <small id={"form-name-help-" + this.props._id} className="form-text">Enter your name in case your
                      card
                      goes missing.
                    </small>
                  </div>
                  }

                  <div className="form-group">
                    <label className={"w-100"} htmlFor={"form-email-" + this.props._id}>Email address</label>
                    <input type="email" autoComplete='email' required className="form-control"
                           id={"form-email-" + this.props._id} aria-describedby={"form-email-help-" + this.props._id}
                           value={this.state.formValues["email"] || ""} name={"email"}
                           onChange={this.handleInputChange}/>
                    {!this.props.available &&
                    <small id={"form-email-help-" + this.props._id} className="form-text">Enter your email address to
                      cancel this gift reservation.
                    </small>
                    }
                    {this.props.available &&
                    <small id={"form-email-help-" + this.props._id} className="form-text">Enter your email address in
                      case you need to cancel this gift reservation.
                    </small>
                    }
                  </div>
                </React.Fragment>
                }
                
                <small>
                  <strong className={"text-dark"}>
                  {this.state.resultMessage}
                  </strong>
                </small>

              </div>
              
              <div className="modal-footer">
                {(this.state.resultSuccess === true || this.state.resultSuccess === false ) &&
                <button type="button" onClick={this.closePopup} className="btn btn-primary">Close</button>
                }
                {this.state.resultSuccess !== true &&
                <React.Fragment>
                  {!this.props.available &&
                  <button type="submit" disabled={this.state.ajaxState === "processing"} className="btn btn-primary">Cancel reservation
                  </button>
                  }
                  {this.props.available &&
                  <button type="submit" disabled={this.state.ajaxState === "processing"} className="btn btn-primary">I
                    will be giving this gift
                  </button>
                  }
                </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    );
  }
}

ReserveForm.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  fetchItems: PropTypes.func,
  changeAvailability: PropTypes.func,
};

export default ReserveForm;