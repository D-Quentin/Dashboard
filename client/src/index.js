import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';

async function main() {
  const app = await App();
  ReactDOM.render(
    <React.StrictMode>
      {app}
    </React.StrictMode>,
    document.getElementById('root')
  );
}

main();

