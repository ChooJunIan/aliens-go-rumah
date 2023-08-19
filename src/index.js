// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import Game from './containers/Game';
import reducer from './reducers';
// import * as serviceWorker from './serviceWorker';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

/* eslint-enable */

ReactDOM.render(
  <Provider store = {store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.unregister();
}