import logo from './logo.svg';
import './App.css';

const SERVER = "http://localhost:8080"

function App() {

  async function handleClick() {
    const data = await fetch(SERVER + "/api/test")
    const json = data.json()
    console.log(json);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>
          Test
        </button>
      </header>
    </div>
  );
}

export default App;
