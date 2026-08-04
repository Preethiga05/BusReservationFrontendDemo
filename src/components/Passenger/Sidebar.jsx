import "./PassengerCss/Sidebar.css";

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

        <div className="sidebar">

            <h4 className="sidebar-title">

                Passenger

            </h4>

            {

                menus.map((menu) => (

                    <button

                        key={menu.id}

                        className={`sidebar-btn ${activeMenu === menu.id ? "active" : ""}`}

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