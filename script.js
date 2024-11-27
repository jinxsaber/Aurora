const load = document.querySelector('.load');
const main = document.querySelector('.main');
const wind = document.querySelector('.wind');
const wind_data = wind.querySelectorAll('div');
const vis = document.querySelector('.vis');
const vis_data = vis.querySelectorAll('div');
const humid = document.querySelector('.humid');
const humid_data = humid.querySelectorAll('div');
const sun = document.querySelector('.sun');
const sun_data = sun.querySelectorAll('div');
const temperature = document.querySelector('.temp');
const temp_data = temperature.querySelectorAll('div');
const place = document.querySelector('.place');
const condition = document.querySelector('.condition');

const API = '6e8687216b3942508c0182511241111';

const data = async (lat,lon)=>{
    
    try{
    load.style.display = 'flex';
    main.style.display = 'none';

    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${lat},${lon}&days=7`);
    const temp = await res.json();

    const Sun = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`);
    const SunData = await Sun.json();

    load.style.display = 'none';
    main.style.display = 'block';

    return {temp, SunData};
    // console.log(temp);
}   catch (error) {
    console.error('Error fetching forecast data:', error);
    load.style.display = 'none';
    main.style.display = 'block';
}

}

const Time = ()=>{
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const day = currentDate.getDay();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const time = `<b>${days[day]}</b>, ${hours}:${minutes}`;
    return time;
}

const fetchAll = async(lat,lon) =>{
    const t = Time();
    const {temp,SunData} = await data(lat,lon);
    console.log(temp);
    console.log(SunData);
    wind_data[1].innerHTML = `${temp.current.wind_kph} <div class = "text-base flex items-end">&nbsp;&nbsp;km/h</div>`;
    wind_data[2].innerHTML = `${temp.current.wind_dir}`;
    vis_data[1].innerHTML = `${temp.current.vis_km} <div class = "text-base flex items-end">&nbsp;&nbsp;km</div>`;
    humid_data[1].innerHTML = `${temp.current.humidity} <div class = "text-base flex items-center">&nbsp;&nbsp;%</div>`;
    sun_data[1].innerHTML = `<img class = "h-8"src="Sun Up.png" alt="" srcset=""> &nbsp;&nbsp;${SunData.results.sunrise}`
    sun_data[2].innerHTML = `<img class = "h-8"src="Sun Down.png" alt="" srcset=""> &nbsp;&nbsp;${SunData.results.sunset}`;
    temp_data[0].innerHTML = `${Math.floor(temp.current.temp_c)} <div class = "text-4xl pt-1"> °C</div>`;
    temp_data[1].innerHTML = `${t}`;
    place.innerHTML = `${temp.location.name}`;
    condition.innerHTML = `${temp.current.condition.text}`;

}

fetchAll(26.81,82.76);




