const cont = document.querySelector('h1');
const mon = document.querySelector('h2');
const weather = document.querySelector('.weather');
const drop_cities = document.querySelector('select');
const full = document.querySelector('.all');

let cityId = -1;
let Out_time = "";

//Calling API endpoint
const dat = async (lon,lat) => {
    const res = await fetch(`https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`);
    const temp = await res.json();
    return temp;
}

const sun = async(lon,lat) =>{
    const res = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`);
    const data = await res.json();
    return data;
}

const min_max = async (lon,lat) => {
    const res = await fetch(`https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`);
    const temp = await res.json();
    return temp;
}


const day = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const now = new Date().getDay();

//Function for Default value : Delhi
const def = async () => {
    const data = await dat(77.208, 28.613);
    const sun_data = await sun(77.208,28.613);
    const minTemp = await min_max(77.208,28.613);
    console.log(sun_data);
    console.log(minTemp);
    console.log(data);
    let precipitation = data.dataseries[0].prec_amount * 10;
    document.querySelector('.temp').innerHTML = `
    <div class = "font-light text-7xl flex">${data.dataseries[0].temp2m}<div class = "font-medium pl-0 text-4xl pt-1">°C</div></div>
    <div class = "pt-4 font-medium text-lg flex text-black">${day[now]}, <div class = "text-slate-500">&nbsp;HH:MM AM/PM</div></div>
    `;

    document.querySelector('.status').innerHTML = `
        <div class = "text-sm">Cloud Condition</div>
    `
    document.querySelector('.location').innerHTML = `
    <div class = "bg-[#4d6b73] text-sm text-center font-medium h-3/6 flex justify-center items-center border-0 rounded-2xl px-8 w-max text-white">New Delhi, India</div>
    `
    document.querySelector('.today').innerHTML = `
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl mb-3 py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Humidity</div>
            <div class = "flex  font-medium text-4xl">${data.dataseries[0].rh2m}</div>
        </div>
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl mb-3 py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Wind Status</div>
            <div class = "flex  font-medium text-4xl">12.24<div class = "text-lg flex pt-3">&nbsp;km/h</div></div>
            <div class = "flex text-lg font-medium pt-4">${data.dataseries[0].wind10m.direction}</div>
        </div>
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl mb-3 py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Precipitation</div>
            <div class = "flex  font-medium text-4xl">${precipitation}<div class = "text-lg flex pt-3">&nbsp;%</div></div>
            <div class = "flex text-lg font-medium pt-4">${data.dataseries[0].prec_type}</div>
        </div>
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Min Temperature</div>
            <div class = "flex  font-medium text-4xl">${minTemp.dataseries[0].temp2m.min}<div class = "text-lg">°C</div></div>
        </div>
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Max Temperature</div>
            <div class = "flex  font-medium text-4xl">${minTemp.dataseries[0].temp2m.max}<div class = "text-lg">°C</div></div>
        </div>
        <div class="w-[204px] h-44 bg-white flex flex-col border-0 border-solid rounded-2xl py-4 pl-6">
            <div class = "flex pb-8 text-base font-semibold text-slate-400">Sunrise & Sunset</div>
            <div class = "flex text-sm pb-4 font-semibold">${sun_data.results.sunrise}</div>
            <div class = "flex text-sm font-semibold">${sun_data.results.sunset}</div>
        </div>
    `

}

def();//Calling the function to log

//Time function to show time
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
console.log(Out_time);//Log current time


// const dropdown = async () =>{
//     const response = await fetch('/data/data.json');
//     const ttt = await response.json();
    
//     ttt.forEach(city => {
//         const obj = document.createElement('option');
//         obj.value = city.id;
//         obj.textContent = city.place;
//         drop_cities.appendChild(obj);
//     })
// }

// drop_cities.addEventListener('change', (event) => {
//     cityId = event.target.value;
//     if (cityId) {
//         console.log(`Selected City ID: ${cityId}`);
//         fetchCityCoordinates(cityId);
//     }
// });

// dropdown();


//shows specific city which was clicked
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


/*
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
*/

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