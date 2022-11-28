import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import BoardLists from "./pages/BoardLists";
import Login from "./pages/Login";


const ComponentRoutes = () => {
    
    return <>
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/boards' element={<BoardLists />} />
                <Route exact path='/boards/:id' element={<Board />} />
            </Routes>
        </Router>
    </>
}

export default ComponentRoutes;