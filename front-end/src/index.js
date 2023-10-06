import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './styles/index.scss';
import App from './App';
import store from "./app/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


