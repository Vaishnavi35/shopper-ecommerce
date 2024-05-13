import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss";
import { LeftMenu } from "./common/LeftMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Reviews from "./components/Reviews";
import Settings from "./components/Settings";
// import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
// import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import ProductDetails from "./components/ProductDetails";



const App = () => (
    <>
        <PrimeReactProvider>
        <BrowserRouter>
            <LeftMenu></LeftMenu>
                <Routes>
                    <Route path="/" exact index element={<Dashboard />}/>
                    <Route path="/products" element={<Products />} />
                    <Route path="/productDetails/:id" element={<ProductDetails />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </PrimeReactProvider>
    </>
);

createRoot(document.getElementById("app")).render(<App />);
