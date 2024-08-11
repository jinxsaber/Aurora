const cont = document.querySelector('h1');
const mon = document.querySelector('h2');
const weather = document.querySelector('.weather');
const drop_cities = document.querySelector('select');

let cityId = -1;

const dat = async (lon,lat) => {
    const res = await fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`);
    const temp = await res.json();
    return temp;
}


const dropdown = async () =>{
    const response = await fetch('/data/data.json');
    const ttt = await response.json();
    
    ttt.forEach(city => {
        const obj = document.createElement('option');
        obj.value = city.id;
        obj.textContent = city.place;
        drop_cities.appendChild(obj);
    })
}

drop_cities.addEventListener('change', (event) => {
    cityId = event.target.value;
    if (cityId) {
        console.log(`Selected City ID: ${cityId}`);
        fetchCityCoordinates(cityId);
    }
});

dropdown();

const fetchCityCoordinates = async (id) => {
    const response = await fetch('/data/data.json');
    const ttt = await response.json();
    const city = ttt.find(city => city.id === parseInt(id));
    if (city) {
        const { lat, lon } = city; 
        console.log(`City Coordinates - Latitude: ${lat}, Longitude: ${lon}`);
        const data = await dat(lon,lat);
        const newData = `
            <h3><b>Temperature : </b> ${data.dataseries[id].temp2m}°C</h3>
            <h3><b>Humidity : </b> ${data.dataseries[id].rh2m}</h3>
            <h3><b>Wind : </b> ${data.dataseries[id].wind10m.speed} m/s ${data.dataseries[id].wind10m.direction}</h3>
            <h3><b>Weather Type : </b> ${data.dataseries[id].weather}</h3>
            
        `
        weather.innerHTML = newData;
    } else {
        console.log('City not found');
    }
};



const month = new Date().getMonth() + 1;
const date = new Date().getDate();

const time = new Date().getHours();
const minute = new Date().getMinutes();

// const ll = new Date().toJSON();
// console.log(typeof(ll));

mon.innerHTML = date + '  ' + 'August' + `<br><br>` + time + ':' + minute + ' AM';






// const update = async (id) => {
//     const response = await fetch('/data/data.json');
//     const ttt = await response.json();
//     const lon = ttt[id].lon;
//     const lat = ttt[id].lat;
//     const data = await dat(lon,lat);
//     const newData = `
//         <h3><b>Temperature : </b> ${data.dataseries[0].temp2m}°C</h3>
//         <h3><b>Humidity : </b> ${data.dataseries[0].rh2m}</h3>
//         <h3><b>Wind : </b> ${data.dataseries[0].wind10m.speed} m/s ${data.dataseries[0].wind10m.direction}</h3>
//         <h3><b>Weather Type : </b> ${data.dataseries[0].weather}</h3>
        
//     `
//     weather.innerHTML = newData;
// }

// update(1);


// window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=2.168&lat=41.387&product=civil&output=json'));
// window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=2.168&lat=41.387&product=astro&output=json'));
// window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=-2.935&lat=43.263&product=civil&output=json'));
// window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=-2.935&lat=43.263&product=astro&output=json'));