import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Axios from "axios";
import React from "react";
import Home from './pages/Home';
import GlobalStyles from "./components/GlobalStyles.styled";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
    return (<>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Navigate to={'active'}/>}/>
                    <Route path="active" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;