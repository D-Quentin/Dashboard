import '../css/Widgets.css';
import Weather from './widgets/Weather';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function Widget(widgetType, widgetSize) {
  let widget;
  if (widgetType == "WeatherWidget")
    widget = await Weather(widgetSize);
  else
    widget = "EmptyWidget";
  return (
    <div className={"Widget" + widgetSize + " " + widgetType}>
      {widget}
    </div>
  )
}

async function getAllWidget() {
  var data;
  if (GestCookie.readCookie("uuid") != null) {
    var res = await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"));
    data = await res.json();
    console.log(res.data);
  } else {
    data = {data: [
      {order: "1", type: "WeatherWidget", size: "Small", param: "Paris"},
      {order: "2", type: "EmptyWidget", size: "Medium", param: ""},
      {order: "3", type: "EmptyWidget", size: "Medium", param: ""},
      {order: "4", type: "WeatherWidget", size: "Medium", param: "Marseille"},
      {order: "5", type: "EmptyWidget", size: "Small", param: ""}
    ]};
  }
  return (data);
}

async function Widgets() {
  const widgetType = (await getAllWidget()).data;
  console.log("TEST");
  console.log(widgetType);
  let widgetContent;
  for (let i = 0; i != widgetType.length; i++) {
    widgetContent = <>{widgetContent}{await Widget(widgetType[i].type, widgetType[i].size)}</>;
  }
  return (
    <div className="AllWidgets">{widgetContent}</div>
  )
}

export default Widgets;