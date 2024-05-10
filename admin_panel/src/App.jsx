import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss";
import { LeftMenu } from "./common/LeftMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
// import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';



const App = () => (
    <>
        <PrimeReactProvider>
            <LeftMenu></LeftMenu>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Dashboard />}/>
                </Routes>
            </BrowserRouter>
        </PrimeReactProvider>
    </>
);

createRoot(document.getElementById("app")).render(<App />);
