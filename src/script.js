function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `Last updated: ${day} ${hour}:${min}`;
}

function displayWeatherCondition(response) {
  document.querySelector('.date').innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector('#city-title').innerHTML = response.data.name;

  document.querySelector('.description').innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    '#humidity'
  ).innerHTML = `Humidity: <span>${response.data.main.humidity}</span> %`;

  document.querySelector(
    '#wind'
  ).innerHTML = `Wind: <span>${response.data.wind.speed}</span> km/h`;

  celsiusTemp = response.data.main.temp;
  let tempElement = document.querySelector('#temperature');
  tempElement.innerHTML = Math.round(celsiusTemp);

  let iconElement = document.querySelector('#icon');
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute('alt', response.data.weather[0].description);
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

function displayFrenheit(e) {
  e.preventDefault();
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector('#temperature');
  tempElement.innerHTML = fahrenheitTemp;
}

function displayCelsius(e) {
  e.preventDefault();
  fahrenheitLink.classList.add('active');
  celsiusLink.classList.remove('active');
  let tempElement = document.querySelector('#temperature');
  tempElement.innerHTML = Math.round(celsiusTemp);
}

//global variables

let formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFrenheit);

let celsiusTemp = null;

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsius);

searchCity('Tehran');
