import '../css/NewWidget.css';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function getListWidget() {
  // const data = await fetch(SERVER + "/api/getallwidget"); TO DO
  const data = ["Weather", "Empty"];

  return (data);
}

async function CreateWidget() {
  var tmp = document.getElementById('SelectWidgetId');
  const type = tmp.options[tmp.selectedIndex].value + "Widget";
  tmp = document.getElementById('SelectSizeId');
  const size = tmp.options[tmp.selectedIndex].value + "Widget";
  const param = document.getElementById("ParameterId").value;
  const allWidget = await (await fetch(SERVER + "/getallwidget?uuid=" + GestCookie.readCookie("uuid"))).json();

  allWidget.push({order: allWidget[allWidget.length - 1].order, type, size, param});

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allWidget)
  };
  await fetch(SERVER + "/setallwidget", option);
  document.location.href = "/edit#End";
  return;
}

async function NewWidget() {
  var allOptions;
  const allWidgets = await getListWidget();

  for (var i = 0; i < allWidgets.length; i++) {
    allOptions = <>{allOptions}<option value={allWidgets[i]}>{allWidgets[i]}</option></>
  }

  return (
    <div className="CadreNewWidget">
      <p className="paramText">Service of the Widget</p>
      <select className="SelectWidget" id="SelectWidgetId">
        {allOptions}
      </select>
      <p className="paramText">Size of the Widget</p>
      <select className="SelectWidget" id="SelectSizeId">
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
      </select>
      <p className="paramText">Parameter of the Widget</p>
      <input id="ParameterId" type="text" className="ParameterInput" placeholder="Parameter"/>
      <button type="button" className="CreateWidgetButton" onClick={CreateWidget}>Create</button>
    </div>
  );
}

export default NewWidget;