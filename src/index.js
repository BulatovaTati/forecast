// import './sass/index.scss';

// // Openweathermap API. Do not share it publicly.
// const api = '98661ae9c9d5d19ba10e69ef45ab849d'; //Replace with your API

// const iconImg = document.getElementById('weather-icon');
// const loc = document.querySelector('#location');
// const tempC = document.querySelector('.c');
// const tempF = document.querySelector('.f');
// const desc = document.querySelector('.desc');
// const sunriseDOM = document.querySelector('.sunrise');
// const sunsetDOM = document.querySelector('.sunset');

// window.addEventListener('load', () => {
//   let long;
//   let lat;
//   // Accesing Geolocation of User
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       // Storing Longitude and Latitude in variables
//       long = position.coords.longitude;
//       lat = position.coords.latitude;
//       const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

//       // Using fetch to get data
//       fetch(base)
//         .then(response => {
//           return response.json();
//         })
//         .then(data => {
//           console.log('data: ', data);
//           const { temp, feels_like } = data.main;
//           const place = data.name;
//           const { description, icon } = data.weather[0];
//           const { sunrise, sunset } = data.sys;

//           const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//           const fahrenheit = (temp * 9) / 5 + 32;

//           // Converting Epoch(Unix) time to GMT
//           const sunriseGMT = new Date(sunrise * 1000);
//           const sunsetGMT = new Date(sunset * 1000);

//           // Interacting with DOM to show data
//           iconImg.src = iconUrl;
//           loc.textContent = `${place}`;
//           desc.textContent = `${description}`;
//           tempC.textContent = `${temp.toFixed(2)} °C`;
//           tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
//           sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
//           sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
//         });
//     });
//   }
// });
let weather = {
  apikey: '98661ae9c9d5d19ba10e69ef45ab849d',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apikey
    )
      .then(response => {
        return response.json();
      })
      .then(data => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log('data: ', data);
    if (data.cod == '200') {
      getweather(data);
    } else if (data.cod == '400') {
      noinput(data);
    } else {
      citynotfound(data);
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});
document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') weather.search();
  });
weather.fetchWeather('Greater Noida');

function getweather(data) {
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  // console.log(name, icon, description, temp, humidity, speed);
  document.querySelector('.location-city').innerHTML = 'Weather in ' + name;
  document.querySelector('.icon').style.backgroundImage =
    'url(https://openweathermap.org/img/wn/' + icon + '@2x.png)';
  document.querySelector('.temperature-degree').innerHTML = temp + '°C';
  document.querySelector('.weather-description').innerHTML = description;
  document.querySelector('.humidity').innerHTML = 'Humidity: ' + humidity + '%';
  document.querySelector('.wind').innerHTML = 'Wind: ' + speed + 'Km/hr';
  document.querySelector('.weather ').classList.remove('loading');
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + description + "')";
  document.querySelector('.temperature-degree').style.position = 'relative';
  document.querySelector('.temperature-degree').style.visibility = 'visible';
  document.querySelector('.humidity').style.position = 'relative';
  document.querySelector('.humidity').style.visibility = 'visible';
  document.querySelector('.wind').style.position = 'relative';
  document.querySelector('.wind').style.visibility = 'visible';
}

function noinput(data) {
  document.querySelector('.location-city').innerHTML = 'Something went wrong!';
  document.querySelector('.temperature-degree').style.position = 'absolute';
  document.querySelector('.temperature-degree').style.visibility = 'hidden';
  document.querySelector('.humidity').style.position = 'absolute';
  document.querySelector('.humidity').style.visibility = 'hidden';
  document.querySelector('.wind').style.position = 'absolute';
  document.querySelector('.wind').style.visibility = 'hidden';
}

function citynotfound(data) {
  document.querySelector('.location-city').innerHTML = 'City not found';
  document.querySelector('.temperature-degree').style.position = 'absolute';
  document.querySelector('.temperature-degree').style.visibility = 'hidden';
  document.querySelector('.humidity').style.position = 'absolute';
  document.querySelector('.humidity').style.visibility = 'hidden';
  document.querySelector('.wind').style.position = 'absolute';
  document.querySelector('.wind').style.visibility = 'hidden';
}
