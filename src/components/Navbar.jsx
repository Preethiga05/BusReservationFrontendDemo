import { Link } from "react-router";
import "../css/navbar.css"

function Navbar({ openLogin }) {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold fs-2"
                    to="/"
                >
                    <span className="text-info">FastX</span>
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

                        </li>

                        <li className="nav-item me-lg-3">

                            <a
                                className="nav-link custom-nav-link"
                                href="#searchBus"
                            >
                                Search Bus
                            </a>

                        </li>
                        <li className="nav-item me-lg-3">

                            <Link
                                className="nav-link custom-nav-link"
                                to="/partner-with-fastx"
                            >
                                Partner With FastX
                            </Link>

                        </li>
                        <li className="nav-item ms-lg-3">

                            <button
                                className="btn btn-light"
                                onClick={openLogin}
                            >
                                Login
                            </button>

                        </li>


                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar