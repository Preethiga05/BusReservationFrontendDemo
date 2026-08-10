import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import PassengerService from "../../services/PassengerService";

function PassengerDetailsModal({
    passenger,
    close,
    refreshPassengers
}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!passenger) return null;

    const isActive = passenger.status === "ACTIVE";


    const changePassengerStatus = async () => {

        console.log("Clicked");

        console.log(passenger);

        console.log(isActive);

        try {

            if (isActive) {

                console.log("Calling deactivate");

                await PassengerService.deactivatePassenger(
                    passenger.passengerId
                );

            }

            else {

                console.log("Calling activate");

                await PassengerService.activatePassenger(
                    passenger.passengerId
                );

            }

            console.log("API Success");

            await refreshPassengers();

            setShowConfirmation(false);

            close();

        }

        catch (err) {

            console.log(err);

        }

    };


    return (

        <>

            {/* Passenger Details Modal */}

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

                                <i className="bi bi-person-fill fs-2"></i>

                            </div>

                            <h3 className="fw-semibold mb-2">
                                Passenger Details
                            </h3>

                            <p className="text-secondary mb-0">
                                View registered passenger information.
                            </p>

                        </div>


                        {/* Passenger Details */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.name}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Username
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.username}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Phone Number
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.phoneNumber}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Emergency Contact
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.emergencyContact}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Date of Birth
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.dob}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Gender
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.gender}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Address
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {passenger.address}
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

                                        ?

                                        "Deactivate Passenger"

                                        :

                                        "Activate Passenger"

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
                        ? "Deactivate Passenger"
                        : "Activate Passenger"
                }

                message={

                    isActive

                        ?

                        `Are you sure you want to deactivate "${passenger.name}"?

The passenger will no longer be able to:

• Login
• Book Tickets
• Cancel Bookings
• Update Profile

This action can be reversed later.`

                        :

                        `Are you sure you want to activate "${passenger.name}"?

The passenger will regain access to:

• Login
• Book Tickets
• Cancel Bookings
• Update Profile`
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

                onConfirm={changePassengerStatus}

            />

        </>

    );

}

export default PassengerDetailsModal;