import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Items from "./components/Items/Items";
import Axios from "axios";
import React from "react";
import TaskForm from "./components/TaskForm/TaskForm";

Axios.defaults.baseURL = "http://localhost:9000/api";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="" element={<Navigate to={'active'}/>}/>
                    <Route path="active" element={<Items active={true}/>}/>
                    <Route path="inactive" element={<Items active={false}/>}/>
                    <Route path="add-form" element={<TaskForm actionType={"add"}/>}/>
                    <Route path="edit-form/:id" element={<TaskForm actionType={"edit"}/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;