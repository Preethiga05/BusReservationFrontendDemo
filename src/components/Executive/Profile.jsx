import { useEffect, useState } from "react";
import ExecutiveService from "../../services/ExecutiveService";
import UpdateProfileModal from "./UpdateProfileModal";

function Profile() {

    const [executive, setExecutive] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showUpdateModal, setShowUpdateModal] =
        useState(false);


    const loadProfile = async () => {

        try {

            setLoading(true);

            const response =
                await ExecutiveService.getMyProfile();

            console.log(
                "Executive Profile:",
                response.data
            );

            setExecutive(
                response.data
            );

        }
        catch (error) {

            console.error(
                "Failed to load executive profile:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadProfile();

    }, []);


    if (loading) {

        return (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="mt-3 text-muted">
                    Loading profile...
                </p>

            </div>

        );

    }


    if (!executive) {

        return (

            <div className="alert alert-danger">

                Unable to load executive profile.

            </div>

        );

    }


    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">

                        My Profile

                    </h2>

                    <p className="text-muted mb-0">

                        View and update your account details.

                    </p>

                </div>


                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setShowUpdateModal(true)
                    }
                >

                    <i className="bi bi-pencil-square me-2"></i>

                    Update Profile

                </button>

            </div>


            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <div className="row g-4">


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Username

                            </label>

                            <div className="form-control bg-light">

                                {executive.username}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Email

                            </label>

                            <div className="form-control bg-light">

                                {executive.email}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Name

                            </label>

                            <div className="form-control bg-light">

                                {executive.name}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Employee Code

                            </label>

                            <div className="form-control bg-light">

                                {executive.employeeCode}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Job Title

                            </label>

                            <div className="form-control bg-light">

                                {executive.jobTitle}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Phone Number

                            </label>

                            <div className="form-control bg-light">

                                {executive.phoneNumber}

                            </div>

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-muted">

                                Gender

                            </label>

                            <div className="form-control bg-light">

                                {executive.gender}

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {showUpdateModal && (

                <UpdateProfileModal
                    executive={executive}
                    close={() =>
                        setShowUpdateModal(false)
                    }
                    onProfileUpdated={loadProfile}
                />

            )}

        </>

    );

}

export default Profile;