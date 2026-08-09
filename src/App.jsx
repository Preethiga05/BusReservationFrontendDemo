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
import PassengerDashboard from "./pages/PassengerDashboard";
import PassengerDetailsPage from "./pages/PassengerDetailsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";
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

                <Route
                    path="/passenger-dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["PASSENGER"]}
                        >
                            <PassengerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/passenger-details"
                    element={
                        <ProtectedRoute
                            allowedRoles={["PASSENGER"]}
                        >
                            <PassengerDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute
                            allowedRoles={["PASSENGER"]}
                        >
                            <PaymentPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ticket"
                    element={
                        <ProtectedRoute
                            allowedRoles={["PASSENGER"]}
                        >
                            <TicketPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/register" element={<Register />} />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route

                    path="/seat-selection"

                    element={<SeatSelectionPage />}

                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;