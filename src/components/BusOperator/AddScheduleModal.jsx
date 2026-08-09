import { useEffect, useState } from "react";
import BusService from "../../services/BusService";
import RouteService from "../../services/RouteService";
import BusScheduleService from "../../services/BusScheduleService";

function AddScheduleModal({
    show,
    close,
    onScheduleAdded
}) {

    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);

    const [busId, setBusId] = useState("");
    const [routeId, setRouteId] = useState("");

    const [journeyDate, setJourneyDate] = useState("");

    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");

    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    const [fare, setFare] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [error, setError] = useState("");


    useEffect(() => {

        if (show) {
            loadBusesAndRoutes();
        }

    }, [show]);


    const loadBusesAndRoutes = async () => {

        try {

            setLoadingData(true);
            setError("");

            const [busResponse, routeResponse] =
                await Promise.all([
                    BusService.getOwnBuses(),
                    RouteService.getAllRoutes()
                ]);

            console.log("Buses:", busResponse.data);
            console.log("Routes:", routeResponse.data);

            setBuses(busResponse.data);
            setRoutes(routeResponse.data);

        }
        catch (error) {

            console.error(
                "Failed to load buses/routes:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load buses and routes."
            );

        }
        finally {

            setLoadingData(false);

        }

    };


    const resetForm = () => {

        setBusId("");
        setRouteId("");

        setJourneyDate("");

        setDepartureDate("");
        setDepartureTime("");

        setArrivalDate("");
        setArrivalTime("");

        setFare("");

        setError("");

    };


    const handleClose = () => {

        resetForm();
        close();

    };


    const saveSchedule = async () => {

        setError("");

        if (
            !busId ||
            !routeId ||
            !journeyDate ||
            !departureDate ||
            !departureTime ||
            !arrivalDate ||
            !arrivalTime ||
            !fare
        ) {

            setError(
                "Please fill all the fields."
            );

            return;

        }


        const departureDateTime =
            `${departureDate}T${departureTime}`;

        const arrivalDateTime =
            `${arrivalDate}T${arrivalTime}`;


        if (
            new Date(arrivalDateTime) <=
            new Date(departureDateTime)
        ) {

            setError(
                "Arrival date and time must be after departure date and time."
            );

            return;

        }


        if (new Date(departureDate) <
            new Date(journeyDate)) {

            setError(
                "Departure date cannot be before journey date."
            );

            return;

        }


        const scheduleData = {

            busId: Number(busId),

            routeId: Number(routeId),

            journeyDate: journeyDate,

            departureDateTime:
                departureDateTime,

            arrivalDateTime:
                arrivalDateTime,

            fare: Number(fare)

        };


        try {

            setLoading(true);

            console.log(
                "Creating schedule:",
                scheduleData
            );

            await BusScheduleService.addSchedule(
                scheduleData
            );

            if (onScheduleAdded) {

                await onScheduleAdded();

            }

            handleClose();

        }
        catch (error) {

            console.error(
                "Create schedule error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create schedule."
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (!show) {
        return null;
    }


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content border-0 shadow-lg rounded-4">

                    {/* HEADER */}

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-calendar-plus-fill text-primary fs-4"></i>

                                <h5 className="modal-title fw-bold mb-0">

                                    Create Schedule

                                </h5>

                            </div>

                            <small className="text-muted">

                                Create a new journey schedule for your bus.

                            </small>

                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                        ></button>

                    </div>


                    {/* BODY */}

                    <div className="modal-body">

                        {error && (

                            <div className="alert alert-danger">

                                <i className="bi bi-exclamation-circle me-2"></i>

                                {error}

                            </div>

                        )}


                        {loadingData ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <div className="text-muted mt-2">

                                    Loading buses and routes...

                                </div>

                            </div>

                        ) : (

                            <div className="row g-3">

                                {/* BUS */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Bus

                                    </label>

                                    <select
                                        className="form-select"
                                        value={busId}
                                        onChange={(e) =>
                                            setBusId(e.target.value)
                                        }
                                    >

                                        <option value="">

                                            Select Bus

                                        </option>

                                        {buses
                                            .filter(
                                                bus =>
                                                    bus.busStatus ===
                                                    "ACTIVE"
                                            )
                                            .map(bus => (

                                                <option
                                                    key={bus.busId}
                                                    value={bus.busId}
                                                >

                                                    {bus.busName}
                                                    {" - "}
                                                    {bus.busNumber}

                                                </option>

                                            ))}

                                    </select>

                                </div>


                                {/* ROUTE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Route

                                    </label>

                                    <select
                                        className="form-select"
                                        value={routeId}
                                        onChange={(e) =>
                                            setRouteId(e.target.value)
                                        }
                                    >

                                        <option value="">

                                            Select Route

                                        </option>

                                        {routes.map(route => (

                                            <option
                                                key={route.routeId}
                                                value={route.routeId}
                                            >

                                                {route.originCity}
                                                {" → "}
                                                {route.destinationCity}

                                            </option>

                                        ))}

                                    </select>

                                </div>


                                {/* JOURNEY DATE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Journey Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={journeyDate}
                                        onChange={(e) =>
                                            setJourneyDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* FARE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Fare

                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">

                                            ₹

                                        </span>

                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            value={fare}
                                            onChange={(e) =>
                                                setFare(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                {/* DEPARTURE DATE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Departure Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={departureDate}
                                        onChange={(e) =>
                                            setDepartureDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* DEPARTURE TIME */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Departure Time

                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        value={departureTime}
                                        onChange={(e) =>
                                            setDepartureTime(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ARRIVAL DATE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Arrival Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={arrivalDate}
                                        onChange={(e) =>
                                            setArrivalDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ARRIVAL TIME */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Arrival Time

                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        value={arrivalTime}
                                        onChange={(e) =>
                                            setArrivalTime(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        )}

                    </div>


                    {/* FOOTER */}

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={handleClose}
                            disabled={loading}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={saveSchedule}
                            disabled={
                                loading ||
                                loadingData
                            }
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Creating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-calendar-check me-2"></i>

                                    Create Schedule

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddScheduleModal;