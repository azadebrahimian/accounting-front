import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar.tsx";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>,

  document.getElementById('root'),
  document.title = "Budgeting App"
);
