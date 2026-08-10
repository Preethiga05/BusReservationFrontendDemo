import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import BusOperatorApplicationService from "../../services/BusOperatorApplicationService";

function ApplicationDetailsModal({
    application,
    close,
    refreshApplications
}) {

    const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);

    const [remarks, setRemarks] = useState("");


    if (!application) return null;


   const approveApplication = async () => {

    console.log("APPROVE CLICKED");

    try {

        console.log(
            "Approving application:",
            application.applicationId
        );

        const response =
            await BusOperatorApplicationService
                .approveApplication(
                    application.applicationId
                );

        console.log("APPROVE RESPONSE:", response);

        await refreshApplications();

        setShowApproveConfirmation(false);

        close();

    }

    catch (err) {

        console.log("APPROVE ERROR:", err);

    }

};
    const rejectApplication = async () => {

        try {

            await BusOperatorApplicationService
                .rejectApplication(
                    application.applicationId,
                    remarks
                );

            await refreshApplications();

            setShowRejectModal(false);

            close();

        }

        catch (err) {

            console.log(err);

        }

    };


    console.log(application);

    console.log(application.applicationStatus);


    return (

        <>

            {/* Application Details Modal */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className="modal-content border-0 rounded-4 shadow-lg p-4">

                        {/* Close Button */}

                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-4"
                            onClick={close}
                        >
                        </button>


                        {/* Header */}

                        <div className="text-center mb-4">

                            <div
                                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "75px",
                                    height: "75px"
                                }}
                            >

                                <i className="bi bi-buildings-fill fs-2"></i>

                            </div>

                            <h3 className="fw-semibold mb-2">
                                Bus Operator Application
                            </h3>

                            <p className="text-secondary mb-0">
                                Review the submitted application details.
                            </p>

                        </div>


                        {/* Application Details */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Owner Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.ownerName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Company Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.companyName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Email
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.email}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Phone Number
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.phoneNumber}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Licence Number
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.licenceNumber}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Gender
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.gender}
                                </div>

                            </div>


                            <div className="col-12">

                                <label className="form-label fw-semibold text-secondary">
                                    Company Address
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {application.companyAddress}
                                </div>

                            </div>

                        </div>


                        {/* Footer */}

                        <div className="d-flex justify-content-end gap-3 mt-4">

                            <button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                    setShowRejectModal(true)
                                }
                            >
                                Reject
                            </button>


                            <button
                                className="btn btn-outline-success"
                                onClick={() =>
                                    setShowApproveConfirmation(true)
                                }
                            >
                                Approve
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Approve Confirmation */}

            <ConfirmationModal

                show={showApproveConfirmation}

                title="Approve Application"

                message={`Are you sure you want to approve "${application.companyName}"?

A new Bus Operator account will be created automatically.

The operator can then log in and start managing buses.`}

                confirmButtonText="Approve"

                confirmButtonClass="btn-success"

                onCancel={() =>
                    setShowApproveConfirmation(false)
                }

                onConfirm={approveApplication}

            />


            {/* Reject Modal */}

            {
                showRejectModal &&

                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                >

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content border-0 rounded-4 shadow-lg p-4">

                            {/* Close Button */}

                            <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0 m-4"
                                onClick={() => {

                                    setShowRejectModal(false);

                                    setRemarks("");

                                }}
                            >
                            </button>


                            {/* Header */}

                            <div className="text-center mb-4">

                                <div
                                    className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "75px",
                                        height: "75px"
                                    }}
                                >

                                    <i className="bi bi-x-circle-fill fs-2"></i>

                                </div>

                                <h3 className="fw-semibold mb-2">
                                    Reject Application
                                </h3>

                                <p className="text-secondary mb-0">
                                    Please provide a reason for rejecting this application.
                                </p>

                            </div>


                            {/* Remarks */}

                            <div className="row">

                                <div className="col-12">

                                    <label className="form-label fw-semibold text-secondary">
                                        Remarks
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter rejection remarks..."
                                        value={remarks}
                                        onChange={(e) =>
                                            setRemarks(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            {/* Footer */}

                            <div className="d-flex justify-content-end gap-3 mt-4">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {

                                        setShowRejectModal(false);

                                        setRemarks("");

                                    }}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="btn btn-danger"
                                    onClick={rejectApplication}
                                    disabled={!remarks.trim()}
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            }

        </>

    );

}

export default ApplicationDetailsModal;