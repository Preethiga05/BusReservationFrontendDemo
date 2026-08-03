import "./ExecutiveCss/ApplicationDetailsModal.css";
import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import BusOperatorApplicationService from "../../services/BusOperatorApplicationService";

function ApplicationDetailsModal({

    application,

    close,
    refreshApplications

}) {

    if (!application) return null;
    const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);

    const [remarks, setRemarks] = useState("");
    const approveApplication = async () => {

        try {

            await BusOperatorApplicationService
                .approveApplication(application.applicationId);

            await refreshApplications();

            setShowApproveConfirmation(false);

            close();

        }

        catch (err) {

            console.log(err);

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

            <div className="application-modal-overlay">

                <div className="application-modal">

                    <button
                        className="close-modal-btn"
                        onClick={close}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    <div className="modal-header-section">

                        <div className="application-icon">

                            <i className="bi bi-buildings-fill"></i>

                        </div>

                        <h3>Bus Operator Application</h3>

                        <p>
                            Review the submitted application details.
                        </p>

                    </div>

                    <div className="application-details">

                        <div className="detail-item">

                            <label>Owner Name</label>

                            <span>{application.ownerName}</span>

                        </div>

                        <div className="detail-item">

                            <label>Company Name</label>

                            <span>{application.companyName}</span>

                        </div>

                        <div className="detail-item">

                            <label>Email</label>

                            <span>{application.email}</span>

                        </div>

                        <div className="detail-item">

                            <label>Phone Number</label>

                            <span>{application.phoneNumber}</span>

                        </div>

                        <div className="detail-item">

                            <label>Licence Number</label>

                            <span>{application.licenceNumber}</span>

                        </div>

                        <div className="detail-item">

                            <label>Gender</label>

                            <span>{application.gender}</span>

                        </div>

                        <div className="detail-item">

                            <label>Company Address</label>

                            <span>{application.companyAddress}</span>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => setShowRejectModal(true)}
                        >
                            Reject
                        </button>

                        <button
                            className="btn btn-outline-success"
                            onClick={() => setShowApproveConfirmation(true)}
                        >
                            Approve
                        </button>

                    </div>

                </div>

            </div>
            <ConfirmationModal
                show={showApproveConfirmation}
                title="Approve Application"
                message={`Are you sure you want to approve "${application.companyName}"?

A new Bus Operator account will be created automatically.

The operator can then log in and start managing buses.`}
                confirmButtonText="Approve"
                confirmButtonClass="btn-success"
                onCancel={() => setShowApproveConfirmation(false)}
                onConfirm={approveApplication}
            />
            {
                showRejectModal &&

                <div className="application-modal-overlay">

                    <div className="application-modal">

                        <button
                            className="close-modal-btn"
                            onClick={() => {
                                setShowRejectModal(false);
                                setRemarks("");
                            }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <div className="modal-header-section">

                            <div className="application-icon">

                                <i className="bi bi-x-circle-fill"></i>

                            </div>

                            <h3>Reject Application</h3>

                            <p>
                                Please provide a reason for rejecting this application.
                            </p>

                        </div>

                        <div className="application-details">

                            <div className="detail-item">

                                <label>Remarks</label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter rejection remarks..."
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

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
            }
        </>

    );

}

export default ApplicationDetailsModal;