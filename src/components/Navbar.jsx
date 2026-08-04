import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../css/navbar.css";

function Navbar({ openLogin }) {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const username = localStorage.getItem("username");

    const openDashboard = () => {

        if (role === "PASSENGER") {

            navigate("/passenger-dashboard");

        }

        else if (role === "BUS_OPERATOR") {

            navigate("/bus-operator-dashboard");

        }

        else if (role === "EXECUTIVE") {

            navigate("/executive-dashboard");

        }

        else if (role === "ADMIN") {

            navigate("/admin-dashboard");

        }

        setShowMenu(false);

    };

    const logout = () => {

        localStorage.clear();

        navigate("/");

        window.location.reload();

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold fs-2"
                    to="/"
                >
                    <span className="text-info">

                        FastX

                    </span>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item me-lg-3">

    <button

        className="nav-link custom-nav-link border-0 bg-transparent"

        onClick={() => {

            navigate("/");

            setTimeout(() => {

                document

                    .getElementById("searchBus")

                    ?.scrollIntoView({

                        behavior: "smooth"

                    });

            }, 100);

        }}

    >

        Search Bus

    </button>

</li>

                        <li className="nav-item me-lg-3">

                            <Link
                                className="nav-link custom-nav-link"
                                to="/partner-with-fastx"
                            >

                                Partner With FastX

                            </Link>

                        </li>

                        {

                            !token ?

                                <li className="nav-item ms-lg-3">

                                    <button
                                        className="btn btn-light"
                                        onClick={openLogin}
                                    >

                                        Login

                                    </button>

                                </li>

                                :

                                <li
                                    className="nav-item ms-lg-3 position-relative"
                                >

                                    <button
                                        className="btn btn-light d-flex align-items-center gap-2"
                                        onClick={() =>
                                            setShowMenu(!showMenu)
                                        }
                                    >

                                        <i className="bi bi-person-circle"></i>

                                        {username}

                                        <i className="bi bi-caret-down-fill"></i>

                                    </button>

                                    {

                                        showMenu &&

                                        <div className="profile-dropdown">

                                            <button
                                                className="dropdown-item"
                                                onClick={openDashboard}
                                            >

                                                <i className="bi bi-speedometer2 me-2"></i>

                                                My Dashboard

                                            </button>

                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={logout}
                                            >

                                                <i className="bi bi-box-arrow-right me-2"></i>

                                                Logout

                                            </button>

                                        </div>

                                    }

                                </li>

                        }

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;