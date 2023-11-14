const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';


const getForcast = async (city) => {
    try {
        const options = {
            headers: {
                "content-type": "application/json",
            },
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'he'
            }
        };
        const res = await axios.get(`${URL}`, options);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


// const getIcon = (degrees) => {
//     console.log(degrees);
//     switch (true) {
//         case (degrees >= 30):
//             return "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-256.png";
//         case (degrees <= 20):
//             return "https://cdn2.iconfinder.com/data/icons/square-weather/30/square_stormy_lightning_energy-512.png";
//         default:
//          return "https://cdn3.iconfinder.com/data/icons/climate-iconset/40/Cloudy-64.png";
//     }
// }
// <img class="w-25" src=${getIcon(weatherObj.main.temp)} alt="icon" />


const contentHolder = document.getElementById("content");

const createColCard = (weatherObj) => {
    const colEl = document.createElement("div");
    colEl.className = "col-lg-4 m-lg-5 mt-5 p-1";
    const cardEl = document.createElement("div");
    cardEl.className = "card p-3 shadow d-flex flex-column align-items-center";
    const cardHeader = document.createElement("div");
    cardHeader.className = "container d-flex justify-content-between mb-4";
    const cardBody = document.createElement("div");
    cardBody.className = "container d-flex justify-content-between text-center mb-4";

    cardHeader.innerHTML = `
    <article class="country">
    <h2 class="fw-bolder">${weatherObj.name}</h2>
    <h6 class="text-secondary">${weatherObj.weather[0].description}</h6>
    </article>
    <img class="w-25"
      src="http://openweathermap.org/img/w/${weatherObj.weather[0].icon}.png" alt="icon" />
    `;

    cardBody.innerHTML = `
    <article class="country">
        <h6>טמפ' נמדדת</h6>
        <h3 lang="en" dir="ltr">${Math.round(weatherObj.main.temp)}°C</h3>                            
    </article>
    
    <article class="country">
        <h6>טמפ' מורגשת</h6>
        <h3 lang="en" dir="ltr">${Math.round(weatherObj.main.feels_like)}°C</h3>
    </article>

    <article class="country">
        <h6>לחות</h6>
        <h3 lang="en" dir="ltr">${weatherObj.main.humidity}%</h3>
    </article>                       
    `;
    cardEl.append(cardHeader);
    cardEl.append(cardBody);
    colEl.append(cardEl);
    return colEl;
};

const addContentToDOM = (holder, content) => holder.append(content);

const showWeather = async (city = 'jerusalem', holder = content) => {
    const data = await getForcast(city);
    console.log(data);
    holder.innerHTML += "";
    addContentToDOM(holder, createColCard(data));
};


const cities = ["Eilat", "London", "New York", "Alaska"];

const render = (cities = []) => {
    cities.map((city) => showWeather(city, content));
};

render(cities);
