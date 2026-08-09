import { useEffect, useState } from "react";
import BusService from "../../services/BusService";
import RouteService from "../../services/RouteService";
import BusScheduleService from "../../services/BusScheduleService";

function UpdateScheduleModal({
    show,
    schedule,
    close,
    onScheduleUpdated
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

        if (show && schedule) {

            loadData();

            setBusId(
                schedule.busId || ""
            );

            setRouteId(
                schedule.routeId || ""
            );

            setJourneyDate(
                schedule.journeyDate || ""
            );


            if (schedule.departureDateTime) {

                const departure =
                    schedule.departureDateTime;

                setDepartureDate(
                    departure.substring(0, 10)
                );

                setDepartureTime(
                    departure.substring(11, 16)
                );

            }


            if (schedule.arrivalDateTime) {

                const arrival =
                    schedule.arrivalDateTime;

                setArrivalDate(
                    arrival.substring(0, 10)
                );

                setArrivalTime(
                    arrival.substring(11, 16)
                );

            }


            setFare(
                schedule.fare || ""
            );

        }

    }, [show, schedule]);


    const loadData = async () => {

        try {

            setLoadingData(true);

            const [
                busResponse,
                routeResponse
            ] = await Promise.all([

                BusService.getOwnBuses(),

                RouteService.getAllRoutes()

            ]);

            setBuses(
                busResponse.data
            );

            setRoutes(
                routeResponse.data
            );

        }
        catch (error) {

            console.error(
                "Loading update data failed:",
                error
            );

            setError(
                "Unable to load buses and routes."
            );

        }
        finally {

            setLoadingData(false);

        }

    };


    const updateSchedule = async () => {

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
                "Arrival must be after departure."
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

            await BusScheduleService.updateSchedule(
                schedule.busScheduleId,
                scheduleData
            );

            if (onScheduleUpdated) {

                await onScheduleUpdated();

            }

            close();

        }
        catch (error) {

            console.error(
                "Update schedule error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update schedule."
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (!show || !schedule) {

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

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-pencil-square text-primary fs-4"></i>

                                <h5 className="modal-title fw-bold mb-0">

                                    Update Schedule

                                </h5>

                            </div>

                            <small className="text-muted">

                                Update journey information.

                            </small>

                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                        ></button>

                    </div>


                    <div className="modal-body">

                        {error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )}


                        {loadingData ? (

                            <div className="text-center py-5">

                                <div className="spinner-border text-primary"></div>

                                <p className="text-muted mt-2 mb-0">

                                    Loading...

                                </p>

                            </div>

                        ) : (

                            <div className="row g-3">

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


                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={close}
                            disabled={loading}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={updateSchedule}
                            disabled={
                                loading ||
                                loadingData
                            }
                        >

                            {loading ? (

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Updating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Update Schedule

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UpdateScheduleModal;