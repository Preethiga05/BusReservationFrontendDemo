import { useEffect, useState } from "react";
import AdminService from "../../services/AdminService";

function AdminProfile() {

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await AdminService.getMyProfile();

            console.log(
                "Admin Profile:",
                response.data
            );

            setAdmin(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load admin profile:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load admin profile."
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="d-flex justify-content-center align-items-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="alert alert-danger">

                <i className="bi bi-exclamation-triangle me-2"></i>

                {error}

            </div>

        );

    }


    if (!admin) {

        return (

            <div className="alert alert-warning">

                Admin profile not found.

            </div>

        );

    }


    return (

        <div className="container-fluid p-0">

            {/* Page Heading */}

            <div className="mb-4">

                <h3 className="fw-bold mb-1">

                    Admin Profile

                </h3>

                <p className="text-muted mb-0">

                    View your administrator account details.

                </p>

            </div>


            <div className="row g-4">


                {/* =================================
                    LEFT PROFILE CARD
                ================================= */}

                <div className="col-lg-4">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body text-center py-5">


                            {/* Avatar */}

                            <div
                                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{
                                    width: "110px",
                                    height: "110px"
                                }}
                            >

                                <i
                                    className="bi bi-person-fill text-primary"
                                    style={{
                                        fontSize: "4rem"
                                    }}
                                ></i>

                            </div>


                            {/* Username */}

                            <h3 className="fw-bold mb-2">

                                {admin.username}

                            </h3>


                            <p className="text-muted mb-3">

                                Administrator

                            </p>


                            {/* Status */}

                            {

                                admin.status === "ACTIVE"

                                    ?

                                    <span className="badge bg-success px-3 py-2">

                                        <i className="bi bi-check-circle me-1"></i>

                                        Active

                                    </span>

                                    :

                                    <span className="badge bg-danger px-3 py-2">

                                        <i className="bi bi-x-circle me-1"></i>

                                        Inactive

                                    </span>

                            }

                        </div>

                    </div>

                </div>


                {/* =================================
                    RIGHT INFORMATION CARD
                ================================= */}

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4">


                            <div className="mb-4">

                                <h4 className="fw-bold mb-1">

                                    Account Information

                                </h4>

                                <p className="text-muted mb-0">

                                    Your administrator account information.

                                </p>

                            </div>


                            <div className="row g-4">


                                {/* Admin ID */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted fw-semibold">

                                        Admin ID

                                    </label>

                                    <div className="form-control bg-light">

                                        <i className="bi bi-hash text-primary me-2"></i>

                                        {admin.adminId}

                                    </div>

                                </div>


                                {/* Username */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted fw-semibold">

                                        Username

                                    </label>

                                    <div className="form-control bg-light">

                                        <i className="bi bi-person text-primary me-2"></i>

                                        {admin.username}

                                    </div>

                                </div>


                                {/* Email */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted fw-semibold">

                                        Email Address

                                    </label>

                                    <div className="form-control bg-light">

                                        <i className="bi bi-envelope text-primary me-2"></i>

                                        {admin.email || "Not provided"}

                                    </div>

                                </div>


                                {/* Role */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted fw-semibold">

                                        Role

                                    </label>

                                    <div className="form-control bg-light">

                                        <i className="bi bi-shield-check text-primary me-2"></i>

                                        {admin.role}

                                    </div>

                                </div>


                                {/* Status */}

                                <div className="col-md-6">

                                    <label className="form-label text-muted fw-semibold">

                                        Account Status

                                    </label>

                                    <div className="form-control bg-light">

                                        {

                                            admin.status === "ACTIVE"

                                                ?

                                                <span className="text-success fw-semibold">

                                                    <i className="bi bi-check-circle me-2"></i>

                                                    Active

                                                </span>

                                                :

                                                <span className="text-danger fw-semibold">

                                                    <i className="bi bi-x-circle me-2"></i>

                                                    Inactive

                                                </span>

                                        }

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminProfile;