import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SeatGrid from "../components/Seats/SeatGrid";
import FareSummary from "../components/Seats/FareSummary";
import SeatLegend from "../components/Seats/SeatLegend";

import SeatService from "../services/SeatService";

import "../css/SeatSelectionPage.css";

import { useDispatch, useSelector } from "react-redux"
import { clearSeats } from "../actions/SeatAction"

function SeatSelectionPage() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const bus = state?.bus;

    const [seats, setSeats] = useState([]);

const dispatch = useDispatch();

const selectedSeats = useSelector(
    state => state.seat.selectedSeats
);

   useEffect(() => {

    if (!bus) {

        navigate("/search-results");

        return;

    }

    dispatch(clearSeats());

    loadSeats();

}, []);

    async function loadSeats() {

        try {

            const response = await SeatService.getByBus(bus.busId);

            setSeats(response.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    function formatTime(dateTime) {

        return new Date(dateTime).toLocaleTimeString(

            [],

            {

                hour: "2-digit",

                minute: "2-digit"

            }

        );

    }

    return (

        <div className="seat-selection-page">

            <div className="seat-page-container">

                <button

                    className="back-btn"

                    onClick={() => navigate(-1)}

                >

                    <i className="bi bi-arrow-left"></i>

                    Back

                </button>

                <div className="bus-info-card">

                    <div className="bus-header">

                        <div>

                            <h2>{bus.busName}</h2>

                            <p>{bus.busOperator}</p>

                            <span className="bus-type-badge">

                                {bus.busType.replaceAll("_", " ")}

                            </span>

                        </div>

                        <div className="fare-details">

                            <h2>

                                ₹ {bus.fare}

                            </h2>

                            <p>

                                {

                                    bus.availableSeats

                                }

                                {" "}Seats Available

                            </p>

                        </div>

                    </div>
                    <div className="journey-card">

                        <div className="journey-time">

                            <h3>{formatTime(bus.departureDateTime)}</h3>

                            <h5>{bus.source}</h5>

                            <span>Departure</span>

                        </div>

                        <div className="journey-route">

                            <div className="route-line">

                                <span className="route-dot left"></span>

                                <div className="route-icon">

                                    <i className="bi bi-bus-front-fill"></i>

                                </div>

                                <span className="route-dot right"></span>

                            </div>

                            <div className="journey-duration">

                                <i className="bi bi-clock-history me-2"></i>

                                {bus.journeyDuration}

                            </div>

                        </div>

                        <div className="journey-time">

                            <h3>{formatTime(bus.arrivalDateTime)}</h3>

                            <h5>{bus.destination}</h5>

                            <span>Arrival</span>

                        </div>

                    </div>

                </div>

                {/* ==========================
                    Seat Section
                ========================== */}

                <div className="seat-layout">

                    <div className="seat-layout-left">

                        <div className="seat-card">

                            <div className="seat-card-header">

                                <h3>

                                    <i className="bi bi-grid-3x3-gap-fill me-2"></i>

                                    Select Your Seats

                                </h3>

                            </div>

                            <div className="seat-card-body">

                                <SeatLegend />

                                <SeatGrid

                                    busType={bus.busType}

                                    seats={seats}

                                />

                            </div>

                        </div>

                    </div>

                    <div className="seat-layout-right">

                        <FareSummary

                            bus={bus}

                        />

                    </div>

                </div>
                {/* ==========================
                    End Layout
                ========================== */}

            </div>

        </div>

    );

}

export default SeatSelectionPage;