import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App';
import './sass/index.scss'

const ROOT = ReactDOM.createRoot(document.querySelector('#root'));

ROOT.render(
  <>
    <App />
  </>
);