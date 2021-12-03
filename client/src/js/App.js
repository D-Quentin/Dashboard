import '../css/App.css';
import Widgets from './Widgets';

async function App() {
  const widgets = await Widgets();
  return (
    <div className="App">
      {widgets}
    </div>
  );
}

export default App;
