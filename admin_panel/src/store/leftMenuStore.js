import { configureStore } from "@reduxjs/toolkit";
import leftMenuSlice from "../slices/leftMenuSlice";

export const leftMenuStore = configureStore({
    reducer: {
        leftMenu : leftMenuSlice
    },
})