import '../css/Widgets.css';
import '../css/Edit.css';
import Weather from './widgets/Weather';
import Crypto from './widgets/Crypto';
import Covid from './widgets/Covid';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function SaveWidget(id) {
  const allData = (await (await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"))).json()).data;
  const param = document.getElementById("widget" + id).value;

  for (var i = 0; allData[i] != undefined; i += 1)
    if (allData[i].order === id)
      allData[i].param = param;

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: allData})
  };
  await fetch(SERVER + "/set/widgets?uuid=" + GestCookie.readCookie("uuid"), option);
  document.location.href = "/Edit";
}

async function DeleteWidget(id) {
  var changed = [];
  var allData = (await (await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"))).json()).data;

  for (var i = 0; allData[i] != undefined; i += 1) {
    if (allData[i].order != id)
      changed.push(allData[i]);
  }

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: changed})
  };
  await fetch(SERVER + "/set/widgets?uuid=" + GestCookie.readCookie("uuid"), option);
  document.location.href = "/Edit";
}

async function EditWidget(widget) {
  let dataWidget;
  if (widget.type == "WeatherWidget") {
    dataWidget = await Weather(widget.size, widget.param);
  } else if (widget.type == "CryptoWidget") {
    dataWidget = await Crypto(widget.size, widget.param);
  } else if (widget.type == "CovidWidget") {
    dataWidget = await Covid(widget.size, widget.param);
  } else {
    dataWidget = "EmptyWidget";
  }
  return (
    <div className="EditWidget">
      <div className={widget.size + " " + widget.type}>
        {dataWidget}
      </div>
      <input id={"widget" + widget.order} type="text" className="EditParamInput" placeholder="Parameter"/>
      <div className="SaveDeleteDiv">
        <button type="button" className="SaveEditButton" onClick={async () => await SaveWidget(widget.order)}>Save</button>
        <button type="button" className="DeleteEditButton" onClick={async () => await DeleteWidget(widget.order)}>Delete</button>
      </div>
    </div>
  )
}

async function EditWidgets() {
  if (GestCookie.readCookie("uuid") == null) {
    return;
  }
  const widgetType = (await (await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"))).json()).data;
  let widgetContent;
  for (let i = 0; i != widgetType.length; i++) {
    widgetContent = <>{widgetContent}{await EditWidget(widgetType[i])}</>;
  }
  return (
    <div className="AllWidgets">
      {widgetContent}
      <a href="/newWidget">
        <div className="SmallWidget NewWidget">
          <div className="NewWidgetPlus">+</div>
          <div className="NewWidgetText">New Widget</div>
        </div>
      </a>
    </div>
  )
}

export default EditWidgets;