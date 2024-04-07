const searchedEl = document.getElementById('searched-cities');
let city = document.getElementById('city').value;

function getWeather(city) {
    let enteredCity = city;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${city}`,
      {
        method: "GET",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        console.log(`City: ${enteredCity}`);
        console.log(`Temp: ${data.main.temp}`);
        console.log(`Wind: ${data.wind.speed}`);
        console.log(`Temp: ${data.main.humidity}`);
      });
}

getWeather();