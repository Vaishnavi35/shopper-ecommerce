import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leftMenu : "Dashboard"
}

export const leftMenuSlice = createSlice({
    name : "leftMenu",
    initialState,
    reducers : {
        selectLeftMenu : (state,action) => {
            state.leftMenu = action.payload;
        }
    }
})

export const {selectLeftMenu} = leftMenuSlice.actions;
export default leftMenuSlice.reducer;