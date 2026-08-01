import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage"
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<WelcomePage />}/>
                <Route path="/search-results" element={<SearchResultsPage />}/>

            </Routes>

        </BrowserRouter>

    );
}

export default App;