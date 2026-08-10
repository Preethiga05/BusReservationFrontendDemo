import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import BusOperatorService from "../../services/BusOperatorService";

function BusOperatorDetailsModal({
    operator,
    close,
    refreshBusOperators
}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!operator) return null;

    const isActive = operator.status === "ACTIVE";


    const changeBusOperatorStatus = async () => {

        try {

            if (isActive) {

                await BusOperatorService
                    .deactivateBusOperator(
                        operator.busOperatorId
                    );

            }

            else {

                await BusOperatorService
                    .activateBusOperator(
                        operator.busOperatorId
                    );

            }

            await refreshBusOperators();

            setShowConfirmation(false);

            close();

        }

        catch (err) {

            console.log(err);

        }

    };


    return (

        <>

            {/* Bus Operator Details Modal */}

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
                                Bus Operator Details
                            </h3>

                            <p className="text-secondary mb-0">
                                View approved bus operator information.
                            </p>

                        </div>


                        {/* Operator Details */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Company Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.companyName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Owner Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.ownerName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Email
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.email}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Phone Number
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.phoneNumber}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Licence Number
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.licenceNumber}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Company Address
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.companyAddress}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Registered By
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {operator.executiveName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Status
                                </label>

                                <div className="bg-light rounded-3 p-3">

                                    {
                                        isActive

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

                        </div>


                        {/* Footer */}

                        <div className="d-flex justify-content-end mt-4">

                            <button
                                className={
                                    isActive
                                        ? "btn btn-danger"
                                        : "btn btn-success"
                                }
                                onClick={() =>
                                    setShowConfirmation(true)
                                }
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

            </div>


            {/* Confirmation Modal */}

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

                onCancel={() =>
                    setShowConfirmation(false)
                }

                onConfirm={changeBusOperatorStatus}

            />

        </>

    );

}

export default BusOperatorDetailsModal;