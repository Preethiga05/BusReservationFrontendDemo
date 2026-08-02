import "./ExecutiveCss/ExecutiveNavbar.css";

function ExecutiveNavbar({ setSelectedMenu }) {

    return (

        <div className="executive-navbar">

            <h4>

                Executive Dashboard

            </h4>

            <div className="navbar-right">

                <i className="bi bi-bell-fill"></i>

                <div className="profile-circle">

                    <li
                        onClick={() => setSelectedMenu("profile")}
                    >
                        <i className="bi bi-person"></i>
                    </li>

                </div>

            </div>

        </div>

    );

}

export default ExecutiveNavbar;