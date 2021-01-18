import React, { Component } from "react";

import "./app.css";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../pages-wrapper/people-page";
import PlanetPage from "../pages-wrapper/planet-page";
import StarshipPage from "../pages-wrapper/starship-page";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: 5,
    selectedPlanet: null,
    selectedStarship: null,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  componentDidCatch(error, info) {
    // debugger;
    console.log("componentDidCatch()");
    this.setState({ hasError: true });
  }

  onPlanetSelected(selectedPlanet) {
    this.setState({ selectedPlanet });
  }

  onStarshipSelected(selectedStarship) {
    this.setState({ selectedStarship });
  }

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              getData={this.swapiService.getAllPlanets}
              onItemSelected={this.onPlanetSelected}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPlanet} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              getData={this.swapiService.getAllStarships}
              onItemSelected={this.onStarshipSelected}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedStarship} />
          </div>
        </div>
      </div>
    );
  }
}
