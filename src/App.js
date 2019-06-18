import React, { Component } from 'react';

import './App.css';
import "./post-bootstrap.css";
import ItemGrid from "./components/ItemGrid/ItemGrid";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import Description from "./components/Description/Description";
import Footer from "./components/Footer/Footer";
import VenueDetails from "./components/VenueDetails/VenueDetails";
import CuteSeparator from "./components/CuteSeparator/CuteSeparator";

class App extends Component {
  constructor(props){
    super(props);
    this.itemGridRef = React.createRef();
    this.attemptToLoadItems = this.attemptToLoadItems.bind(this);
    this.loadInterval = null;
    this.itemGridLoading = false;
  }

  componentDidMount(){
    setTimeout(()=>{
        this.attemptToLoadItems("Fallback timer trigger");
    }, 3000); //Give 3 seconds for the background image to load, or just begin anyway
  }

  //On an interval checks if itemGrid exists and if it does, begin fetch items
  attemptToLoadItems(caller) {
    if (this.itemGridRef && this.itemGridRef.current) {
      //Clear interval if it exists
      if(this.loadInterval !== null){
        clearInterval(this.loadInterval);
        this.loadInterval = null;
      }
      if(!this.itemGridLoading){ //Last final check
        console.log("Loading items.", caller);
        this.itemGridLoading = true;
        this.itemGridRef.current.fetchItems();
      }
    } else { //Found out it was unnecessary because the ref is always set if the component has mounted.
      // If it's called in the constructor, that's different
      if (this.loadInterval === null) { //If no wait interval has been set, start checking to load
        this.loadInterval = setInterval(() => {
          this.attemptToLoadItems("Set interval");
        }, 500)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Background onImageLoad={()=>{this.attemptToLoadItems("Image loaded trigger")}}/>
        <Header/>
        <VenueDetails/>
        <CuteSeparator/>
        <Description/>
        <div className={"container-fluid"}>
          <ItemGrid ref={this.itemGridRef}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
