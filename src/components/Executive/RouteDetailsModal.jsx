import "./ExecutiveCss/RouteDetailsModal.css";
import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function RouteDetailsModal({

    route,

    close

}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!route) return null;

    const isActive = route.status === "ACTIVE";

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

                            <i className="bi bi-signpost-fill"></i>

                        </div>

                        <h3>

                            Route Details

                        </h3>

                        <p>

                            View route information.

                        </p>

                    </div>

                    <div className="application-details">

                        <div className="detail-item">

                            <label>

                                Origin City

                            </label>

                            <span>

                                {route.originCity}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Destination City

                            </label>

                            <span>

                                {route.destinationCity}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Distance

                            </label>

                            <span>

                                {route.distanceKm} KM

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Estimated Duration

                            </label>

                            <span>

                                {route.estimatedDurationMinutes} Minutes

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

                                "Deactivate Route"

                                :

                                "Activate Route"

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

                    "Deactivate Route"

                    :

                    "Activate Route"

                }

                message={

                    isActive

                    ?

                    `Are you sure you want to deactivate the route

"${route.originCity} → ${route.destinationCity}"?

This route will no longer be available while creating bus schedules.

This action can be reversed later.`

                    :

                    `Are you sure you want to activate the route

"${route.originCity} → ${route.destinationCity}"?

This route will be available while creating bus schedules.`

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

                        "Deactivate Route"

                        :

                        "Activate Route"

                    );

                    setShowConfirmation(false);

                }}

            />

        </>

    );

}

export default RouteDetailsModal;