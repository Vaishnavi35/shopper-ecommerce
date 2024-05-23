import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss";
import "./primeReactCSS.scss";
import { LeftMenu } from "./common/LeftMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
// import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
// import 'primereact/resources/primereact.min.css'; 
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';  
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import ProductDetails from "./components/ProductDetails";
import { leftMenuStore } from "./store/leftMenuStore";
import { Provider } from "react-redux";
import GeneralDataTable from "./common/GeneralDataTable";
import PageNotFound from "./common/PageNotFound";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "./service/ErrorFallback";
import AuthProvider from "./service/AuthProvider";
import PrivateRoute from "./service/PrivateRoute";
import Login from "./common/Login";


const App = () => {

    const prime_react_values = {
        ripple: true,
        // hideOverlaysOnDocumentScrolling: true,
    }

    const logErrorToService = (error, info) => {
        console.error('Logging error to service:', error, info);
    }

    return(
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={logErrorToService} onReset={() => (location.href = '/')}>
                <Provider store={leftMenuStore}>
                    <PrimeReactProvider value={prime_react_values}>
                        <BrowserRouter>
                            <AuthProvider>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route element={<PrivateRoute />}>
                                    <Route path="/" exact index element={<Dashboard />}/>
                                    <Route path="/productDetails" element={<ProductDetails />} />
                                    <Route path="/productDetails/:id" element={<ProductDetails />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="dataTable/:section" element={<GeneralDataTable />} />
                                    <Route path="*" element={<PageNotFound />} />
                                </Route>
                                </Routes>
                            </AuthProvider>
                        </BrowserRouter>
                    </PrimeReactProvider>
                </Provider>
            </ErrorBoundary>
        </>
    )
    
};

createRoot(document.getElementById("app")).render(<App />);
