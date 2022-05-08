import {IOptions, ITask} from "../../helpers/interfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "axios";
import dateFormat from "dateformat";
import {sort} from "fast-sort";


type IInitialState = { items: ITask[], loading: boolean };

const initialState: IInitialState = {
    items: [{
        description: "",
        id: 0,
        important: false,
        date: "",
        taskType: "",
        title: ""
    }],
    loading: false
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
                filteredData.push({...item, date})
            }
        })

        return sort(filteredData).asc(item => item.title);
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
                    state.items = sort(state.items).asc(item => item.title);
                    break;
                case "Z-A":
                    state.items = sort(state.items).desc(item => item.title);
                    break;
                case "Najwcześniejsza Data":
                    state.items = sort(state.items).asc(item => item.date);
                    break;
                case "Najpóźniejsza Data":
                    state.items = sort(state.items).desc(item => item.date);
            }
        }
    },
    extraReducers: (builders) => {
        builders.addCase(getAllItems.pending,
            (state) => {
                state.loading = true;
            })

        builders.addCase(getAllItems.fulfilled,
            (state, {payload}: PayloadAction<ITask[]>) => {
                state.items = payload;
                state.loading = false;
            })

        builders.addCase(changeItemImportant.fulfilled,
            (state, {payload}: PayloadAction<number>) => {
                state.items.forEach(item => {
                    if (item.id === payload)
                        item.important = !item.important;
                })
            })

        builders.addCase(deleteItem.fulfilled,
            (state, {payload}: PayloadAction<number>) => {
                state.items = state.items.filter(item => item.id !== payload);
            })
    }
});

export const {filterItems} = itemsSlice.actions;


export default itemsSlice.reducer;