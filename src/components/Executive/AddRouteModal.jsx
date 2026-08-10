import { useState } from "react";
import RouteService from "../../services/RouteService";

function AddRouteModal({
    show,
    close,
    refreshRoutes
}) {

    const [originCity, setOriginCity] = useState("");

    const [destinationCity, setDestinationCity] = useState("");

    const [distanceKm, setDistanceKm] = useState("");

    const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState("");

    if (!show) return null;

    const handleSave = async () => {

        try {

            const route = {
                originCity,
                destinationCity,
                distanceKm,
                estimatedDurationMinutes
            };

            await RouteService.addRoute(route);

            setOriginCity("");
            setDestinationCity("");
            setDistanceKm("");
            setEstimatedDurationMinutes("");

            await refreshRoutes();

            close();

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

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
                            Add Route
                        </h3>

                        <p className="text-secondary mb-0">
                            Create a new travel route.
                        </p>

                    </div>


                    {/* Route Details */}

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Origin City
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Origin City"
                                value={originCity}
                                onChange={(e) =>
                                    setOriginCity(e.target.value)
                                }
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Destination City
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Destination City"
                                value={destinationCity}
                                onChange={(e) =>
                                    setDestinationCity(e.target.value)
                                }
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Distance (KM)
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Distance"
                                value={distanceKm}
                                onChange={(e) =>
                                    setDistanceKm(e.target.value)
                                }
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Estimated Duration (Minutes)
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Duration"
                                value={estimatedDurationMinutes}
                                onChange={(e) =>
                                    setEstimatedDurationMinutes(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    {/* Footer */}

                    <div className="d-flex justify-content-end mt-4">

                        <button
                            type="button"
                            className="btn btn-primary px-4"
                            onClick={handleSave}
                        >
                            Save Route
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddRouteModal;