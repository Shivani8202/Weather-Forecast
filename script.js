const apiKey = ' c0b0910738d84532a6c55623232108'; // Replace with your actual API key

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  getWeatherData(city);
});

function getWeatherData(city) {
  // Make API request using fetch() or XMLHttpRequest
  // Example using fetch():
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  const weather = data.current;
  weatherInfo.innerHTML = `
    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
    <p>Temperature: ${weather.temp_c}°C / ${weather.temp_f}°F</p>
    <p>Condition: ${weather.condition.text}</p>
    <img id="weatherIcon" src="${weather.condition.icon}" alt="${weather.condition.text}">
  `;
}
function getWeatherData(city) {
    // Fetch current weather data
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
      });
  
    // Fetch 3-day forecast data
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`)
      .then(response => response.json())
      .then(data => {
        displayForecast(data);
      })
      .catch(error => {
        console.error('Error fetching forecast data:', error);
      });
  }
  
  function displayForecast(data) {
    const forecast = data.forecast.forecastday;
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = `
      <h2>3-Day Forecast</h2>
      <div class="forecast-container">
        ${forecast.map(day => `
          <div class="forecast-item">
            <p>Date: ${day.date}</p>
            <p>Max Temp: ${day.day.maxtemp_c}°C / ${day.day.maxtemp_f}°F</p>
            <p>Min Temp: ${day.day.mintemp_c}°C / ${day.day.mintemp_f}°F</p>
            <p>Condition: ${day.day.condition.text}</p>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
          </div>
        `).join('')}
      </div>
    `;
  }
  


const geoLocationButton = document.getElementById('geoLocationButton');
geoLocationButton.addEventListener('click', getGeolocationWeather);

function getGeolocationWeather() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherByCoordinates(latitude, longitude);
    }, error => {
      console.error('Error getting geolocation:', error);
    });
  } else {
    console.error('Geolocation is not available in this browser.');
  }
}

function fetchWeatherByCoordinates(latitude, longitude) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}


function getWeatherData(city) {
  // Clear previous error messages
  clearErrorMessages();

  // Fetch current weather data
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      displayError(error.message);
    });

  // Fetch 3-day forecast data
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

function displayError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = message;

  const container = document.querySelector('.container');
  container.appendChild(errorDiv);
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(errorMessage => errorMessage.remove());
}






