const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const visibilityQualityText = [
  "Dense Fog",
  "Thick Fog",
  "Moderate Fog",
  "Light Fog",
  "Thin Fog",
  "Haze",
  "Light Haze",
  "Clear",
  "Very Clear",
  "Exceptionally Clear",
  "Pure Air",
];
const degreeSymbol = document.querySelector(".degree");
const mainIcon = document.querySelector(".hero-icon");
const mainTemp = document.querySelector(".main-temp");
const mainDay = document.querySelector(".main-day");
const currentTime = document.querySelector(".current-time");
const weatherConditionImg = document.querySelector(".weather-type-container img");
const weatherCondition = document.querySelector(".weather-type-container p");
const rainChance = document.querySelector(".rain-chance-container p");
const placeImg = document.querySelector('.place-img')
const placeName = document.querySelector(".place-img p");
const uvIndex = document.querySelector(".uv-index-count");
const uvProgressBar = document.querySelector(".uv-progress-level");
const windSpeed = document.querySelector(".wind-status");
const windSpeedUnit = document.querySelector(".wind-speed-unit");
const windDirection = document.querySelector(".wind-direction span");
const humidity = document.querySelector(".humidity-count");
const humidityProgressBar = document.querySelector(".humidity-progress-level");
const visibility = document.querySelector(".visibility-count");
const visibilityDistance = document.querySelector(".visibility-distance");
const visibilityQuality = document.querySelector(".visibility-quality span");
const sunrise = document.querySelector(".sunrise-time");
const sunset = document.querySelector(".sunset-time");
const moonrise = document.querySelector(".moonrise-time");
const moonset = document.querySelector(".moonset-time");
const weekContainer = document.querySelector(".week-container");
const getLocation = document.querySelector(".fa-location-dot");
const radioButton = document.getElementsByName("value-radio");

const todayImg = document.querySelector('.today img')
const todayHighest = document.querySelector('.today .highest-tmp')
const todayLowest = document.querySelector('.today .lowest-tmp')
const todayQuality = document.querySelector('.today-quality')
const todayRainChance = document.querySelector('.today-rain-chance')

const tomorrowDay = document.querySelector('.tomorrow-day')
const tomorrowImg = document.querySelector('.tomorrow img')
const tomorrowHighest = document.querySelector('.tomorrow .highest-tmp')
const tomorrowLowest = document.querySelector('.tomorrow .lowest-tmp')
const tomorrowQuality = document.querySelector('.tomorrow-quality')
const tomorrowRainChance = document.querySelector('.tomorrow-rain-chance')

const dayAfterTomorrowDay = document.querySelector('.after-tomorrow-day')
const dayAfterTomorrowImg = document.querySelector('.day-after-tomorrow img')
const dayAfterTomorrowHighest = document.querySelector('.day-after-tomorrow .highest-tmp')
const dayAfterTomorrowLowest = document.querySelector('.day-after-tomorrow .lowest-tmp')
const dayAfterTomorrowQuality = document.querySelector('.day-after-tomorrow-quality')
const dayAfterTomorrowRainChance = document.querySelector('.day-after-tomorrow-rain-chance')

getLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(useGeo);
  function useGeo(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    localStorage.setItem("recentPlace", `${lat},${lon}`);
    renderWeather(`${lat},${lon}`);
  }
});

