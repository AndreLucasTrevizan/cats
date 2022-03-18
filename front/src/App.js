import React from 'react';

import Router from './routes/router';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

export default function App() {
  return (
    <div className="app">
      <Router />
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}