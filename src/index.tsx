import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context';

console.log(`${window.location.href}/articles`)
console.log(window.location)

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

