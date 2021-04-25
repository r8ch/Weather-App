let presentDate = new Date();
let weekday = presentDate.getDay();
let date = presentDate.getDate();
let month = presentDate.getMonth();
let year = presentDate.getFullYear();
let hours = presentDate.getHours();
let minutes = presentDate.getMinutes();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dateHeading = document.querySelector("#current-date-time");
dateHeading.innerHTML = `${weekdays[weekday]}, ${date} ${months[month]} ${year} <br />${hours}:${minutes}`;

function displayTemperature(response) {
  let cityTemp = response.data.main.temp;
  let temperatureHeading = document.querySelector("#current-temp");
  temperatureHeading.innerHTML = Math.round(cityTemp);
}
function displayByCity(event) {
  event.preventDefault();
  let apiKey = `01ef729c80c15fd2961d6c2c3b6616c8`;
  let cityInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value.toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let form = document.querySelector("#search-engine");
form.addEventListener("submit", displayByCity);

function displayByCoordinates(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let cityTemp = response.data.main.temp;
  let temperatureHeading = document.querySelector("#current-temp");
  temperatureHeading.innerHTML = Math.round(cityTemp);
}
function showPosition(position) {
  let apiKey = `01ef729c80c15fd2961d6c2c3b6616c8`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayByCoordinates);
}
function getCoordinates() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCoordinates);
