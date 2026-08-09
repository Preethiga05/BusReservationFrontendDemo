import ExecutiveSidebar from "../components/Executive/ExecutiveSidebar";
import ExecutiveNavbar from "../components/Executive/ExecutiveNavbar";
import DashboardHome from "../components/Executive/DashboardHome";
import "../css/ExecutiveDashboard.css";
import { useState } from "react";
import Applications from "../components/Executive/Applications";
import BusOperators from "../components/Executive/BusOperators";
import Amenities from "../components/Executive/Amenities";
import Routes from "../components/Executive/Routes";
import Passengers from "../components/Executive/Passengers";
import Profile from "../components/Executive/Profile";
function ExecutiveDashboard() {
    const [selectedMenu, setSelectedMenu] = useState("dashboard");

    return (

        <div className="executive-dashboard">

            <ExecutiveSidebar
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
            />

            <div className="dashboard-content">

                <ExecutiveNavbar
                    setSelectedMenu={setSelectedMenu}
                />

                {
                    selectedMenu === "dashboard" &&

                    <DashboardHome
                        setSelectedMenu={setSelectedMenu}
                    />

                }

                {
                    selectedMenu === "applications" &&

                    <Applications />

                }
                {
                    selectedMenu === "operators" &&
                    <BusOperators />
                }
                {
                    selectedMenu === "amenities" &&
                    <Amenities />
                }
                {
                    selectedMenu === "routes" &&
                    <Routes />
                }
                {
                    selectedMenu === "passengers" &&
                    <Passengers />
                }
                {
                    selectedMenu === "profile" &&
                    <Profile />
                }

            </div>

        </div>

    );

}

export default ExecutiveDashboard;