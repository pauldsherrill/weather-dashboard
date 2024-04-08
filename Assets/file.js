const searchedEl = document.getElementById('searched-cities');
const searchButton = document.getElementById('search');
const currentWeather = document.getElementById('current-weather');
const searchHistory = document.getElementById('search-history');
const forecast = document.getElementById('forecast');

function getWeather(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06e0ad8aa9e344a8a546262413b9bc86&units=imperial`,
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
        
          let cities = JSON.parse(localStorage.getItem('city'));
          console.log(Array.isArray(cities));

          if (Array.isArray(cities) === true) {
            cities.push(city);
            localStorage.setItem('city', JSON.stringify(cities));
          } else {
            const citiesInitializer = [city];
            localStorage.setItem('city', JSON.stringify(citiesInitializer));
          }

        console.log(city);
        createWeatherBox(city);
        getForecast(city);
      });
}

searchButton.addEventListener("click", function () {
    currentWeather.innerHTML = "";
    let city = document.getElementById('city').value;
    getWeather(city);
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

    createForecastBox(city);
}

function addToSearchHistory() {
    const storedCities = JSON.parse(localStorage.getItem('city'));

    for (const storedCity of storedCities) {
        let searchedCity = document.createElement("a");
        searchedCity.textContent = storedCity.name;
        searchedCity.setAttribute (
            'class',
            'btn btn-secondary mt-2'
        );
        searchedCity.setAttribute (
            'style',
            'width: 345px; height: 40px;'
        );
        searchHistory.appendChild(searchedCity);
    }
}

function getForecast(city) {
    let today = dayjs().format('YYYY-MM-DD');
    let tomorrow = today++;
    let dayTwo = tomorrow++;
    let dayThree = dayTwo++;
    let dayFour = dayThree++;
    let dayFive = dayFour++;

    fetch(
        `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${city.lat}&lon=${city.lon}&date=${today}&appid=4f6699c207bc8fb45b36a8165870586c&units=imperial`,
        {
        method: "GET",
        }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function createForecastBox(city) {
    let dailyForecast = document.createElement("div");
    dailyForecast.setAttribute (
        'class',
        'border'
    );
    dailyForecast.setAttribute (
        'style',
        'width: 20%;'
    );
    forecast.appendChild(dailyForecast);

    let title = document.createElement("h2");
    title.textContent = city.name;
    let iconImage = document.createElement("img");
    iconImage.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${city.icon}.png`
    );
    dailyForecast.appendChild(title);
    title.appendChild(iconImage);

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
