import '../css/Widgets.css';
import '../css/Edit.css';
import Weather from './widgets/Weather';
import Crypto from './widgets/Crypto';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function SaveWidget(id) {

}

async function DeleteWidget(id) {
  
}

async function EditWidget(widget) {
  let dataWidget;
  if (widget.type == "WeatherWidget") {
    dataWidget = await Weather(widget.size, widget.param);
  } else if (widget.type == "CryptoWidget") {
    dataWidget = await Crypto(widget.size, widget.param);
  } else {
    dataWidget = "EmptyWidget";
  }
  return (
    <div className="EditWidget">
      <div className={widget.size + " " + widget.type}>
        {dataWidget}
      </div>
      <input id={"widget" + widget.order} type="text" className="EditParamInput" value={widget.param}/>
      <div className="SaveDeleteDiv">
        <button type="button" className="SaveEditButton" onClick={SaveWidget(widget.order)}>Save</button>
        <button type="button" className="DeleteEditButton" onClick={DeleteWidget(widget.order)}>Delete</button>
      </div>
    </div>
  )
}

// async function getAllWidget() {
//   // const allWidget = await (await fetch(SERVER + "/getallwidget?uuid=" + GestCookie.readCookie("uuid"))).json();
//   const data = [
//     {order: "1", type: "WeatherWidget", size: "Small", param: "Paris"},
//     {order: "2", type: "EmptyWidget", size: "Medium", param: ""},
//     {order: "3", type: "EmptyWidget", size: "Medium", param: ""},
//     {order: "4", type: "WeatherWidget", size: "Medium", param: "Marseille"},
//     {order: "5", type: "EmptyWidget", size: "Small", param: ""}
//   ];

//   return (data);
// }

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