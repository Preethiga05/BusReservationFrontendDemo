function AdminSidebar({
    activeMenu,
    setActiveMenu
}) {

    return (

        <div
            className="bg-primary text-white min-vh-100"
        >

            <div className="p-3">

                <div className="d-flex flex-column gap-2">


                    {/* =========================================
                        DASHBOARD
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setActiveMenu("dashboard")
                        }
                        className={
                            activeMenu === "dashboard"
                                ? "btn btn-light text-primary text-start d-flex align-items-center gap-3"
                                : "btn btn-primary text-white text-start d-flex align-items-center gap-3"
                        }
                    >

                        <i className="bi bi-grid-fill"></i>

                        <span>
                            Dashboard
                        </span>

                    </button>


                    {/* =========================================
                        EXECUTIVE
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setActiveMenu("executives")
                        }
                        className={
                            activeMenu === "executives"
                                ? "btn btn-light text-primary text-start d-flex align-items-center gap-3"
                                : "btn btn-primary text-white text-start d-flex align-items-center gap-3"
                        }
                    >

                        <i className="bi bi-person-badge-fill"></i>

                        <span>
                            Executive
                        </span>

                    </button>


                    {/* =========================================
                        PROFILE
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setActiveMenu("profile")
                        }
                        className={
                            activeMenu === "profile"
                                ? "btn btn-light text-primary text-start d-flex align-items-center gap-3"
                                : "btn btn-primary text-white text-start d-flex align-items-center gap-3"
                        }
                    >

                        <i className="bi bi-person-circle"></i>

                        <span>
                            Profile
                        </span>

                    </button>


                </div>

            </div>

        </div>

    );

}

export default AdminSidebar;