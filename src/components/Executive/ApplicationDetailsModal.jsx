import "./ExecutiveCss/ApplicationDetailsModal.css";

function ApplicationDetailsModal({

    application,

    close

}) {

    if (!application) return null;

    return (

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

                    <button className="btn btn-outline-danger">

                        Reject

                    </button>

                    <button className="btn btn-outline-success">

                        Approve

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ApplicationDetailsModal;