//vars
var searchBarEl = document.querySelector('form')
var searchBarInput = document.getElementById('searchBar')
var cityEl = document.getElementById('city')

var APIKey = 'a57f5014b4df67ec35cd48fcf3753889'
var cityName
var state
var cityLat
var cityLon
var today = moment()


//functions
function handleSearchBar(event) {
    event.preventDefault()
    console.log(searchBarInput.value)
    cityName = searchBarInput.value
    getGeoLoc()

}

function getGeoLoc() {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityName +'&limit=5&appid='+ APIKey

    console.log(requestUrl)

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function(data) {
            geoLocData = data
            console.log(geoLocData)
            cityLat = geoLocData[0].lat
            cityLon = geoLocData[0].lon
            cityName = geoLocData[0].name
            state = geoLocData[0].state

            console.log(cityLat, cityLon, state)

            cityEl.textContent = `${cityName}, ${state}`
            getWeather()
            getCurrentWeather()
        })
}

// get weather data
function getWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLat+"&lon="+cityLon+"&appid="+APIKey+"&units=imperial"

//    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function(data) {
            weatherData = data
            console.log(weatherData)
            // document.querySelector('#d1').textContent = weatherData.list[2].dt_txt
            // document.querySelector('#f1').textContent = weatherData.list[2].main.temp
            for (i=0; i<5; i++) {
                document.querySelector('#d'+(i+1)).textContent = moment(weatherData.list[(i*8)+3].dt_txt).format('MMMM Do')
                document.querySelector('#t'+(i+1)).textContent = `${weatherData.list[(i*8)+3].main.temp}\u00B0F`
                document.querySelector('#f'+(i+1)).textContent = weatherData.list[(i*8)+3].weather[0].main
                
            }
        })
}

// write current weather to page

function getCurrentWeather() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}&units=imperial`

//    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function(data) {
            currentWeatherData = data
            console.log(currentWeatherData)
            document.querySelector('#currentTemp').textContent = `Currently ${currentWeatherData.main.temp}\u00B0F / Feels like ${currentWeatherData.main.feels_like}\u00B0F`
            document.querySelector('#currentWind').textContent = `Current Wind Speed: ${currentWeatherData.wind.speed} mph`
            document.querySelector('#currentHumidity').textContent = `Humidity ${currentWeatherData.main.humidity}%`
        })
}



// document.querySelector('#currentTemp').textContent = weatherData.list[0]
// document.querySelector('#currentWind').textContent 
// document.querySelector('#currentHumidity').textContent 


// event listeners
searchBarEl.addEventListener('submit', handleSearchBar)