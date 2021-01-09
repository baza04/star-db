import React from "react";

const swapiUrl = "https://swapi.dev/api/people/1/";

const getHeroes = async (url = swapiUrl) => {
  const res = await fetch(url);
  const body = await res.json();
  return body;
};

const App = () => {
  return (
    <>
      {getHeroes(swapiUrl).then((body) => {
        console.log(body);
      })}
      <h1>App</h1>
    </>
  );
};

export default App;
