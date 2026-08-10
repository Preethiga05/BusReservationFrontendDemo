function ExecutiveSidebar({
    selectedMenu,
    setSelectedMenu
}) {

    return (

        <div className="bg-primary h-100">

            <ul className="list-unstyled mb-0">

                {/* Dashboard */}

                <li
                    onClick={() =>
                        setSelectedMenu("dashboard")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "dashboard"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-grid-fill fs-5"></i>

                        <span>
                            Dashboard
                        </span>

                    </div>

                </li>


                {/* Applications */}

                <li
                    onClick={() =>
                        setSelectedMenu("applications")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "applications"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-file-earmark-text-fill fs-5"></i>

                        <span>
                            Applications
                        </span>

                    </div>

                </li>


                {/* Bus Operators */}

                <li
                    onClick={() =>
                        setSelectedMenu("operators")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "operators"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-buildings-fill fs-5"></i>

                        <span>
                            Bus Operators
                        </span>

                    </div>

                </li>


                {/* Amenities */}

                <li
                    onClick={() =>
                        setSelectedMenu("amenities")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "amenities"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-stars fs-5"></i>

                        <span>
                            Amenities
                        </span>

                    </div>

                </li>


                {/* Routes */}

                <li
                    onClick={() =>
                        setSelectedMenu("routes")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "routes"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-signpost-fill fs-5"></i>

                        <span>
                            Routes
                        </span>

                    </div>

                </li>


                {/* Passengers */}

                <li
                    onClick={() =>
                        setSelectedMenu("passengers")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
                            px-3 py-3
                            rounded-3
                            ${selectedMenu === "passengers"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-people-fill fs-5"></i>

                        <span>
                            Passengers
                        </span>

                    </div>

                </li>


                {/* Profile */}

                <li
                    onClick={() =>
                        setSelectedMenu("profile")
                    }
                    className="px-3 py-2"
                >

                    <div
                        className={
                            `d-flex align-items-center gap-3
            px-3 py-3
            rounded-3
            ${selectedMenu === "profile"
                                ? "bg-white text-primary"
                                : "text-white"
                            }`
                        }
                    >

                        <i className="bi bi-person-circle fs-5"></i>

                        <span>
                            Profile
                        </span>

                    </div>

                </li>

            </ul>

        </div>

    );

}

export default ExecutiveSidebar;