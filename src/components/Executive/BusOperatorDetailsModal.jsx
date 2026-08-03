import "./ExecutiveCss/BusOperatorDetailsModal.css";
import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import BusOperatorService from "../../services/BusOperatorService";

function BusOperatorDetailsModal({ operator, close, refreshBusOperators }) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!operator) return null;

    const isActive = operator.status === "ACTIVE";
    const changeBusOperatorStatus = async () => {

    try {

        if(isActive){

            await BusOperatorService
                .deactivateBusOperator(
                    operator.busOperatorId
                );

        }

        else{

            await BusOperatorService
                .activateBusOperator(
                    operator.busOperatorId
                );

        }

        await refreshBusOperators();

        setShowConfirmation(false);

        close();

    }

    catch(err){

        console.log(err);

    }

};

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

                        <h3>Bus Operator Details</h3>

                        <p>
                            View approved bus operator information.
                        </p>

                    </div>

                    <div className="application-details">

                        <div className="detail-item">
                            <label>Company Name</label>
                            <span>{operator.companyName}</span>
                        </div>

                        <div className="detail-item">
                            <label>Owner Name</label>
                            <span>{operator.ownerName}</span>
                        </div>

                        <div className="detail-item">
                            <label>Email</label>
                            <span>{operator.email}</span>
                        </div>

                        <div className="detail-item">
                            <label>Phone Number</label>
                            <span>{operator.phoneNumber}</span>
                        </div>

                        <div className="detail-item">
                            <label>Licence Number</label>
                            <span>{operator.licenceNumber}</span>
                        </div>

                        <div className="detail-item">
                            <label>Company Address</label>
                            <span>{operator.companyAddress}</span>
                        </div>

                        <div className="detail-item">
                            <label>Registered By</label>
                            <span>{operator.executiveName}</span>
                        </div>

                        <div className="detail-item">
                            <label>Status</label>

                            {
                                isActive ?

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

                    <div className="modal-footer justify-content-end">

                        <button

                            className={
                                isActive
                                    ? "btn btn-danger"
                                    : "btn btn-success"
                            }

                            onClick={() => setShowConfirmation(true)}

                        >

                            {
                                isActive
                                    ? "Deactivate Operator"
                                    : "Activate Operator"
                            }

                        </button>

                    </div>

                </div>

            </div>

            <ConfirmationModal

                show={showConfirmation}

                title={
                    isActive
                        ? "Deactivate Bus Operator"
                        : "Activate Bus Operator"
                }

                message={
                    isActive

                        ?

                        `Are you sure you want to deactivate "${operator.companyName}"?

The operator will no longer be able to:

• Login to FastX
• Add buses
• Create schedules
• Manage bookings

This action can be reversed later.`

                        :

                        `Are you sure you want to activate "${operator.companyName}"?

The operator will regain access to:

• Login to FastX
• Add buses
• Create schedules
• Manage bookings.`
                }

                confirmButtonText={
                    isActive
                        ? "Deactivate"
                        : "Activate"
                }

                confirmButtonClass={
                    isActive
                        ? "btn-danger"
                        : "btn-success"
                }

                onCancel={() => setShowConfirmation(false)}

                onConfirm={changeBusOperatorStatus}

            />

        </>
    );

}

export default BusOperatorDetailsModal;