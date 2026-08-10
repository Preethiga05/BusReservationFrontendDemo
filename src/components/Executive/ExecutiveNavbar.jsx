function ExecutiveNavbar({ setSelectedMenu }) {

    return (

        <nav className="navbar bg-white shadow-sm px-4">

            <div className="container-fluid">

                <h4 className="fw-bold text-dark mb-0">

                    Executive Dashboard

                </h4>


                <div className="d-flex align-items-center gap-4">

                    <i
                        className="bi bi-bell-fill fs-5"
                        style={{ cursor: "pointer" }}
                    >
                    </i>


                    <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{
                            width: "42px",
                            height: "42px",
                            cursor: "pointer"
                        }}
                        onClick={() => setSelectedMenu("profile")}
                    >

                        <i className="bi bi-person"></i>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default ExecutiveNavbar;