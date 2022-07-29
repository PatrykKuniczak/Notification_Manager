import {IOptions, ITask} from "../../helpers/interfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "axios";
import dateFormat from "dateformat";
import {createNewSortInstance, inPlaceSort} from "fast-sort";


const sortByBoolean = createNewSortInstance({
    comparer: (a, b) => (a === b) ? 0 : a ? -1 : 1,
    inPlaceSorting: true
});

type IInitialState = { items: ITask[], loading: boolean, error: boolean, errorMessage: string };

const initialState: IInitialState = {
    items: [{
        description: "",
        id: 0,
        important: false,
        date: "",
        taskType: "",
        title: ""
    }],
    loading: false,
    error: false,
    errorMessage: ""
};

export const changeItemImportant = createAsyncThunk(
    "items/changeImportant",
    async (item: ITask) => {
        await Axios.put(`/tasks/${item.id}`, {
            ...item,
            important: !item.important
        })

        return item.id;
    }
);

export const getAllItems = createAsyncThunk(
    "items/getAllItems",
    async (checkLocation: boolean) => {
        const filteredData: ITask[] = [];
        const {data} = await Axios.get("/tasks");
        const actualDate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM");

        data.forEach((item: ITask) => {
            const date = dateFormat(new Date(+item.date * 1000), "yyyy-mm-dd'T'HH:MM");

            if (checkLocation ? date > actualDate : date <= actualDate) {
                filteredData.push({...item, date});
            }
        })

        return inPlaceSort(filteredData).asc(item => item.title);
    }
)

export const deleteItem = createAsyncThunk(
    "items/deleteItem",
    async (id: number) => {
        await Axios.delete(`/tasks/${id}`);

        return id;
    }
)

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        filterItems: (state, {payload}: PayloadAction<IOptions>) => {
            switch (payload) {
                case "A-Z":
                    inPlaceSort(state.items).asc(item => item.title);
                    break;
                case "Z-A":
                    inPlaceSort(state.items).desc(item => item.title);
                    break;
                case "Ważne":
                    sortByBoolean(state.items).asc(item => item.important);
                    break;
                case "Najwcześniejsza Data":
                    inPlaceSort(state.items).asc(item => item.date);
                    break;
                case "Najpóźniejsza Data":
                    inPlaceSort(state.items).desc(item => item.date);
            }
        },
        filterItemsByTerm: (state, {payload}: PayloadAction<string>) => {
            inPlaceSort(state.items).desc(item => item.title.toLowerCase().startsWith(payload));
        }
    },
    extraReducers: (builders) => {
        builders.addCase(getAllItems.pending,
            (state) => {
                state.loading = true;
            })

        builders.addCase(getAllItems.fulfilled,
            (state, {payload}: PayloadAction<ITask[]>) => {
                state.items = payload
                state.loading = false;
            })

        builders.addCase(getAllItems.rejected,
            (state, {error}) => {
                state.errorMessage = error.message!;
                state.error = true;
            })


        builders.addCase(changeItemImportant.fulfilled,
            (state, {payload}: PayloadAction<number>) => {
                return state.items.forEach(item => {
                    if (item.id === payload)
                        item.important = !item.important;
                })
            })

        builders.addCase(changeItemImportant.rejected,
            (state, {error}) => {
                state.errorMessage = error.message!;
                state.error = true;
            })

        builders.addCase(deleteItem.fulfilled,
            (state, {payload}: PayloadAction<number>) => {
                state.items = state.items.filter(item => item.id !== payload);
            })

        builders.addCase(deleteItem.rejected,
            (state, {error}) => {
                state.errorMessage = error.message!;
                state.error = true;
            })
    }
});

export const {filterItems, filterItemsByTerm} = itemsSlice.actions;


export default itemsSlice.reducer;