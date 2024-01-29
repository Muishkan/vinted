import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ContextProvider} from "./store/context-store"
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
