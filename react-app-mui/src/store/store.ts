import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import itemsReducer from "./slices/itemsSlice";


type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        filtering: filterReducer,
        items: itemsReducer
    }
});


export const selectFilter = (state: RootState) => state.filtering;
export const selectItems = (state: RootState) => state.items;

export default store;