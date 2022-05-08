import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import itemsReducer from "./slices/itemsSlice";
import thunkMiddleware from 'redux-thunk';


type RootState = ReturnType<typeof store.getState>;


const store = configureStore({
    reducer: {
        filtering: filterReducer,
        items: itemsReducer
    },
    middleware: [thunkMiddleware]
});


export const selectFilter = (state: RootState) => state.filtering;
export const selectItems = (state: RootState) => state.items;

export default store;