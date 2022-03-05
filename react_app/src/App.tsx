import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './page/Home';
import Items from "./components/mainContent/Items";
import AddForm from "./components/mainContent/AddForm";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:9000/api";

    function App() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route path="" element={<Navigate to={'active'}/>}/>
                        <Route path="active" element={<Items active={true}/>}/>
                        <Route path="inactive" element={<Items active={false}/>}/>
                        <Route path="add-form" element={<AddForm/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </BrowserRouter>
        );
    }

export default App;