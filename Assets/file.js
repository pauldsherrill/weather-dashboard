const searchedEl = document.getElementById('searched-cities');
const searchButton = document.getElementById('search');
const currentWeather = document.getElementById('current-weather');
const searchHistory = document.getElementById('search-history');
const forecast = document.getElementById('forecast');

// The main function that runs to retrieve weather information
function getWeather(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f6699c207bc8fb45b36a8165870586c&units=imperial`,
      {
        method: "GET",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let city = {
            name: `${data.name}`,
            temp: `Temp: ${data.main.temp}`,
            wind: `Wind: ${data.wind.speed}`,
            humidity: `Humidity: ${data.main.humidity}`,
            icon: data.weather[0].icon,
            lat: data.coord.lat,
            lon: data.coord.lon,
            dt: data.dt,
          }
        
        // Stores cities to local storage so they can be saved in the search history
        let cities = JSON.parse(localStorage.getItem('city')) || [];
        cities.push(data.name);
        localStorage.setItem('city', JSON.stringify(cities));

        pageLoad();
        createWeatherBox(city);
        getForecast(city);
      });
}

searchButton.addEventListener("click", function () {
    handleSearchButton();
  });

// Adds all the needed text and styling to the current weather box 
function createWeatherBox(city) {
    currentWeather.style.border = "solid black"

    let title = document.createElement("h2");
    title.textContent = city.name + " (" + dayjs.unix(city.dt).format('M/D/YYYY') + ") ";
    let iconImage = document.createElement("img");
    iconImage.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${city.icon}.png`
    );
    currentWeather.appendChild(title);
    title.appendChild(iconImage);

    let temperature = document.createElement("p");
    temperature.textContent = city.temp + " °F";
    currentWeather.appendChild(temperature);

    let wind = document.createElement("p");
    wind.textContent = city.wind + " mph";
    currentWeather.appendChild(wind);

    let humidity = document.createElement("p");
    humidity.textContent = city.humidity + "%";
    currentWeather.appendChild(humidity);
}

// Retrieves data for the 5 day forecast information 
function getForecast(city) {
    // Fetches the 5 day forecast API using the coordinates for the city found in the previous API
    fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=4f6699c207bc8fb45b36a8165870586c&units=imperial`,
        {
        method: "GET",
        }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // Loops through five days of forecast. Starting on the day after the current date
        for (i = 1; i < 6; i++) {
            let city = {
                temp: `Temp: ${data.daily[i].temp.day}`,
                wind: `Wind: ${data.daily[i].wind_speed}`,
                humidity: `Humidity: ${data.daily[i].humidity}`,
                icon: data.daily[i].weather[0].icon,
                dt: data.daily[i].dt,
              }

            createForecastBox(city);
        }
      });
}

// Renders the daily forecast into containers, adding the proper text and styling
function createForecastBox(city) {
    let dailyForecast = document.createElement("div");
    dailyForecast.setAttribute (
        'style',
        'width: 18%; height: 250px; background-color: #635E88; padding-top: 10px; color: white; margin: 0 1% 0 1%'
    );
    forecast.appendChild(dailyForecast);

    let title = document.createElement("h3");
    title.textContent = dayjs.unix(city.dt).format('M/D/YYYY');
    dailyForecast.appendChild(title);

    let iconImage = document.createElement("img");
    iconImage.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${city.icon}.png`
    );
    dailyForecast.appendChild(iconImage);

    let temperature = document.createElement("p");
    temperature.textContent = city.temp + " °F";
    dailyForecast.appendChild(temperature);

    let wind = document.createElement("p");
    wind.textContent = city.wind + " mph";
    dailyForecast.appendChild(wind);

    let humidity = document.createElement("p");
    humidity.textContent = city.humidity + "%";
    dailyForecast.appendChild(humidity);
}

// Does the same thing as getWeather except re-add the city to the search history or re-save the city into local storage
function handleCityButton(storedCity) {
    currentWeather.innerHTML = "";
    let city = storedCity;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f6699c207bc8fb45b36a8165870586c&units=imperial`,
      {
        method: "GET",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let city = {
            name: `${data.name}`,
            temp: `Temp: ${data.main.temp}`,
            wind: `Wind: ${data.wind.speed}`,
            humidity: `Humidity: ${data.main.humidity}`,
            icon: data.weather[0].icon,
            lat: data.coord.lat,
            lon: data.coord.lon,
            dt: data.dt,
          }
        
        createWeatherBox(city);
        getForecast(city);
      });
    forecast.innerHTML = `<h2 class="pt-4">5-Day Forecast:</div>`;
}

// Adds all the needed information when the search button is clicked, including resetting the html so that the previous info is replaced with new info
function handleSearchButton() {
    currentWeather.innerHTML = "";
    let city = document.getElementById('city').value;
    getWeather(city);
    forecast.innerHTML = `<h2 class="pt-4">5-Day Forecast:</div>`;
}

// Adds buttons to the search history for each object saved in the local storage
function pageLoad() {
    const storedCities = JSON.parse(localStorage.getItem('city')) || [];
    searchHistory.innerHTML = "";

    for (const storedCity of storedCities) {
        let searchedCity = document.createElement("button");
        searchedCity.textContent = storedCity;
        searchedCity.setAttribute (
            'class',
            'btn btn-secondary mt-2'
        );
        searchedCity.setAttribute (
            'id',
            'searched-city'
        );
        searchedCity.setAttribute (
            'style',
            'width: 345px; height: 40px;'
        );
        searchHistory.appendChild(searchedCity);

        searchedCity.addEventListener('click', function() {
            handleCityButton(storedCity);
        });
    }
}

// Keeps the search history on the page when refreshed
pageLoad();

