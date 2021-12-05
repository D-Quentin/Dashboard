import '../css/Widgets.css';
import Weather from './widgets/Weather';
import Crypto from './widgets/Crypto';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function Widget(widget) {
  let dataWidget;
  if (widget.type == "WeatherWidget") {
    dataWidget = await Weather(widget.size, widget.param);
  } else if (widget.type == "CryptoWidget") {
    dataWidget = await Crypto(widget.size, widget.param);
  } else {
    dataWidget = "EmptyWidget";
  }
  return (
    <div className={widget.size + " " + widget.type}>
      {dataWidget}
    </div>
  );
}

async function getAllWidget() {
  var data;
  if (GestCookie.readCookie("uuid") != null) {
    var res = await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"));
    data = await res.json();
  } else {
    data = {data: [
      {order: "1", type: "WeatherWidget", size: "SmallWidget", param: "Paris"},
      {order: "2", type: "EmptyWidget", size: "MediumWidget", param: ""},
      {order: "3", type: "CryptoWidget", size: "MediumWidget", param: "ethereum"},
      {order: "4", type: "WeatherWidget", size: "MediumWidget", param: "Marseille"},
      {order: "5", type: "CryptoWidget", size: "SmallWidget", param: "bitcoin"}
    ]};
  }
  return (data);
}

async function Widgets() {
  const widgetType = (await getAllWidget()).data;
  let widgetContent;
  for (let i = 0; i != widgetType.length; i++) {
    widgetContent = <>{widgetContent}{await Widget(widgetType[i])}</>;
  }
  return (
    <div className="AllWidgets">{widgetContent}</div>
  )
}

export default Widgets;