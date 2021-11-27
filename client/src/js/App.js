import '../css/App.css';
import TopBar from './TopBar';

const SERVER = "http://localhost:8080";

function App() {
  return (
    <div className="App">
      <TopBar />
    </div>
  );
}

// async function handleClick() {
  // const data = await fetch(SERVER + "/api/test");
  // const json = data.json();
  // console.log(json);
// }

export default App;
