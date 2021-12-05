import '../../css/widgets/Weather.css';

async function getWeatherData() {
  // const data = await fetch(SERVER + "/api/widgetsdata/weather"); TO DO
  const data = {city: "Paris", tempNow: "12", prevision:
  [
    {day: "Sun", min: "4", max: "11"},
    {day: "Mon", min: "3", max: "9"},
    {day: "Tue", min: "3", max: "7"},
    {day: "Wed", min: "2", max: "9"},
    {day: "Thu", min: "4", max: "11"},
    {day: "Fri", min: "5", max: "11"},
    {day: "Sat", min: "3", max: "9"}
  ]};
  return (data);
}

async function WeatherMedium() {
  const data = await getWeatherData();
  let weatherList1;
  let weatherList2;

  for (let i = 0; i != 3; i++) {
    weatherList1 = <>{weatherList1}
    <div className="WeatherListItem">
      {data.prevision[i].day + "   " + data.prevision[i].min + "° - " + data.prevision[i].max + "°"}
    </div></>;
  }
  for (let i = 3; i != 7; i++) {
    weatherList2 = <>{weatherList2}
    <div className="WeatherListItem">
      {data.prevision[i].day + "   " + data.prevision[i].min + "° - " + data.prevision[i].max + "°"}
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
          {weatherList1}
        </div>
        <div className="WeatherListSeparator"/>
        <div className="WeatherList">
          {weatherList2}
        </div>
      </div>
    </>
  );
}

async function WeatherSmall() {
  const data = await getWeatherData();

  return (
    <div className="WeatherSmall">
      <div className="TempNowSmall">{data.tempNow + "°"}</div>
      <div className="WeatherCitySmall">{data.city}</div>
    </div>
  )
}

async function Weather(widgetSize) {
  if (widgetSize == "SmallWidget")
    return (await WeatherSmall());
  else
    return (await WeatherMedium());
}

export default Weather;