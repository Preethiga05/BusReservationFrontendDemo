import "./BusOperatorCss/Sidebar.css";

function Sidebar({

    activeMenu,

    setActiveMenu

}) {

    return (

        <div className="operator-sidebar">

            <div>


                <ul className="sidebar-menu">

                    <li

                        className={
                            activeMenu === "dashboard"
                                ? "active"
                                : ""
                        }

                        onClick={() => setActiveMenu("dashboard")}

                    >

                        <i className="bi bi-speedometer2"></i>

                        Dashboard

                    </li>

                    <li

                        className={
                            activeMenu === "buses"
                                ? "active"
                                : ""
                        }

                        onClick={() => setActiveMenu("buses")}

                    >

                        <i className="bi bi-bus-front"></i>

                        Buses

                    </li>

                    <li

                        className={
                            activeMenu === "schedules"
                                ? "active"
                                : ""
                        }

                        onClick={() => setActiveMenu("schedules")}

                    >

                        <i className="bi bi-calendar-week"></i>

                        Schedules

                    </li>

                    <li

                        className={
                            activeMenu === "bookings"
                                ? "active"
                                : ""
                        }

                        onClick={() => setActiveMenu("bookings")}

                    >

                        <i className="bi bi-ticket-perforated"></i>

                        Bookings

                    </li>

                    <li

                        className={
                            activeMenu === "profile"
                                ? "active"
                                : ""
                        }

                        onClick={() => setActiveMenu("profile")}

                    >

                        <i className="bi bi-person-circle"></i>

                        Profile

                    </li>

                </ul>

            </div>

        </div>

    );

}

export default Sidebar;