import '../css/Widgets.css';
import Weather from './widgets/Weather';

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
  // const data = await fetch(SERVER + "/api/getallwidget"); TO DO
  const data = [{type: "WeatherWidget", size: "Small"}, {type: "EmptyWidget", size: "Medium"}, {type: "EmptyWidget", size: "Medium"}, {type: "WeatherWidget", size: "Medium"}, {type: "EmptyWidget", size: "Small"}];
  return (data);
}

async function Widgets() {
  const widgetType = await getAllWidget();
  let widgetContent;
  for (let i = 0; i != widgetType.length; i++) {
    widgetContent = <>{widgetContent}{await Widget(widgetType[i].type, widgetType[i].size)}</>;
  }
  return (
    <div className="AllWidgets">{widgetContent}</div>
  )
}

export default Widgets;