async function renderWeather(cords) {
  const url = `http://api.weatherapi.com/v1/forecast.json?days=3&q=${localStorage.getItem("recentPlace") || "New York" || cords}`;
  const options = {
    method: "GET",
    headers: {
      key: "9ecfac69a7904efdb29200329232208",
    },
  };
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      document.title = data.location.name + " | Weather Forecast";
      mainIcon.src = data.current.condition.icon;
      mainTemp.innerText = data.current.temp_c;
      const d = new Date();
      let day = weekday[d.getDay()];
      mainDay.innerText = day + ", ";
      let hour = d.getHours();
      let min = d.getMinutes();
      currentTime.innerText = hour + ":" + min;
      weatherConditionImg.src = data.current.condition.icon;
      weatherCondition.innerText = data.current.condition.text;
      rainChance.innerText = "Rain chances: " + data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
      placeName.innerText = data.location.name + ", " + data.location.region + ", " + data.location.country;

      todayImg.src = data.forecast.forecastday[0].day.condition.icon
      todayHighest.innerText = data.forecast.forecastday[0].day.maxtemp_c
      todayLowest.innerText = data.forecast.forecastday[0].day.mintemp_c
      todayQuality.innerText = data.forecast.forecastday[0].day.condition.text
      todayRainChance.innerText = data.forecast.forecastday[0].day.daily_chance_of_rain + "%"

      const tomorrow = new Date(d)
      tomorrow.setDate(d.getDate() + 1)
      tomorrowDay.innerText = weekday[tomorrow.getDay()].toUpperCase()
      tomorrowImg.src = data.forecast.forecastday[1].day.condition.icon
      tomorrowHighest.innerText = data.forecast.forecastday[1].day.maxtemp_c
      tomorrowLowest.innerText = data.forecast.forecastday[1].day.mintemp_c
      tomorrowQuality.innerText = data.forecast.forecastday[1].day.condition.text
      tomorrowRainChance.innerText = data.forecast.forecastday[1].day.daily_chance_of_rain + "%"

      const afterTomorrow = new Date(d)
      afterTomorrow.setDate(d.getDate() + 2)
      dayAfterTomorrowDay.innerText = weekday[afterTomorrow.getDay()].toUpperCase()
      dayAfterTomorrowImg.src = data.forecast.forecastday[2].day.condition.icon
      dayAfterTomorrowHighest.innerText = data.forecast.forecastday[2].day.maxtemp_c
      dayAfterTomorrowLowest.innerText = data.forecast.forecastday[2].day.mintemp_c
      dayAfterTomorrowQuality.innerText = data.forecast.forecastday[2].day.condition.text
      dayAfterTomorrowRainChance.innerText = data.forecast.forecastday[2].day.daily_chance_of_rain + "%"

      uvIndex.innerText = data.current.uv;
      uvProgressBar.style.width = `${data.current.uv * 10}%`;
      windSpeed.innerText = data.current.wind_kph;
      windDirection.innerText = data.current.wind_dir;
      humidity.innerText = data.current.humidity;
      humidityProgressBar.style.width = `${data.current.humidity}%`;
      visibility.innerText = data.current.vis_km;
      if (data.current.vis_km < 1) {
        visibilityQuality.innerText = visibilityQualityText[3];
      } else if (data.current.vis_km >= 1 && data.current.vis_km < 2) {
        visibilityQuality.innerText = visibilityQualityText[4];
      } else if (data.current.vis_km >= 2 && data.current.vis_km < 4) {
        visibilityQuality.innerText = visibilityQualityText[5];
      } else if (data.current.vis_km >= 4 && data.current.vis_km < 10) {
        visibilityQuality.innerText = visibilityQualityText[6];
      } else if (data.current.vis_km >= 10 && data.current.vis_km < 20) {
        visibilityQuality.innerText = visibilityQualityText[7];
      } else if (data.current.vis_km >= 20 && data.current.vis_km < 50) {
        visibilityQuality.innerText = visibilityQualityText[8];
      } else if (data.current.vis_km >= 50 && data.current.vis_km < 277) {
        visibilityQuality.innerText = visibilityQualityText[9];
      } else {
        visibilityQuality.innerText = visibilityQualityText[10];
      }
      sunrise.innerText = data.forecast.forecastday[0].astro.sunrise.toLowerCase();
      sunset.innerText = data.forecast.forecastday[0].astro.sunset.toLowerCase();
      moonrise.innerText = data.forecast.forecastday[0].astro.moonrise.toLowerCase();
      moonset.innerText = data.forecast.forecastday[0].astro.moonset.toLowerCase();
      radioButton.forEach((item) => {
        item.addEventListener("change", () => {
          if (item.value === "value-f") {
            degreeSymbol.innerHTML = "&deg;F";
            mainTemp.innerText = data.current.temp_f;
            windSpeed.innerText = data.current.wind_mph;
            windSpeedUnit.innerText = "miles/h";
            visibility.innerText = data.current.vis_miles;
            visibilityDistance.innerText = "miles";
            todayHighest.innerText = data.forecast.forecastday[0].day.maxtemp_f
            todayLowest.innerText = data.forecast.forecastday[0].day.mintemp_f
            tomorrowHighest.innerText = data.forecast.forecastday[1].day.maxtemp_f
            tomorrowLowest.innerText = data.forecast.forecastday[1].day.mintemp_f
            dayAfterTomorrowHighest.innerText = data.forecast.forecastday[2].day.maxtemp_f
            dayAfterTomorrowLowest.innerText = data.forecast.forecastday[2].day.mintemp_f
          } else {
            degreeSymbol.innerHTML = "&deg;C";
            mainTemp.innerText = data.current.temp_c;
            windSpeed.innerText = data.current.wind_kph;
            windSpeedUnit.innerText = "km/h";
            visibility.innerText = data.current.vis_km;
            visibilityDistance.innerText = "km";
            todayHighest.innerText = data.forecast.forecastday[0].day.maxtemp_c
            todayLowest.innerText = data.forecast.forecastday[0].day.mintemp_c
            tomorrowHighest.innerText = data.forecast.forecastday[1].day.maxtemp_c
            tomorrowLowest.innerText = data.forecast.forecastday[1].day.mintemp_c
            dayAfterTomorrowHighest.innerText = data.forecast.forecastday[2].day.maxtemp_c
            dayAfterTomorrowLowest.innerText = data.forecast.forecastday[2].day.mintemp_c
          }
        })
        
        async function getNewImage() {
          const requestUrl = `https://api.unsplash.com/search/photos?query=${data.location.name}&client_id=nfG8l7HYDsRLSoRvqRXfktCAprNjAyw_5CwcYn3dJTc`
          let randomNumber = Math.floor(Math.random() * 10)
          try {
            const response = await fetch(requestUrl)
            const result = await response.json()
            placeImg.style.backgroundImage = `url(${result.results[randomNumber].urls.regular})`
          } catch (error) {
            placeImg.style.backgroundImage = `url(https://images.mid-day.com/images/images/2023/may/RainsRepreISTOCK_d.jpg)`
          }
        }
        getNewImage()
      });
    });
}

