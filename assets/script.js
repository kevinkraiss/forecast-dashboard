//vars
var searchBarEl = document.querySelector('form')
var searchBarInput = document.getElementById('searchBar')

var APIKey = 'a57f5014b4df67ec35cd48fcf3753889'
var cityName ='Oshkosh'
var stateCode = ''


//functions
function handleSearchBar(event) {
    event.preventDefault()
//    console.log(searchBarInput.value)
    var cityName = searchBarInput.value
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

            console.log(cityLat, cityLon)
        })
}
// event listeners
searchBarEl.addEventListener('submit', handleSearchBar)