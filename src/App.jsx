import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage"
import SearchResultsPage from "./pages/SearchResultsPage";
import PartnerWithFastX from "./pages/PartnerWithFastX";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<WelcomePage />} />
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route
                    path="/partner-with-fastx"
                    element={<PartnerWithFastX />}
                />
                <Route
                    path="/executive-dashboard"
                    element={<ExecutiveDashboard />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;