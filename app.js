//Utilisation de API http://transport.opendata.ch
"use strict";
const STATION = "Yverdon";

const req = new XMLHttpRequest();

req.open(
  "GET",
  `http://transport.opendata.ch/v1/stationboard?station=${STATION}&limit=20`
);
req.send();

req.addEventListener("load", () => {
  //Récupération de la req transformer en Object litéral
  const data = JSON.parse(req.response);

  //Envoie de chaque train à la fonction addTrain
  if (data.stationboard) {
    data.stationboard.forEach((train) => {
      addTrain(train);
    });
  }
});

//Fonction pour ajouter le train
const addTrain = (train) => {
  console.log(train);
  const departureDate = train.stop.departure
  const departureHour = departureDate.slice(11,13);
  const departureMinute = departureDate.slice(14,16);
  const html = `
        <article>
        <div class="time">${departureHour}:${departureMinute}</div>
        <div class="category" data-category="${train.category}">${train.category}</div>
        <div class="destination">${train.to}</div>
    </article>
    `;
  document.querySelector("#board").insertAdjacentHTML("beforeend", html);
};
