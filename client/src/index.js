import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import TopBar from './js/TopBar';
import Login from './js/Login';
import Register from './js/Register';
import EditWidgets from './js/Edit';
import NewWidget from './js/NewWidget';
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";

async function Routing() {
  return(
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={await App()} />
        <Route path="/login" element={await Login()} />
        <Route path="/register" element={await Register()} />
        <Route path="/edit" element={await EditWidgets()} />
        <Route path="/newWidget" element={await NewWidget()} />
      </Routes>
      <div id="End"></div>
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