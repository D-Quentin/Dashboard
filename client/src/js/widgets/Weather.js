import '../../css/widgets/Weather.css';

const SERVER = "http://127.0.0.1:8080";

function WeatherMedium(data) {
  let weatherList

  for (let i = 0; i != 3; i++) {
    weatherList = <>{weatherList}
    <div className="WeatherListItem">
      {data.prevision[i].day}
      <br/>
      {data.prevision[i].min + "° - " + data.prevision[i].max + "°"}
    </div></>;
  }

  return (
    <>
      <div className="MainWeather">
        <div className="TempNow">{data.tempNow + "°"}</div>
        <div className="WeatherCity">{data.city}</div>
      </div>
      <div className="WeatherPrevision">
        <div className="WeatherList">
          {weatherList}
        </div>
      </div>
    </>
  );
}

function WeatherSmall(data) {
  return (
    <div className="WeatherSmall">
      <div className="TempNowSmall">{data.tempNow + "°"}</div>
      <div className="WeatherCitySmall">{data.city}</div>
    </div>
  );
}

async function Weather(widgetSize, param) {
  const data = await (await fetch(SERVER + "/weather?city=" + param + "&days=3")).json();

  if (widgetSize == "SmallWidget")
    return (WeatherSmall(data));
  else
    return (WeatherMedium(data));
}

export default Weather;