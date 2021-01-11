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
        return res.results;
    }

    getPerson(id) {
        return this.getData(`/people/+${id}/`);
    }

    async getAllPlanets() {
        const res = await this.getData(`/planets/`);
        return res.results;
    }

    getPlanet(id) {
        return this.getData(`/planets/${id}/`);
    }

    async getAllStarships() {
        const res = await this.getData(`/starships/`);
        return res.results;
    }

    getStarship(id) {
        return this.getData(`/starships/${id}/`);
    }
}

const swapi = new SwapiService();

swapi
    .getAllPeople()
    .then((data) => console.log("recieved data: ", data))
    .catch((err) => console.log("err body: ", err));

swapi
    .getPerson(4)
    .then((p) => console.log(p.name))
    .catch((err) => console.log(err));

swapi
    .getAllStarships()
    .then((s) => console.log("data:", s))
    .catch((e) => console.log("err:", e));
