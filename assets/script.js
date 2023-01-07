//vars
var searchBarEl = document.querySelector('form')
var searchBarInput = document.getElementById('searchBar')
var cityEl = document.getElementById('city')
var recentSearchEl = document.getElementById('recentSearch')
var fiveDayEl = document.getElementById('fiveDay')

var APIKey = 'a57f5014b4df67ec35cd48fcf3753889'
var cityName
var state
var cityLat
var cityLon
var today = moment()

//functions

function handleSearchBar(event) {
    event.preventDefault()
    cityName = searchBarInput.value
    getGeoLoc()
}

function getGeoLoc() {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ cityName +'&limit=5&appid='+ APIKey
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function(data) {
            geoLocData = data
            cityLat = geoLocData[0].lat
            cityLon = geoLocData[0].lon
            cityName = geoLocData[0].name
            state = geoLocData[0].state
            cityEl.textContent = `${cityName}, ${state}`
            recentSearch()
            getWeather()
            getCurrentWeather()
        })
}

// get weather data
function getWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLat+"&lon="+cityLon+"&appid="+APIKey+"&units=imperial"
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function(data) {
            weatherData = data
            for (i=0; i<5; i++) {
                document.querySelector('#d'+(i+1)).textContent = moment(weatherData.list[(i*8)+3].dt_txt).format('ddd MMMM Do')
                document.querySelector('#t'+(i+1)).textContent = `${weatherData.list[(i*8)+3].main.temp}\u00B0F`
                document.querySelector('#f'+(i+1)).textContent = weatherData.list[(i*8)+3].weather[0].main
                document.querySelector('#icon'+(i+1)).src = `https://openweathermap.org/img/wn/${weatherData.list[(i*8)+3].weather[0].icon}@2x.png`
                document.querySelector('#w'+(i+1)).textContent = `Wind Speed: ${weatherData.list[(i*8)+3].wind.speed} mph`
                document.querySelector('#hm'+(i+1)).textContent = `Humidity: ${weatherData.list[(i*8)+3].main.humidity}%`   
            }
        })
        fiveDayEl.style.display = 'block'
}

// write current weather to page

function getCurrentWeather() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}&units=imperial`
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function(data) {
            currentWeatherData = data
            document.querySelector('#currentDate').textContent = moment().format('ddd MMMM Do')
            document.getElementById('currentIcon').src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`
            document.querySelector('#currentCond').textContent = currentWeatherData.weather[0].main
            document.querySelector('#currentTemp').textContent = `Currently ${currentWeatherData.main.temp}\u00B0F / Feels like ${currentWeatherData.main.feels_like}\u00B0F`
            document.querySelector('#currentWind').textContent = `Current Wind Speed: ${currentWeatherData.wind.speed} mph`
            document.querySelector('#currentHumidity').textContent = `Humidity ${currentWeatherData.main.humidity}%`
        })
}

// adds last search to recent searches
function recentSearch() {
    const recent = document.createElement('li')
    recent.classList.add('list-group-item','list-group-item-action')
    recent.innerHTML = `${cityName}, ${state}`
    recent.id = `${cityName}`
    recentSearchEl.prepend(recent)
}

// event listeners
searchBarEl.addEventListener('submit', handleSearchBar)

document.getElementById("recentSearch").addEventListener("click",function(e) {
    if (e.target && e.target.matches("li")) {
      cityName = e.target.id
      e.target.remove()
      getGeoLoc()
      }
  });
