import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage"
import SearchResultsPage from "./pages/SearchResultsPage";
import PartnerWithFastX from "./pages/PartnerWithFastX";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BusOperatorDashboard from "./pages/BusOperatorDashboard";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

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
                    element={
                        <ProtectedRoute
                            allowedRoles={["EXECUTIVE"]}
                        >
                            <ExecutiveDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bus-operator-dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["BUS_OPERATOR"]}
                        >
                            <BusOperatorDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;