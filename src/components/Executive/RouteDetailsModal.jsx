import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import RouteService from "../../services/RouteService";

function RouteDetailsModal({
    route,
    close,
    refreshRoutes
}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!route) return null;

    const isActive = route.status === "ACTIVE";


    const changeRouteStatus = async () => {

        try {

            if (isActive) {

                await RouteService.deactivateRoute(
                    route.routeId
                );

            }

            else {

                await RouteService.activateRoute(
                    route.routeId
                );

            }

            await refreshRoutes();

            setShowConfirmation(false);

            close();

        }

        catch (err) {

            console.log(err);

        }

    };


    return (

        <>

            {/* Route Details Modal */}

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

                                <i className="bi bi-signpost-fill fs-2"></i>

                            </div>

                            <h3 className="fw-semibold mb-2">
                                Route Details
                            </h3>

                            <p className="text-secondary mb-0">
                                View route information.
                            </p>

                        </div>


                        {/* Route Details */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Origin City
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {route.originCity}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Destination City
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {route.destinationCity}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Distance
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {route.distanceKm} KM
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Estimated Duration
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {route.estimatedDurationMinutes} Minutes
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

                                        "Deactivate Route"

                                        :

                                        "Activate Route"

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
                        ? "Deactivate Route"
                        : "Activate Route"
                }

                message={

                    isActive

                        ?

                        `Are you sure you want to deactivate the route "${route.originCity} → ${route.destinationCity}"?

This route will no longer be available while creating bus schedules.

This action can be reversed later.`

                        :

                        `Are you sure you want to activate the route "${route.originCity} → ${route.destinationCity}"?

This route will be available while creating bus schedules.`
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

                onConfirm={changeRouteStatus}

            />

        </>

    );

}

export default RouteDetailsModal;