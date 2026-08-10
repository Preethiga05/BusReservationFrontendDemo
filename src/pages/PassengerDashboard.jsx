import { useState } from "react";

import Navbar from "../components/Navbar";

import PassengerSidebar from "../components/Passenger/Sidebar";
import DashboardHome from "../components/Passenger/DashboardHome";
import Bookings from "../components/Passenger/Bookings";
import Profile from "../components/Passenger/Profile";
import "../css/PassengerDashboard.css";

function PassengerDashboard() {

    const username =
        localStorage.getItem("username") || "Passenger";

    const [activeMenu, setActiveMenu] = useState(
        localStorage.getItem("passengerActiveMenu") || "dashboard"
    );

    const [showWelcome, setShowWelcome] = useState(true);

    const changeMenu = (menu) => {

        setActiveMenu(menu);

        localStorage.setItem(
            "passengerActiveMenu",
            menu
        );

    };

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

                    setActiveMenu={changeMenu}

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

                                className="close-banner-btn"

                                onClick={() =>
                                    setShowWelcome(false)
                                }

                            >

                                <i className="bi bi-x-lg"></i>

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