const searchedEl = document.getElementById('searched-cities');
const searchButton = document.getElementById('search');
const currentWeather = document.getElementById('current-weather');

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
            humidity: `Humidity: ${data.main.humidity}`
          }
        
        console.log(city);
        createWeatherBox(city);
      });
}

searchButton.addEventListener("click", function () {
    let city = document.getElementById('city').value;
    getWeather(city);
  });

function createWeatherBox(city) {
    currentWeather.style.border = "solid black"

    let title = document.createElement("h2");
    title.textContent = city.name;
    currentWeather.appendChild(title);

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

