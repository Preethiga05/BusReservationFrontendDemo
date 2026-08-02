import "./ExecutiveCss/PassengerDetailsModal.css";
import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function PassengerDetailsModal({

    passenger,

    close

}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!passenger) return null;

    const isActive = passenger.status === "ACTIVE";

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

                            <i className="bi bi-person-fill"></i>

                        </div>

                        <h3>

                            Passenger Details

                        </h3>

                        <p>

                            View registered passenger information.

                        </p>

                    </div>

                    <div className="application-details">

                        <div className="detail-item">

                            <label>

                                Name

                            </label>

                            <span>

                                {passenger.name}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Username

                            </label>

                            <span>

                                {passenger.username}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Phone Number

                            </label>

                            <span>

                                {passenger.phoneNumber}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Emergency Contact

                            </label>

                            <span>

                                {passenger.emergencyContact}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Date of Birth

                            </label>

                            <span>

                                {passenger.dob}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Gender

                            </label>

                            <span>

                                {passenger.gender}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Address

                            </label>

                            <span>

                                {passenger.address}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Status

                            </label>

                            <span>

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

                            </span>

                        </div>

                    </div>

                    <div className="modal-footer justify-content-end">

                        <button

                            className={

                                isActive

                                    ?

                                    "btn btn-danger"

                                    :

                                    "btn btn-success"

                            }

                            onClick={() => setShowConfirmation(true)}

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

            <ConfirmationModal

                show={showConfirmation}

                title={

                    isActive

                        ?

                        "Deactivate Passenger"

                        :

                        "Activate Passenger"

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

                        ?

                        "Deactivate"

                        :

                        "Activate"

                }

                confirmButtonClass={

                    isActive

                        ?

                        "btn-danger"

                        :

                        "btn-success"

                }

                onCancel={() => setShowConfirmation(false)}

                onConfirm={() => {

                    console.log(

                        isActive

                            ?

                            "Deactivate Passenger"

                            :

                            "Activate Passenger"

                    );

                    setShowConfirmation(false);

                }}

            />

        </>

    );

}

export default PassengerDetailsModal;