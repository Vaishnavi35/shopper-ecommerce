import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss";
import { LeftMenu } from "./common/LeftMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => (
    <>
        <LeftMenu></LeftMenu>
        <BrowserRouter>
            <Routes>
                <Route index element={<Dashboard />}/>
            </Routes>
        </BrowserRouter>
    </>
);

createRoot(document.getElementById("app")).render(<App />);
