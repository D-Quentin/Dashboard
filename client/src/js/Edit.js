import '../css/Widgets.css';
import '../css/Edit.css';
import Weather from './widgets/Weather';

async function SaveWidget(id) {

}

async function DeleteWidget(id) {
  
}

async function Widget(widget) {
  let dataWidget;
  if (widget.type == "WeatherWidget")
  dataWidget = await Weather(widget.size);
  else
  dataWidget = "EmptyWidget";
  return (
    <div className="EditWidget">
      <div className={"Widget" + widget.size + " " + widget.type}>
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

async function getAllWidget() {
  // const allWidget = await (await fetch(SERVER + "/getallwidget?uuid=" + GestCookie.readCookie("uuid"))).json();
  const data = [
    {order: "1", type: "WeatherWidget", size: "Small", param: "Paris"},
    {order: "2", type: "EmptyWidget", size: "Medium", param: ""},
    {order: "3", type: "EmptyWidget", size: "Medium", param: ""},
    {order: "4", type: "WeatherWidget", size: "Medium", param: "Marseille"},
    {order: "5", type: "EmptyWidget", size: "Small", param: ""}
  ];

  return (data);
}

async function EditWidgets() {
  const widgetType = await getAllWidget();
  let widgetContent;
  for (let i = 0; i != widgetType.length; i++) {
    widgetContent = <>{widgetContent}{await Widget(widgetType[i])}</>;
  }
  return (
    <div className="AllWidgets">
      {widgetContent}
      <a href="/newWidget">
        <div className="WidgetSmall NewWidget">
          <div className="NewWidgetPlus">+</div>
          <div className="NewWidgetText">New Widget</div>
        </div>
      </a>
    </div>
  )
}

export default EditWidgets;