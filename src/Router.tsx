import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./routes/Card";
import Diagram from "./routes/Diagram";

function Router () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/diagram" element={<Diagram />} />
                <Route path="/" element={<Card />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;