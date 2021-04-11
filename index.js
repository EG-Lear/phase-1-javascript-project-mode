document.addEventListener('DOMContentLoaded', () => {
    fetchCities(initialRender)
    document.getElementById('backBtn').disabled = true
    document.getElementById('backBtn').addEventListener('click', goBack)
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

function fetchSingle() { //fetches information about a single city
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
        document.getElementById('cityNames').appendChild(adding)
        document.getElementById(`${city.id}`).addEventListener('click', fetchSingle)
    })
}

function moreInfo(res) { //displays more information about the selected city
    const loc = res.data
    document.getElementById('cityNames').innerHTML = ''
    let adding = document.createElement('p')
    let cLevel = seaLevel(loc.elevationMeters)
    adding.textContent = `The city of ${loc.city} is in the state of ${res.data.region}.  It sits ${cLevel} sea level at ${loc.longitude} longitude and ${loc.latitude} latitude.  It has a population of ${loc.population} people.`
    document.getElementById('cityInfo').appendChild(adding)
    document.getElementById('backBtn').disabled = false
}

function seaLevel(level) { //determines where the city is relative to sea level and chooses what text to display
    if (level > 0) {
        return `${level} meters above`
    } else if (level < 0) {
        return `${level} meters below`
    } else {
        return `directly at`
    }
}

function goBack() { //adds functionality to the back button
    document.getElementById('cityInfo').innerHTML = ''
    fetchCities(initialRender)
    document.getElementById('backBtn').disabled = true
}
