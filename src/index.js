import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import getDataFromApi from "./scripts/dataFromApi";
// import data from "./scripts/data";
import { TrendingProvider } from "./scripts/trendingContext";

const apiKey = `9d39ec33788d4313acdd62a7f68d6bb3`;
const urlForTrending = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
const dataForTrending = await getDataFromApi(urlForTrending);

if (dataForTrending) {
  dataForTrending.recipes.forEach((obj) => {
    if (obj.dishTypes.length !== 0)
      obj.name =
        obj.dishTypes[Math.floor(Math.random() * obj.dishTypes.length)];
    else obj.name = "Dish";
  });
}
console.log(dataForTrending);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TrendingProvider value={dataForTrending}>
    <App />
  </TrendingProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
