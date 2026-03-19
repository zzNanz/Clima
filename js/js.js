const btn_search = document.querySelector("#btn-search");
const input_city = document.querySelector("#input-city");
const city_name = document.querySelector("#city-name");
const main_temp = document.querySelector("#main-temp");
const weather_icon = document.querySelector("#weather-icon");

const card_temp = document.querySelector("#val-temperature");
const card_humidity = document.querySelector("#val-humidity");
const card_pressure = document.querySelector("#val-pressure");
const card_wind_speed = document.querySelector("#val-wind-speed");

//Eventos
btn_search.addEventListener("click", async (event) => {
  event.preventDefault();

  const city = input_city.value;

  if (city == "") {
    alert("Por favor, digite o nome de uma cidade.");
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    city_name.textContent = weatherData.results.city;
    card_temp.textContent = `${weatherData.results.temp}°C`;
    main_temp.textContent = `${weatherData.results.temp}°C`;
    card_humidity.textContent = `${weatherData.results.humidity}%`;
    card_pressure.textContent = `${weatherData.results.pressure} hPa`;
    card_wind_speed.textContent = `${weatherData.results.wind_speedy} km/h`;

    console.log(weatherData.results.description);
    switch (weatherData.results.description) {
      case "Tempo nublado":
        weather_icon.setAttribute("src", "./img/cloud.svg");
        break;
      // Adicione outros casos conforme necessário
    }
  } catch (error) {
    console.error("Erro ao buscar os dados do clima:", error);
    alert(
      "Ocorreu um erro ao buscar os dados do clima. Por favor, tente novamente mais tarde.",
    );
    return;
  }
});

//Funcoes
async function fetchWeather(city) {
  const api_key = "506abeff";
  const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${api_key}&city_name=${city}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
