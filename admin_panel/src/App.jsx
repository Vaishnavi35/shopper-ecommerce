import React from "react";
import { createRoot } from 'react-dom/client';

import "./index.scss";
import { LeftMenu } from "./common/LeftMenu";

const App = () => (
 <LeftMenu></LeftMenu>
);

createRoot(document.getElementById("app")).render(<App />);
