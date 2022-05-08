import {ITask} from "../../helpers/interfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "axios";
import dateFormat from "dateformat";


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

        return filteredData;
    }
)

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
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
            (state, action) => {
                state.items.forEach(item => {
                    if (item.id === action.payload)
                        item.important = !item.important;
                })
            })
    }
});


export default itemsSlice.reducer;