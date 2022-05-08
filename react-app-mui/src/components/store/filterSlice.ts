import {IFilterStateEvent, IOptions} from "../../helpers/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: IFilterStateEvent = {
    filterOption: "A-Z",
    show: false,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeOption: (state, actions: PayloadAction<IOptions>) => {
            return {filterOption: actions.payload, show: false};
        },

        toggleFilterDropdown: (state) => {
            state.show = !state.show;
        },

        closeFilterDropdown: (state) => {
            state.show = false;
        }
    }
});

export const {changeOption, toggleFilterDropdown, closeFilterDropdown} = filterSlice.actions;


export default filterSlice.reducer;