export default class SwapiService {
  _apiBase = "https://swapi.dev/api/";

  async getData(url = "") {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok)
      throw new Error(
        `Couldn't fetch: ${this._apiBase}${url} status: ${res.status}`
      );

    const body = await res.json();
    return body;
  }

  async getAllPeople() {
    const res = await this.getData("/people/");
    return res.results.map((person) => this._transformPerson(person));
  }

  getPerson(id) {
    const person = this.getData(`/people/+${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getData(`/planets/`);
    return res.results.map((planet) => this._transformPlanet(planet));
  }

  async getPlanet(id) {
    const planet = await this.getData(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getData(`/starships/`);
    return res.results.map((ship) => this._transformStarship(ship));
  }

  async getStarship(id) {
    const starship = this.getData(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  }

  _transformStarship(ship) {
    return {
      id: this._extractId(ship),
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      costInCredits: ship.costInCredits,
      length: ship.length,
      crew: ship.crew,
      passengers: ship.passengers,
      cargoCapacity: ship.cargoCapacity,
    };
  }

  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    };
  }
}
// /\/([0-9]*)\/$
// const swapi = new SwapiService();

// swapi
//     .getAllPeople()
//     .then((data) => console.log("recieved data: ", data))
//     .catch((err) => console.log("err body: ", err));

// swapi
//     .getPerson(4)
//     .then((p) => console.log(p.name))
//     .catch((err) => console.log(err));

// swapi
//     .getAllStarships()
//     .then((s) => console.log("data:", s))
//     .catch((e) => console.log("err:", e));
