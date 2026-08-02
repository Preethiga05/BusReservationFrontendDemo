import "./ExecutiveCss/AmenityDetailsModal.css";
import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function AmenityDetailsModal({ amenity, close }) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!amenity) return null;

    const isActive = amenity.status === "ACTIVE";

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

                            <i className="bi bi-stars"></i>

                        </div>

                        <h3>

                            Amenity Details

                        </h3>

                        <p>

                            View amenity information.

                        </p>

                    </div>

                    <div className="application-details">

                        <div className="detail-item">

                            <label>

                                Amenity Name

                            </label>

                            <span>

                                {amenity.amenityName}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Description

                            </label>

                            <span>

                                {amenity.description}

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

                                    "Deactivate Amenity"

                                    :

                                    "Activate Amenity"

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

                        "Deactivate Amenity"

                        :

                        "Activate Amenity"

                }

                message={

                    isActive

                        ?

                        `Are you sure you want to deactivate "${amenity.amenityName}"?

This amenity will no longer be available while adding or updating buses.

This action can be reversed later.`

                        :

                        `Are you sure you want to activate "${amenity.amenityName}"?

This amenity will be available while adding or updating buses.`

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

                            "Deactivate Amenity"

                            :

                            "Activate Amenity"

                    );

                    setShowConfirmation(false);

                }}

            />

        </>

    );

}

export default AmenityDetailsModal;