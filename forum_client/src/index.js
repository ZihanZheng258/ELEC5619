// Entry js


import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from "./router";
import "./pages/Login/setAuthToken"
import "./css/reset.less"
import "./css/common.less"
import 'antd/dist/antd.css'
import RouteGuard from "./components/RouteGuard";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
        <AppRouter/>
);




// // render app component to index page div
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);