import { useState } from "react";

import Navbar from "../components/Navbar";
import ExecutiveSidebar from "../components/Executive/ExecutiveSidebar";

import DashboardHome from "../components/Executive/DashboardHome";
import Applications from "../components/Executive/Applications";
import BusOperators from "../components/Executive/BusOperators";
import Amenities from "../components/Executive/Amenities";
import Routes from "../components/Executive/Routes";
import Passengers from "../components/Executive/Passengers";
import Profile from "../components/Executive/Profile";

function ExecutiveDashboard() {

    const [selectedMenu, setSelectedMenu] = useState(
        localStorage.getItem("executiveSelectedMenu") || "dashboard"
    );

    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
        localStorage.setItem("executiveSelectedMenu", menu);
    };

    return (

        <>

            {/* FULL NAVBAR */}

            <Navbar dashboard={true} />


            {/* CONTENT BELOW NAVBAR */}

            <div className="container-fluid">

                <div className="row">

                    {/* SIDEBAR */}

                    <div className="col-lg-2 p-0">

                        <ExecutiveSidebar

                            selectedMenu={selectedMenu}

                            setSelectedMenu={handleMenuChange}

                        />

                    </div>


                    {/* MAIN CONTENT */}

                    <div
                        className="col-lg-10"
                        style={{
                            background: "#f4f8fc",
                            minHeight: "calc(100vh - 68px)",
                            padding: "30px"
                        }}
                    >

                        {
                            selectedMenu === "dashboard"
                            &&
                            <DashboardHome
                                setSelectedMenu={setSelectedMenu}
                            />
                        }


                        {
                            selectedMenu === "applications"
                            &&
                            <Applications />
                        }


                        {
                            selectedMenu === "operators"
                            &&
                            <BusOperators />
                        }


                        {
                            selectedMenu === "amenities"
                            &&
                            <Amenities />
                        }


                        {
                            selectedMenu === "routes"
                            &&
                            <Routes />
                        }


                        {
                            selectedMenu === "passengers"
                            &&
                            <Passengers />
                        }


                        {
                            selectedMenu === "profile"
                            &&
                            <Profile />
                        }

                    </div>

                </div>

            </div>

        </>

    );
}

export default ExecutiveDashboard;