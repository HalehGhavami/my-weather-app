// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   'san francisco': {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

//------------Week 3---------------

// let city = prompt('Enter a city');
// if (city && city.trim().length > 0) {
//   city = city.toLocaleLowerCase();
// }
// let result = city in weather;

// if (result) {
//   let temperature = weather[city].temp;
//   let humidity = weather[city].humidity;
//   let celsiusTemperature = Math.round(temperature);
//   let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//   alert(
//     `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

//--------------Week 4--------------------
//Feature #1
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

//Feature #2

// function cityTitle(e) {
//   e.preventDefault();
//   let inputCity = document.querySelector('#search-input');
//   let value = inputCity.value;
//   if (value && value.trim().length > 0) {
//     value = value.trim().charAt(0).toUpperCase() + value.slice(1);
//     document.querySelector('.city-title').innerHTML = value;
//   }
// }

// let formSubmit = document.querySelector('form');
// formSubmit.addEventListener('submit', cityTitle);

//Bonus Feature
// function cToF() {
//   let cTemp = document.querySelector('#temperature').innerHTML;
//   let cToFahr = Math.round((cTemp * 9) / 5 + 32);
//   document.querySelector('#temperature').innerHTML = cToFahr;
// }

// let fahrenheitLink = document.querySelector('#fahrenheit-link');
// fahrenheitLink.addEventListener('click', cToF);

// function fToC() {
//   let fTemp = document.querySelector('#temperature').innerHTML;
//   let fToCel = Math.round(((fTemp - 32) * 5) / 9);
//   document.querySelector('#temperature').innerHTML = fToCel;
// }
// let celsiusLink = document.querySelector('#celsius-link');
// celsiusLink.addEventListener('click', fToC);

//-----------week 5---------------
//get city input
function cityTitle(e) {
  e.preventDefault();
  let inputCity = document.querySelector('#search-input');
  let inputCityValue = inputCity.value;
  if (inputCityValue && inputCityValue.trim().length > 0) {
    document.querySelector('.city-title').innerHTML = inputCityValue;
  }
  //get temprature of input city
  let apiKey = '6bfa54f242cbb59343d4e58db578dc61';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&appid=${apiKey}&units=metric`;
  function getTemperature(response) {
    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  }
  axios.get(apiUrl).then(getTemperature);
}

let formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', cityTitle);

function getCoordinates(e) {
  e.preventDefault();
  function success(pos) {
    let apiKey = '6bfa54f242cbb59343d4e58db578dc61';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}`;
    function getCityName(response) {
      let cityTitle = document.querySelector('h1');
      cityTitle.innerHTML = response.name;
    }
    axios.get(apiUrl).then(getCityName);
  }

  navigator.geolocation.getCurrentPosition(success);
}

let currentButton = document.querySelector('#current-location-button');
currentButton.addEventListener('click', getCoordinates);
