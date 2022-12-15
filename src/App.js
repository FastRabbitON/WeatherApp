import React, {useState} from 'react';

const api = {
  key: "cd95b4162ff6765cbe3dbd2169ae2b1b",
  coordinateUrl: "http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}",
  weatherUrl: "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
}



function App() {

  const [query, setQuery] = useState ('');
  const [cityLAT, setCityLAT] = useState ('');
  const [cityLON, setCityLON] = useState ('');
  const [weather, setWeather] = useState ('');

  const search = (event) =>{

    if (event.key === 'Enter'){

      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${api.key}`)
      .then (resOne => resOne.json())
      .then(cityLAT => {setCityLAT(cityLAT[0].lat)})

      
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${api.key}`)
      .then(resTwo => resTwo.json())
      .then(cityLON => {setCityLON(cityLON[0].lon)});


      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}&units=metric`)
      .then(resThree => {if (resThree.ok){
      return resThree}
      throw Error('Location was not found')
      })
      .then (resThree => resThree.json())
      .then(weather => {setWeather(weather)})
      .catch(errThree => alert(errThree));
      console.log(weather);


    }  
  


  }




  const dateBuilder = (d) => {
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = daysList[d.getDay()];
    let date = d.getDate();
    let month = monthsList[d.getMonth()];
    let year = d.getFullYear();

    return [day, " ", date, <p></p>, month, " ", year]
  }

  return (

    <div className="app">

      <div className = {(weather) ? ((weather.main.temp < 3) ? 'backgroundCold'
        : (weather.main.temp > 25) ? 'backgroundHeat'
        : 'backgroundMid') 
        : 'backgroundMid'} ></div>


        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search Location..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}>
          </input>
        </div>

        { weather ? <div className="content-container">

          <div className="map"></div>

          <div className="geolocal"> {cityLAT} ; {cityLON}</div>

          <div className="location-container">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="temp">{(weather.main.temp).toFixed(1)}°C</div>

          <div className="more-information">

            <div className="wind">
              <div className="title">Wind</div>
              <div className="information">{Math.round(weather.wind.speed)} km/h</div>
            </div>

            <div className="humidity">
              <div className="title">Humidity</div>
              <div className="information">{Math.round(weather.main.humidity)} %</div>
            </div>

            <div className="pressure">
              <div className="title">Pressure</div>
              <div className="information">{Math.round(weather.main.pressure)} hPa</div>
            </div>

          </div>

        </div>: null}

        



    </div>

  );
}

export default App;
