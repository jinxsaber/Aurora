const cont = document.querySelector('h1');
const mon = document.querySelector('h2');
const weather = document.querySelector('.weather');
const drop_cities = document.querySelector('select');
const full = document.querySelector('.all');

let cityId = -1;
let Out_time = "";
const dat = async (lon,lat) => {
    const res = await fetch(`https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`);
    const temp = await res.json();
    return temp;
}

const Time = (() => {
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let time = new Date().getHours();
    let minute = new Date().getMinutes();
    let y = new Date().getFullYear();
    let Meridian = "";
    
    if(time >= 12 && time != 24){
        Meridian = "PM";
    }
    else{
        Meridian = "AM";
    }
    if(month < 10){
        month = "0" + month;
    }

    if(date < 10){
        date = "0" + date;
    }

    if(minute < 10){
        minute = "0" + minute;
    }
    
    if(time > 12){
        time = time-12;
    }
    if(time >10){
        time = "0" + time;
    }



    Out_time = `Today ${date}/${month}/${y} ${time}:${minute} ${Meridian}`;
})
Time();
console.log(Out_time);


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
    Time();
    const response = await fetch('/data/data.json');
    const ttt = await response.json();
    const city = ttt.find(city => city.id === parseInt(id));
    if (city) {
        full.innerHTML = "";
        const { lat, lon } = city; 
        console.log(`City Coordinates - Latitude: ${lat}, Longitude: ${lon}`);
        const data = await dat(lon,lat);
        const newData = `
        <div class="mb-8 h-44 font-[Montserrat] shadow-lg bg-gray-300 text-black border-solid rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-xl mb-6 duration-1000 cursor-pointer bg-opacity-50 hover:bg-opacity-70 transition-md">
            <div class = "pt-4 font-semibold text-base flex">
            <div class = "pl-8 flex flex-1">${ttt[id-1].place}</div>
            <div class = "bg-red-900 flex flex-1">${Out_time}</div>
            </div>
            <div class = "flex h-32 items-center">
            <div class = "w-6/12 ml-8 flex items-center">
            <div><img class = "h-24 w-24 " src = "/img/Sun.png"></div>
            <div class = "text-6xl pl-12 text-white">${data.dataseries[0].temp2m}°C</div>
            </div>
            <div class = "w-6/12 pl-32">
            <div class = "text-2xl pl-16 pt-0 text-black">${data.dataseries[0].weather}</div>
            <div><b>Humidity : </b> ${data.dataseries[0].rh2m}</div>
            <div><b>Wind : </b> ${data.dataseries[0].wind10m.speed} m/s ${data.dataseries[0].wind10m.direction}</div>
            </div>
            </div>
            </div>
        `
        weather.innerHTML = newData;
    } else {
        console.log('City not found');
    }
};



const all = async () =>{
    Time();
    const response = await fetch('/data/data.json');
    const ttt = await response.json();
    
    full.innerHTML = '';
    for (const city of ttt) {
        const { lat, lon, place } = city;
        const data = await dat(lon, lat);
        const cityData = `
        <div class="mb-8 h-44 font-[Montserrat] shadow-lg bg-gray-300 text-black border-solid rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-xl mb-6 duration-1000 cursor-pointer bg-opacity-50 hover:bg-opacity-70 transition-md">
            <div class = "pt-4 font-semibold text-base flex">
            <div class = "pl-8 flex flex-1">${place}</div>
            <div class = "flex flex-1">${Out_time}</div>
            </div>
            <div class="flex h-32 items-center">
                <div class="w-6/12 ml-8 flex items-center">
                    <div><img class="h-24 w-24" src="/img/Sun.png" alt="Sun"></div>
                    <div class="text-6xl pl-12 text-white">${data.dataseries[0].temp2m}°C</div>
                </div>
                <div class="w-6/12 pl-32">
                    <div class="text-2xl pb-8 text-black">${data.dataseries[0].weather}</div>
                    <div><b>Humidity: </b>${data.dataseries[0].rh2m}</div>
                    <div><b>Wind: </b>${data.dataseries[0].wind10m.speed} m/s ${data.dataseries[0].wind10m.direction}</div>
                </div>
            </div>
            </div>
        `;
        full.innerHTML += cityData; // Append data for each city
    }
};


// all();
// window.addEventListener('DOMContentLoaded',() => all());







// const month = new Date().getMonth() + 1;
// const date = new Date().getDate();
// const time = new Date().getHours();
// const minute = new Date().getMinutes();
// // const ll = new Date().toJSON();
// // console.log(typeof(ll));

// mon.innerHTML = date + '  ' + 'August' + `<br><br>` + time + ':' + minute + ' AM';






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