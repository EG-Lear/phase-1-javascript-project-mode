document.addEventListener('DOMContentLoaded', () => {
    fetchDrinks()
})

function fetchDrinks(action) {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&minPopulation=100000", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4010cdd83cmsh8cb2b7ba6ad0987p1d44aejsn8d7efd02cd68",
		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
	}
    })
    .then(res => res.json())
    .then(data => action(data))
    .catch(err => {
	    console.error(err)
    })
}

