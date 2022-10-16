import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Axios from "axios";
import React from "react";
import Home from './pages/Home';
import GlobalStyles from "./GlobalStyles.styled";
import Items from "./components/items/Items";
import {Provider} from "react-redux";
import store from "./store/store";
import TaskForm from "./pages/TaskForm";
import RegLogin from "./pages/RegLogin";
import browserStore from "store";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {

    const isLogged = browserStore.get('isLogged');

    return (<Provider store={store}>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    {!isLogged && <Route path="/login" element={<RegLogin/>}/>}
                    {isLogged && <Route path="/" element={<Home/>}>
                        <Route path="" element={<Navigate to={'active'}/>}/>
                        <Route path="active" element={<Items active={true}/>}/>
                        <Route path="inactive" element={<Items active={false}/>}/>
                        <Route path="display-form/:id" element={<TaskForm type={"display"}/>}/>
                        <Route path="edit-form/:id" element={<TaskForm type={"edit"}/>}/>
                        <Route path="add-form" element={<TaskForm type={"add"}/>}/>
                    </Route>}
                    <Route path="*" element={<Navigate to={isLogged ? 'active' : 'login'}/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;