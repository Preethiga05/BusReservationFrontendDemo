function Sidebar({

    activeMenu,

    setActiveMenu

}) {

    const menus = [

        {
            id: "dashboard",
            title: "Dashboard",
            icon: "bi bi-house-door-fill"
        },

        {
            id: "bookings",
            title: "Bookings",
            icon: "bi bi-journal-check"
        },

        {
            id: "profile",
            title: "Profile",
            icon: "bi bi-person-circle"
        }

    ];


    return (

        <div
            className="bg-primary p-3 position-sticky top-0"
            style={{
                width: "250px",
                minHeight: "calc(100vh - 72px)"
            }}
        >

            {

                menus.map((menu) => (

                    <button

                        key={menu.id}

                        className={
                            `btn w-100 d-flex align-items-center gap-3 text-start mb-2 py-3 px-3 rounded-3 ${
                                activeMenu === menu.id
                                    ? "btn-primary bg-primary border border-light"
                                    : "btn-link text-white text-decoration-none"
                            }`
                        }

                        onClick={() => setActiveMenu(menu.id)}

                    >

                        <i className={menu.icon}></i>

                        <span>

                            {menu.title}

                        </span>

                    </button>

                ))

            }

        </div>

    );

}

export default Sidebar;