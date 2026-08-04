import { useState } from "react";

import Navbar from "../components/Navbar";

import Sidebar from "../components/BusOperator/Sidebar";

import DashboardHome from "../components/BusOperator/DashboardHome";

import Buses from "../components/BusOperator/Buses";

import BusSchedules from "../components/BusOperator/BusSchedules";

import Bookings from "../components/BusOperator/Bookings";

import Profile from "../components/BusOperator/Profile";

function BusOperatorDashboard() {

    const [activeMenu, setActiveMenu] = useState("dashboard");

    return (

        <>

            <Navbar dashboard={true} />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-lg-2 p-0">

                        <Sidebar

                            activeMenu={activeMenu}

                            setActiveMenu={setActiveMenu}

                        />

                    </div>

                    <div

                        className="col-lg-10"

                        style={{

                            background:"#f4f8fc",

                            minHeight:"100vh",

                            padding:"30px"

                        }}

                    >

                        {

                            activeMenu==="dashboard"

                            &&

                            <DashboardHome/>

                        }

                        {

                            activeMenu==="buses"

                            &&

                            <Buses/>

                        }

                        {

                            activeMenu==="schedules"

                            &&

                            <BusSchedules/>

                        }

                        {

                            activeMenu==="bookings"

                            &&

                            <Bookings/>

                        }

                        {

                            activeMenu==="profile"

                            &&

                            <Profile/>

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default BusOperatorDashboard;