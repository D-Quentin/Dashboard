import '../../css/widgets/Covid.css';

const SERVER = "http://127.0.0.1:8080";


function CovidMedium(data) {
  return (
    <div className="CovidMedium">
      {data.country}
      <div className="AllStatsMedium">
        <div className="CovidStatsListMedium">
          <div className="CovidStatMedium">Total cases :<br/>{data.total_cases}</div>
          <div className="CovidStatMedium">Active cases :<br/>{data.active_cases}</div>
        </div>
        <div className="CovidStatsListMedium">
          <div className="CovidStatMedium">Total deaths :<br/>{data.total_deaths}</div>
          <div className="CovidStatMedium">Recovered :<br/>{data.recovered_cases}</div>
        </div>
      </div>
    </div>
  );
}

function CovidSmall(data) {
  return (
    <div className="CovidSmall">
      <div className="CountrySmall">{data.country}</div>
      <div className="TotalCaseSmall">Total cases :<br/>{data.total_cases}</div>
    </div>
  );
}

async function Covid(widgetSize, param) {
  const data = await (await fetch(SERVER + "/covid?country=" + param)).json();

    if (widgetSize == "SmallWidget")
      return (CovidSmall(data));
    else
      return (CovidMedium(data));
  }
  
  export default Covid;