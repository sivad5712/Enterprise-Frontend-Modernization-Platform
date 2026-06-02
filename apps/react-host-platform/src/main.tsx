import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Load bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Compile global custom stylesheet
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
