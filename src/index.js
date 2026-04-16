import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppContextProvider from './ContextApp/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
   <AppContextProvider>
      <App />
      <ToastContainer 
         position="top-center"
         autoClose={3000}
         theme="colored"
      />
   </AppContextProvider>
   </BrowserRouter>
);

reportWebVitals();
