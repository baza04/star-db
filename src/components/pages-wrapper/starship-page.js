import React, { Component } from "react";

import StarshipDetails from "../starship-details";
import ItemList from "../item-list";

export default class StarshipPage extends Component {
  state = {
    selectedStarship: 5,
  };

  onStarshipSelected = (selectedStarship) => {
    this.setState({ selectedStarship });
  };

  render() {
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onStarshipSelected} />
        </div>
        <div className="col-md-6">
          <StarshipDetails personId={this.state.selectedStarship} />
        </div>
      </div>
    );
  }
}