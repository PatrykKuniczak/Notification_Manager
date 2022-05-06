import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilterStateEvent, IOptions} from "../../helpers/interfaces";


const initialState: IFilterStateEvent = {
    filterOption: "A-Z",
    show: false
};

export const filterSlice = createSlice({
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
    })
;

export const {changeOption, toggleFilterDropdown, closeFilterDropdown} = filterSlice.actions;

const store = configureStore({
    reducer: {
        filtering: filterSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectFilter = (state: RootState) => state.filtering;

export default store;