import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./redux/store";
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from "react-helmet";


const REACT_APP_PIXIMOROXEL8AI_URL = import.meta.env.VITE_PIXIMOROXEL8AI_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Helmet>
          <script type="text/javascript" src={REACT_APP_PIXIMOROXEL8AI_URL}></script>
        </Helmet>
        <App />
      </Router>
    </Provider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
