import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Axios from "axios";
import React from "react";
import Home from './pages/Home';
import GlobalStyles from "./components/GlobalStyles.styled";
import Items from "./components/items/Items";


Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
    return (<>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route path="" element={<Navigate to={'active'}/>}/>
                        <Route path="active" element={<Items active={true}/>}/>
                        <Route path="inactive" element={<Items active={false}/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to={'active'}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;