let apikey = "1e3e8f230b6064d27976e41163a82b77";

navigator.geolocation.getCurrentPosition(async function (postion) {
  try {
    var lat = postion.coords.latitude;
    var lon = postion.coords.longitude;

    var map = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apikey}`
    );
    var userData = await map.json();
    console.log(userData, "here is user data");

    let loc = userData[0].name;

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${apikey}&units=metrics`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data, "data");
    // Get references to DOM elements where data will be shown
    let cityMain = document.getElementById("city-name"); //Lahore
    let cityTemp = document.getElementById("metric"); // 0
    let weatherMain = document.querySelectorAll("#weather-main");
    let mainHumidity = document.getElementById("humidity");
    let mainFeel = document.getElementById("feels-like");
    let weatherImg = document.querySelector(".weather-icon");
    let weatherImgs = document.querySelector(".weather-icons");
    let tempMinWeather = document.getElementById("temp-min-today");
    let tempMaxWeather = document.getElementById("temp-max-today");

    cityMain.innerHTML = data.city.name;
    cityTemp.innerHTML = Math.floor(data.list[0].main.temp) + "°";
    weatherMain[0].innerHTML = data.list[0].weather[0].description;
    weatherMain[1].innerHTML = data.list[0].weather[0].description;
    mainHumidity.innerHTML = data.list[0].main.humidity;
    mainFeel.innerHTML = Math.floor(data.list[0].main.feels_like);
    tempMinWeather.innerHTML = Math.floor(data.list[0].main.temp_min);
    tempMaxWeather.innerHTML = Math.floor(data.list[0].main.temp_max);
  } catch (error) {
    console.log("here is your error :", error);
  }
});

// API's We need to call
// 5 Day / 3 Hour Forecast
// https://pro.openweathermap.org/data/2.5/forecast/climate?lat={lat}&lon={lon}&appid={API key}
// Current weather data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// Hourly forecast
// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
// geocoding api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// to get city name
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
