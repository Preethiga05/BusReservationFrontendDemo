import { useState } from "react";
import "./ExecutiveCss/AddRouteModal.css";
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

                        Add Route

                    </h3>

                    <p>

                        Create a new travel route.

                    </p>

                </div>

                <div className="application-details">

                    <div className="detail-item">

                        <label>

                            Origin City

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Origin City"

                            value={originCity}

                            onChange={(e) => setOriginCity(e.target.value)}

                        />

                    </div>

                    <div className="detail-item">

                        <label>

                            Destination City

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Destination City"

                            value={destinationCity}

                            onChange={(e) => setDestinationCity(e.target.value)}

                        />

                    </div>

                    <div className="detail-item">

                        <label>

                            Distance (KM)

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            placeholder="Enter Distance"

                            value={distanceKm}

                            onChange={(e) => setDistanceKm(e.target.value)}

                        />

                    </div>

                    <div className="detail-item">

                        <label>

                            Estimated Duration (Minutes)

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            placeholder="Enter Duration"

                            value={estimatedDurationMinutes}

                            onChange={(e) => setEstimatedDurationMinutes(e.target.value)}

                        />

                    </div>

                </div>

                <div className="modal-footer justify-content-end">

                    <button

                        className="btn btn-primary"

                        onClick={handleSave}

                    >

                        Save Route

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddRouteModal;