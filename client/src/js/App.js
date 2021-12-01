import '../css/App.css';
import Widgets from './Widgets';

const SERVER = "http://localhost:8080";

async function App() {
  const widgets = await Widgets();
  return (
    <div className="App">
      {widgets}
    </div>
  );
}

// async function handleClick() {
  // const data = await fetch(SERVER + "/api/test");
  // const json = data.json();
  // console.log(json);
// }

export default App;
