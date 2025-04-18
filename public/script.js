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
const search = document.querySelector('.search_bar');
const suggestion = document.querySelector('.suggestion');
const weekForecast = document.querySelector('.week');

const API = '6e8687216b3942508c0182511241111';

const data = async (lat,lon)=>{
    
    try{
    load.style.display = 'flex';
    main.style.display = 'none';

    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${lat},${lon}&days=7`);
    const temp = await res.json();

    const Sun = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`);
    const SunData = await Sun.json();

    const forecast = await fetch(`https://www.7timer.info/bin/civillight.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`);
    const foreCast = await forecast.json();
    console.log(foreCast);

    load.style.display = 'none';
    main.style.display = 'block';

    return {temp, SunData,foreCast};
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
    const {temp,SunData,foreCast} = await data(lat,lon);
    console.log(temp);
    console.log(SunData);
    wind_data[1].innerHTML = `${temp.current.wind_kph} <div class = "text-base flex items-end">&nbsp;&nbsp;km/h</div>`;
    wind_data[2].innerHTML = `${temp.current.wind_dir}`;
    vis_data[1].innerHTML = `${temp.current.vis_km} <div class = "text-base flex items-end">&nbsp;&nbsp;km</div>`;
    humid_data[1].innerHTML = `${temp.current.humidity} <div class = "text-base flex items-center">&nbsp;&nbsp;%</div>`;
    sun_data[1].innerHTML = `<img class = "h-8"src="/images/Sun Up.png" alt="" srcset=""> &nbsp;&nbsp;${SunData.results.sunrise}`
    sun_data[2].innerHTML = `<img class = "h-8"src="/images/Sun Down.png" alt="" srcset=""> &nbsp;&nbsp;${SunData.results.sunset}`;
    temp_data[0].innerHTML = `${Math.floor(temp.current.temp_c)} <div class = "text-4xl pt-1"> °C</div>`;
    temp_data[1].innerHTML = `${t}`;
    place.innerHTML = `${temp.location.name}`;
    condition.innerHTML = `${temp.current.condition.text}`;


    const currentDate = new Date();
    const day = currentDate.getDay();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const Days = weekForecast.querySelectorAll('div');

    let num = 0;
    let val = 0;

    Days.forEach((divs) => {
      divs.innerHTML = `
          <div class = "">${days[(day+(++num%7))%7]}</div>
          <div class = "bg-red-500 w-10 h-10"></div>
          <div class = "flex"><div>${foreCast.dataseries[val].temp2m.max}°</div> <div class = "text-slate-600">&nbsp;${foreCast.dataseries[val].temp2m.min}°</p></div>
      `
      val++;
      console.log(days[(day+(num))%7]);
    });


}

fetchAll(26.81,82.76);


let mainData = {};

fetch('/Locations')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    mainData = data;
    console.log(mainData);
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON file:', error);
  });

const suggestions = (element) => {
  suggestion.innerHTML = "";
  if (!element) {
    suggestion.classList.add("hidden");
    return;
  }
  
  const newData = mainData.filter(item => item.place.toLowerCase().includes(element.toLowerCase()));

  if (newData.length) {
    newData.forEach(item => {
      const items = document.createElement("div");
      items.classList.add("items");
      items.textContent = item.place;

      items.addEventListener("click", () => {
        search.value = "";
        suggestion.innerHTML = "";
        suggestion.classList.add("hidden");

        fetchAll(item.lat, item.lon);  // Assuming you have a function `fetchAll`
      });

      suggestion.appendChild(items);
    });

    suggestion.classList.remove("hidden");
  } else {
    suggestion.classList.add("hidden");
  }
}

search.addEventListener("input", (e) => {
  const call = e.target.value;
  suggestions(call);
});



