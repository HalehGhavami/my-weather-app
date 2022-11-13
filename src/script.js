function formatDate(now) {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let date = new Date();
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${days[date.getDay()]} ${hour}:${min}`;
}
let currentDate = document.querySelector('.date');

let date = new Date();
currentDate.innerHTML = formatDate(date);

function displayWeatherCondition(response) {
  document.querySelector('#city-title').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector('.description').innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = '6bfa54f242cbb59343d4e58db578dc61';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(e) {
  e.preventDefault();
  let inputCity = document.querySelector('#search-input');
  let inputCityValue = inputCity.value;
  if (inputCityValue && inputCityValue.trim().length > 0) {
    document.querySelector('.city-title').innerHTML = inputCityValue;
    searchCity(inputCityValue);
  }
}

function searchLocation(pos) {
  let apiKey = '6bfa54f242cbb59343d4e58db578dc61';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', handleSubmit);

let currentButton = document.querySelector('#current-location-button');
currentButton.addEventListener('click', getCurrentLocation);

searchCity('Tehran');
