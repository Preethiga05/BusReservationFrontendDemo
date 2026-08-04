import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import "./BusOperatorCss/Profile.css";

function Profile() {

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const operator = {

        busOperatorId: 102,

        busOperatorName: "Rajesh Kumar",

        companyName: "FastX Travels",

        licenceNumber: "TN-BO-2026-4589",

        companyAddress: "12 Anna Salai, Chennai",

        phoneNumber: "9876543210",

        gender: "MALE",

        status: "ACTIVE"

    };

    return (

        <>

            <div className="profile-container">

                <div className="row">

                    {/* Left Card */}

                    <div className="col-lg-4">

                        <div className="profile-card">

                            <div className="profile-avatar">

                                <i className="bi bi-bus-front-fill"></i>

                            </div>

                            <h3>

                                {operator.companyName}

                            </h3>

                            <p>

                                Bus Operator #{operator.busOperatorId}

                            </p>

                            {

                                operator.status === "ACTIVE"

                                ?

                                <span className="badge bg-success">

                                    Active

                                </span>

                                :

                                <span className="badge bg-danger">

                                    Inactive

                                </span>

                            }

                        </div>

                    </div>

                    {/* Right Section */}

                    <div className="col-lg-8">

                        <div className="profile-details-card">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h4>

                                    Company Information

                                </h4>

                                <button

                                    className="btn btn-primary"

                                    onClick={() => setShowUpdateModal(true)}

                                >

                                    <i className="bi bi-pencil-square me-2"></i>

                                    Edit Profile

                                </button>

                            </div>

                            <div className="row">

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Operator Name

                                    </label>

                                    <h6>

                                        {operator.busOperatorName}

                                    </h6>

                                </div>

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Company Name

                                    </label>

                                    <h6>

                                        {operator.companyName}

                                    </h6>

                                </div>

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Licence Number

                                    </label>

                                    <h6>

                                        {operator.licenceNumber}

                                    </h6>

                                </div>

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Phone Number

                                    </label>

                                    <h6>

                                        {operator.phoneNumber}

                                    </h6>

                                </div>

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Gender

                                    </label>

                                    <h6>

                                        {operator.gender}

                                    </h6>

                                </div>

                                <div className="col-md-6 detail-box">

                                    <label>

                                        Status

                                    </label>

                                    <h6>

                                        {operator.status}

                                    </h6>

                                </div>

                                <div className="col-12 detail-box">

                                    <label>

                                        Company Address

                                    </label>

                                    <h6>

                                        {operator.companyAddress}

                                    </h6>

                                </div>

                            </div>

                        </div>
                                                <div className="business-overview-card mt-4">

                            <h4 className="mb-4">

                                Business Overview

                            </h4>

                            <div className="row g-4">

                                <div className="col-lg-3 col-md-6">

                                    <div className="overview-card">

                                        <i className="bi bi-bus-front overview-icon"></i>

                                        <h2>

                                            12

                                        </h2>

                                        <p>

                                            Total Buses

                                        </p>

                                    </div>

                                </div>

                                <div className="col-lg-3 col-md-6">

                                    <div className="overview-card">

                                        <i className="bi bi-check-circle overview-icon"></i>

                                        <h2>

                                            10

                                        </h2>

                                        <p>

                                            Active Buses

                                        </p>

                                    </div>

                                </div>

                                <div className="col-lg-3 col-md-6">

                                    <div className="overview-card">

                                        <i className="bi bi-signpost-2 overview-icon"></i>

                                        <h2>

                                            18

                                        </h2>

                                        <p>

                                            Routes

                                        </p>

                                    </div>

                                </div>

                                <div className="col-lg-3 col-md-6">

                                    <div className="overview-card">

                                        <i className="bi bi-calendar2-week overview-icon"></i>

                                        <h2>

                                            34

                                        </h2>

                                        <p>

                                            Active Schedules

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <UpdateProfileModal

                show={showUpdateModal}

                close={() => setShowUpdateModal(false)}

                operator={operator}

            />

        </>

    );

}

export default Profile;