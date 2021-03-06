import '../css/NewWidget.css';

const GestCookie = require('./Cookie.js');
const SERVER = "http://127.0.0.1:8080";

async function getListWidget() {
  const data = ["Weather", "Empty", "Crypto", "Covid"];

  return (data);
}

async function CreateWidget() {
  var tmp = document.getElementById('SelectWidgetId');
  const type = tmp.options[tmp.selectedIndex].value + "Widget";
  tmp = document.getElementById('SelectSizeId');
  const size = tmp.options[tmp.selectedIndex].value + "Widget";
  const param = document.getElementById("ParameterId").value;
  const allWidget = (await (await fetch(SERVER + "/get/widgets?uuid=" + GestCookie.readCookie("uuid"))).json()).data;

  if (allWidget.length != 0) {
    allWidget.push({order: allWidget[allWidget.length - 1].order + 1, type, size, param});
  } else {
    allWidget.push({order: 1, type, size, param});
  }

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: allWidget})
  };
  await fetch(SERVER + "/set/widgets?uuid=" + GestCookie.readCookie("uuid"), option);
  document.location.href = "/edit#End";
  return;
}

async function NewWidget() {
  if (GestCookie.readCookie("uuid") == null) {
    return;
  }
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