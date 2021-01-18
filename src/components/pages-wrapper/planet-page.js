import React, { Component } from "react";

import PlanetDetails from "../planet-details";
import ItemList from "../item-list";

export default class PlanetPage extends Component {
  state = {
    selectedPlanet: 5,
  };

  onPlanetSelected = (selectedPlanet) => {
    this.setState({ selectedPlanet });
  };

  render() {
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPlanetSelected} />
        </div>
        <div className="col-md-6">
          <PlanetDetails personId={this.state.selectedPlanet} />
        </div>
      </div>
    );
  }
}
