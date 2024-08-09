const cont = document.querySelector('h1');
const mon = document.querySelector('h2');
const weather = document.querySelector('.weather');

const dat = async (reso) => {
    const res = await fetch(reso);
    const temp = await res.json();
    console.log(temp);
    return temp;
}


const month = new Date().getMonth() + 1;
const date = new Date().getDate();

const time = new Date().getHours();

// const ll = new Date().toJSON();
// console.log(typeof(ll));

mon.innerHTML = date + '  ' + 'August' + `<br><br>` + time + ' AM';

const update = async (location) => {
    const data = await dat(location);
    const newData = `
        <h3><b>Temperature : </b> ${data.dataseries[0].temp2m}°C</h3>
        <h3><b>Humidity : </b> ${data.dataseries[0].rh2m}</h3>
        <h3><b>Wind : </b> ${data.dataseries[0].wind10m.speed} m/s ${data.dataseries[0].wind10m.direction}</h3>
        <h3><b>Weather Type : </b> ${data.dataseries[0].weather}</h3>
        
    `
    weather.innerHTML = newData;
}

// update('http://www.7timer.info/bin/api.pl?lon=2.168&lat=41.387&product=civil&output=json');
update('http://www.7timer.info/bin/api.pl?lon=83.433&lat=26.731&product=civil&output=json');


window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=2.168&lat=41.387&product=civil&output=json'));
window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=2.168&lat=41.387&product=astro&output=json'));
window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=-2.935&lat=43.263&product=civil&output=json'));
window.addEventListener('DOMContentLoaded',() => dat('http://www.7timer.info/bin/api.pl?lon=-2.935&lat=43.263&product=astro&output=json'));