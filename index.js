document.addEventListener('DOMContentLoaded', () => {
    fetchDrinks(initialRender)
})

function fetchDrinks(action) { //fetchs from api and then executes the desired function on the returned data
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=US&minPopulation=1490000&types=CITY", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "4010cdd83cmsh8cb2b7ba6ad0987p1d44aejsn8d7efd02cd68",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(res => action(res.data))
    .catch(err => {
	    console.error(err)
    })
}

function initialRender(cities) {
    //console.log(cities)
    cities.forEach(city => {
        let adding = document.createElement('li')
        adding.textContent = city.name
        adding.id = city.name
        document.getElementById('city names').appendChild(adding)
    })
}