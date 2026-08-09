import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import BusOperatorService from "../../services/BusOperatorService";

function Profile() {

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [operator, setOperator] = useState(null);

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
                await BusOperatorService.getMyProfile();

            setOperator(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load profile."
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="container-fluid py-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-muted mt-2">
                        Loading profile...
                    </p>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="container-fluid py-4">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        );

    }


    if (!operator) {

        return null;

    }


    return (

        <div className="container-fluid px-4 py-4">

            <div className="row g-4">


                {/* LEFT PROFILE CARD */}

                <div className="col-lg-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body text-center py-5">

                            <div
                                className="rounded-circle bg-primary bg-opacity-10
                                d-flex align-items-center justify-content-center
                                mx-auto mb-3"
                                style={{
                                    width: "95px",
                                    height: "95px"
                                }}
                            >

                                <i
                                    className="bi bi-bus-front-fill text-primary"
                                    style={{
                                        fontSize: "3rem"
                                    }}
                                ></i>

                            </div>


                            <h3
                                className="fw-bold text-primary mb-1"
                            >

                                {operator.companyName}

                            </h3>


                            <p className="text-muted mb-3">

                                Bus Operator #{operator.busOperatorId}

                            </p>


                            {operator.status === "ACTIVE" ? (

                                <span className="badge bg-success px-3 py-2">

                                    Active

                                </span>

                            ) : (

                                <span className="badge bg-danger px-3 py-2">

                                    Inactive

                                </span>

                            )}

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="col-lg-8">


                    {/* COMPANY INFORMATION */}

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "14px"
                        }}
                    >

                        <div className="card-body p-4">


                            <div className="d-flex justify-content-between
                                align-items-center mb-4">

                                <h4
                                    className="fw-bold text-primary mb-0"
                                >

                                    Company Information

                                </h4>


                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setShowUpdateModal(true)
                                    }
                                >

                                    <i className="bi bi-pencil-square me-2"></i>

                                    Edit Profile

                                </button>

                            </div>


                            <div className="row g-4">


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Operator Name
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.busOperatorName}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Company Name
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.companyName}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Licence Number
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.licenceNumber}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Phone Number
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.phoneNumber}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Gender
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.gender}

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Status
                                    </small>

                                    <div className="mt-1">

                                        {operator.status === "ACTIVE" ? (

                                            <span className="badge bg-success">
                                                Active
                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">
                                                Inactive
                                            </span>

                                        )}

                                    </div>

                                </div>


                                <div className="col-12">

                                    <small className="text-muted">
                                        Company Address
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {operator.companyAddress}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* BUSINESS OVERVIEW */}

                    <div
                        className="card border-0 shadow-sm mt-4"
                        style={{
                            borderRadius: "14px"
                        }}
                    >


                    </div>

                </div>

            </div>


            <UpdateProfileModal
                show={showUpdateModal}
                close={() => setShowUpdateModal(false)}
                operator={operator}
                onProfileUpdated={loadProfile}
            />

        </div>

    );

}

export default Profile;