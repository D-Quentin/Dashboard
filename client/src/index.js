import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import TopBar from './js/TopBar';
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";

async function Routing() {
  return(
    <Router>
      <TopBar />
      <Routes>
      <Route path="/" element={await App()} />
        {/* <Route path="/about" component={About} /> */}
      </Routes>
    </Router>
  );
}

async function main() {
  const routing = await Routing();
  ReactDOM.render(
    <React.StrictMode>
      {routing}
    </React.StrictMode>,
    document.getElementById('root')
  );
}

main();