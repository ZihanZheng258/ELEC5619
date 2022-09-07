// Entry js


import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import 'antd/dist/antd.css'

// render app component to index page div
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);