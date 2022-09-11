// Entry js


import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
// import common styles
// import './assets/css/file.css'
import AppRouter from "./router";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <AppRouter/>
);




// // render app component to index page div
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);