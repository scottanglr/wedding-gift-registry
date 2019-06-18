import * as React from "react";

import "./ItemGrid.css";
import Item from "../Item/Item";

class ItemGrid extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.fetchItems = this.fetchItems.bind(this);
    this.formFailedWithThrownError = this.formFailedWithThrownError.bind(this);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.state = {
      resultSuccess: null,
      resultMessage: "",
      initialOrder: [] //This is used to keep items in their position when a user reserves one
    };
  }

  formFailedWithThrownError(errorInstance) {
    console.error("ERROR", errorInstance);
    this.setState({
      resultSuccess: false,
      resultMessage: errorInstance.message
    });
  }

  //This does not change the array order
  //It copies it across in the same order it already was
  changeAvailability(_id, to){
    let newItems = [];
    for(let item of this.state.items){
      if(item._id === _id){
        newItems.push(Object.assign(item, {available: to})) //State immutability concerns - create new object based off the old one
      }else{
        newItems.push(item) //You do not need entirely new deeply copied objects
      }
    }
    this.setState({
      items: newItems //newItems must be a new array
    })
  }

  static getInitialOrder(items){
    let order = [];
    if(Array.isArray(items)){
      for(let item of items){
        order.push(item._id)
      }
    }
    return order;
  }

  //Will not create an order for items which arrive mid-session, but this is not worth engineering.
  //No side effects
  static orderItems(newItems, order){
    let newOrdered = [];
    newItems = newItems.slice(0); //Clone at top level to allow for popping/slicing when done
    for(let id of order){
      for(let i = 0; i < newItems.length; i++){
        if(newItems[i]._id === id){
          newOrdered.push(newItems[i]);
          newItems.splice(i, 1); //Remove from the array
          break;
        }
      }
    }
    //Items from the initial order are now in newOrdered
    //Now move over items which were not in the initial
    for(let item of newItems){
      newOrdered.push(item);
    }
    return newOrdered;
  }

  fetchItems() {
    try {
      if (!window.fetch) {
        throw new Error("Your browser is not supported.");
      }
      window.fetch("/api/items", { method: "GET" })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") > -1) {
            return response.json();
          }
          throw new Error("Content type was not json.");
        }
        throw new Error("Network Error.");
      })
      .then((jsonObj) => {
        console.log(jsonObj);
        if (jsonObj && jsonObj.success === true && Array.isArray(jsonObj.items)) {
          //The point of the order logic is to keep the item in the same place when it is reserved/unreserved -- the same place as when it was downloaded
          //That doesn't mean I want to order the whole list so that it never moves, because I want the reserved ones still separated
          let orderedItems;
          let initialOrder;
          let newState = {};
          try {
            window.initialOrder = this.state.initialOrder;
            if (Array.isArray(this.state.initialOrder) && this.state.initialOrder.length === 0) {
              initialOrder = ItemGrid.getInitialOrder(jsonObj.items);
              newState.initialOrder = initialOrder; //only add it to setState if its new
            } else {
              initialOrder = this.state.initialOrder;
            }
            orderedItems = ItemGrid.orderItems(jsonObj.items, initialOrder); //No side effect on jsonObj.items
          }catch(e){
            console.error(e);
            orderedItems = jsonObj.items;
          }
          newState.items = orderedItems;
          newState.resultSuccess = true;
          this.setState(newState);
        } else {
          //Reset
          this.setState({
            resultSuccess: false,
            items: [],
            initialOrder: []
          });
        }
        this.setState({
          resultMessage: jsonObj.message
        });
      })
      .catch((errorInstance) => {
        this.formFailedWithThrownError(errorInstance);
      });
    } catch (errorInstance) {
      this.formFailedWithThrownError(errorInstance);
    }
  }

  render() {
    return (
      <div className={"row item-grid-container"}>
        {this.state.resultSuccess === false &&
        <div className={"item-grid-load-error-message"}>
          {this.state.resultMessage} Registry items could not be loaded. Please reload the page.
        </div>
        }
        {!(Array.isArray(this.state.items)) && this.state.resultSuccess !== false &&
          <div className={"item-grid-loader-wrapper"}>
              <div className="item-grid-loader"/>
          </div>
        }
        {Array.isArray(this.state.items) &&
        <React.Fragment>
          <Item
            key={"monetarygiftstart"}
            monetaryGift={true}
            title={"Monetary Gift"}
            imageUrl={"/monetary-gift.png"}
            _id={"monetarygift"}
            available={true}
          />
          {
            this.state.items.map((itemData, index) => {
              return (<Item
                key={itemData._id}
                title={itemData.title}
                imageUrl={itemData.imageUrl}
                _id={itemData._id}
                available={itemData.available}
                fetchItems={this.fetchItems}
                changeAvailability={this.changeAvailability}
              />);
            })
          }
          <Item
            key={"monetarygiftend"}
            monetaryGift={true}
            title={"Monetary Gift"}
            imageUrl={"/monetary-gift.png"}
            _id={"monetarygift"}
            available={true}
          />
        </React.Fragment>
        }
      </div>
    );
  }
}
export default ItemGrid;