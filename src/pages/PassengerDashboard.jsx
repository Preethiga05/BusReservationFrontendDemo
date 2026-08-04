import { useState } from "react";

import Navbar from "../components/Navbar";

import PassengerSidebar from "../components/Passenger/PassengerSidebar";
import DashboardHome from "../components/Passenger/DashboardHome";
import Bookings from "../components/Passenger/Bookings";
import Profile from "../components/Passenger/Profile";

import "../components/Passenger/PassengerCss/PassengerDashboard.css";

function PassengerDashboard() {

    const username = localStorage.getItem("username") || "Passenger";

    const [activeMenu, setActiveMenu] = useState("dashboard");

    const [showWelcome, setShowWelcome] = useState(true);

    const renderContent = () => {

        switch (activeMenu) {

            case "dashboard":

                return <DashboardHome />;

            case "bookings":

                return <Bookings />;

            case "profile":

                return <Profile />;

            default:

                return <DashboardHome />;

        }

    };

    return (

        <>

            <Navbar />

            <div className="passenger-dashboard">

                <PassengerSidebar

                    activeMenu={activeMenu}

                    setActiveMenu={setActiveMenu}

                />

                <div className="passenger-content">

                    {

                        showWelcome &&

                        <div className="welcome-card">

                            <div>

                                <h4>

                                    Welcome back,

                                    <span className="text-primary">

                                        {" "}{username}

                                    </span>

                                    👋

                                </h4>

                                <p>

                                    Manage your bookings and enjoy your next journey with FastX.

                                </p>

                            </div>

                            <button

                                className="btn-close"

                                onClick={() => setShowWelcome(false)}

                            >

                            </button>

                        </div>

                    }

                    {renderContent()}

                </div>

            </div>

        </>

    );

}

export default PassengerDashboard;