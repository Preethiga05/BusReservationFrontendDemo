function Sidebar({ activeMenu, setActiveMenu }) {

    return (
        <div className="bg-primary vh-100">

            <div>
                <ul className="list-unstyled m-0 p-3">

                    <li
                        className={
                            activeMenu === "dashboard"
                                ? "bg-white text-primary d-flex align-items-center gap-3 px-3 py-3 rounded"
                                : "text-white d-flex align-items-center gap-3 px-3 py-3 rounded"
                        }
                        onClick={() => setActiveMenu("dashboard")}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-speedometer2"></i>
                        Dashboard
                    </li>

                    <li
                        className={
                            activeMenu === "buses"
                                ? "bg-white text-primary d-flex align-items-center gap-3 px-3 py-3 rounded"
                                : "text-white d-flex align-items-center gap-3 px-3 py-3 rounded"
                        }
                        onClick={() => setActiveMenu("buses")}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-bus-front"></i>
                        Buses
                    </li>

                    <li
                        className={
                            activeMenu === "schedules"
                                ? "bg-white text-primary d-flex align-items-center gap-3 px-3 py-3 rounded"
                                : "text-white d-flex align-items-center gap-3 px-3 py-3 rounded"
                        }
                        onClick={() => setActiveMenu("schedules")}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-calendar-week"></i>
                        Schedules
                    </li>

                    <li
                        className={
                            activeMenu === "bookings"
                                ? "bg-white text-primary d-flex align-items-center gap-3 px-3 py-3 rounded"
                                : "text-white d-flex align-items-center gap-3 px-3 py-3 rounded"
                        }
                        onClick={() => setActiveMenu("bookings")}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-ticket-perforated"></i>
                        Bookings
                    </li>

                    <li
                        className={
                            activeMenu === "profile"
                                ? "bg-white text-primary d-flex align-items-center gap-3 px-3 py-3 rounded"
                                : "text-white d-flex align-items-center gap-3 px-3 py-3 rounded"
                        }
                        onClick={() => setActiveMenu("profile")}
                        style={{ cursor: "pointer" }}
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