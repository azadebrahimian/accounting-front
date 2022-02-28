import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from "react-router-dom";
import Main from './Main.js';

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,

  document.getElementById('root')
);
