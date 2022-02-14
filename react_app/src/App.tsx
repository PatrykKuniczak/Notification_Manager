import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './page/Home';
import DisplayActiveItems from "./components/mainContent/DisplayActiveItems";
import DisplayUnActiveItems from "./components/mainContent/DisplayUnActiveItems";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="" element={<Navigate to={'active'}/>}/>
                    <Route path="active" element={<DisplayActiveItems/>}/>
                    <Route path="unActive" element={<DisplayUnActiveItems/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;