const searchedEl = document.getElementById('searched-cities');
const searchButton = document.getElementById('search');
const currentWeather = document.getElementById('current-weather');
const searchHistory = document.getElementById('search-history');
const forecast = document.getElementById('forecast');

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
        
          let cities = JSON.parse(localStorage.getItem('city'));

          if (Array.isArray(cities) === true) {
            cities.push(city.name);
            localStorage.setItem('city', JSON.stringify(cities));
          } else {
            const citiesInitializer = [city.name];
            localStorage.setItem('city', JSON.stringify(citiesInitializer));
          }
        
        pageLoad();
        createWeatherBox(city);
        getForecast(city);
      });
}

searchButton.addEventListener("click", function () {
    handleSearchButton();
  });

function createWeatherBox(city) {
    currentWeather.style.border = "solid black"

    let title = document.createElement("h2");
    title.textContent = city.name;
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

function addToSearchHistory(city) {
    const storedCities = JSON.parse(localStorage.getItem('city')) || {};
    storedCities.innerHTML = "";

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

function getForecast(city) {
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
        for (i = 0; i < 5; i++) {
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

function createForecastBox(city) {
    let dailyForecast = document.createElement("div");
    dailyForecast.setAttribute (
        'class',
        'border my-0'
    );
    dailyForecast.setAttribute (
        'style',
        'width: 20%; height: 330px; background-color: blue; padding-top: 10px;'
    );
    forecast.appendChild(dailyForecast);

    let title = document.createElement("h3");
    title.textContent = city.dt;
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

function handleCityButton(storedCity) {
    currentWeather.innerHTML = "";
    let city = storedCity.name;
    getWeather(city);
    forecast.innerHTML = `<h2 class="pt-4">5 Day Forecast</div>`;
}

function handleSearchButton() {
    currentWeather.innerHTML = "";
    let city = document.getElementById('city').value;
    getWeather(city);
    forecast.innerHTML = `<h2 class="pt-4">5 Day Forecast</div>`;
}

function pageLoad() {
    addToSearchHistory(city);
}

pageLoad();

