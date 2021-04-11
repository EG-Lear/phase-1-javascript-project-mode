document.addEventListener('DOMContentLoaded', () => {
    fetchCities(initialRender)
})

const baseUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities"

function fetchCities(action) { //fetchs from api and then executes the desired function on the returned data
    fetch(baseUrl + "?limit=10&countryIds=US&minPopulation=1490000&types=CITY", {
        "method": "GET",  
        "headers": { 
            "x-rapidapi-key": "4010cdd83cmsh8cb2b7ba6ad0987p1d44aejsn8d7efd02cd68",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(res => action(res.data))
    .catch(err => console.error(err))
}

function fetchSingle() {
    fetch(baseUrl + `/${this.id}`, {
        "method": "GET",  
        "headers": { 
            "x-rapidapi-key": "4010cdd83cmsh8cb2b7ba6ad0987p1d44aejsn8d7efd02cd68",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(res => moreInfo(res))
    .catch(err => console.error(err))
}

function initialRender(cities) { //does the initial render of cities to page
    console.log(cities)
    cities.forEach(city => {
        let adding = document.createElement('li')
        adding.textContent = city.name
        adding.id = city.id
        document.getElementById('city names').appendChild(adding)
        document.getElementById(`${city.id}`).addEventListener('click', fetchSingle)
    })
}

function moreInfo(res) {
    const loc = res.data
    document.getElementById('city names').innerHTML = ''
    let adding = document.createElement('p')
    adding.textContent = `The city of ${loc.city} is in the state of ${res.data.region}.  It sits ${loc.elevationMeters} above sea level at ${loc.longitude} longitude and ${loc.latitude}.  It has a population of ${loc.population}.`
    document.getElementById('cityInfo').appendChild(adding)
}

// city: "Brooklyn"
// country: "United States of America"
// countryCode: "US"
// deleted: false
// distance: null
// elevationMeters: 15
// id: 122111
// latitude: 40.692777777
// longitude: -73.990277777
// name: "Brooklyn"
// population: 2636735
// region: "New York"
// regionCode: "NY"
// timezone: "America__New_York"
// type: "CITY"
// wikiDataId: "Q18419"

//`The city of ${loc.city} is in the state of ${res.data.region}.  It is sits ${loc.elevationMeters} above sea level at ${loc.longitude} longitude and ${loc.latitude}.  It has a population of ${loc.population}.