const searchIcon = document.querySelector(".fa-magnifying-glass")
const searchInput = document.querySelector(".search");
let timer, timeoutVal = 1000;
searchInput.addEventListener('keypress', handleKeyPress);
searchInput.addEventListener('keyup', handleKeyUp);
searchInput.addEventListener('focus', () => {
  searchIcon.style.transform = "rotate(90deg)"
})
searchInput.addEventListener('blur', () => {
  searchIcon.style.transform = "rotate(0)"
})
function handleKeyPress(e) {
  window.clearTimeout(timer);
}
function handleKeyUp(e) {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    const searchedPlace = e.target.value;
    localStorage.setItem("recentPlace", searchedPlace);
    renderWeather();
  }, timeoutVal);
}

const moreDetails = document.querySelectorAll('.more-details')
const firstContainer = document.querySelectorAll('.weekday-container-first')
const secondContainer = document.querySelectorAll('.weekday-container-second')

moreDetails.forEach((item, i)=>{
  item.addEventListener('click', ()=>{
    firstContainer[i].classList.add('active')
    secondContainer[i].classList.add('active')
    item.classList.add('active')
    setTimeout(() => {
    firstContainer[i].classList.remove('active')
    secondContainer[i].classList.remove('active')
    item.classList.remove('active')
    }, 4000);
})
})

renderWeather();
