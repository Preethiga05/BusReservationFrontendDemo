import { useEffect, useState } from "react";
import "./BusOperatorCss/UpdateScheduleModal.css";

function UpdateScheduleModal({

    show,

    schedule,

    close

}) {

    const [bus, setBus] = useState("");

    const [route, setRoute] = useState("");

    const [journeyDate, setJourneyDate] = useState("");

    const [departureTime, setDepartureTime] = useState("");

    const [arrivalTime, setArrivalTime] = useState("");

    const [fare, setFare] = useState("");

    useEffect(() => {

        if (schedule) {

            setBus(schedule.busName);

            setRoute(schedule.route);

            setJourneyDate(schedule.journeyDate);

            setDepartureTime(schedule.departure);

            setArrivalTime(schedule.arrival);

            setFare(schedule.fare);

        }

    }, [schedule]);

    if (!show || !schedule) return null;

    const updateSchedule = () => {

        console.log({

            scheduleId: schedule.scheduleId,

            bus,

            route,

            journeyDate,

            departureTime,

            arrivalTime,

            fare

        });

        close();

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

                        <i className="bi bi-pencil-square"></i>

                    </div>

                    <h3>

                        Update Schedule

                    </h3>

                    <p>

                        Modify the journey schedule.

                    </p>

                </div>

                <div className="row mt-4">

                    <div className="col-md-6 mb-3">

                        <label>

                            Bus

                        </label>

                        <select

                            className="form-select"

                            value={bus}

                            onChange={(e) => setBus(e.target.value)}

                        >

                            <option>KPN Express</option>

                            <option>Sai Travels</option>

                            <option>GreenLine</option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Route

                        </label>

                        <select

                            className="form-select"

                            value={route}

                            onChange={(e) => setRoute(e.target.value)}

                        >

                            <option>Chennai → Madurai</option>

                            <option>Salem → Bangalore</option>

                            <option>Coimbatore → Chennai</option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Journey Date

                        </label>

                        <input

                            type="date"

                            className="form-control"

                            value={journeyDate}

                            onChange={(e) => setJourneyDate(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Fare

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            value={fare}

                            onChange={(e) => setFare(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6">

                        <label>

                            Departure Time

                        </label>

                        <input

                            type="time"

                            className="form-control"

                            value={departureTime}

                            onChange={(e) => setDepartureTime(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6">

                        <label>

                            Arrival Time

                        </label>

                        <input

                            type="time"

                            className="form-control"

                            value={arrivalTime}

                            onChange={(e) => setArrivalTime(e.target.value)}

                        />

                    </div>

                </div>

                <div className="modal-footer mt-4">

                    <button

                        className="btn btn-secondary"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-warning"

                        onClick={updateSchedule}

                    >

                        Update Schedule

                    </button>

                </div>

            </div>

        </div>

    );

}

export default UpdateScheduleModal;