import "./ResultPageCss/BusCard.css";
import { useState } from "react";
import { amenityIcons } from "../../utils/amenityIcons";
import { useNavigate } from "react-router";

function BusCard({ bus }) {
    const navigate = useNavigate();
    const departureDate = new Date(bus.departureDateTime);
    const arrivalDate = new Date(bus.arrivalDateTime);
    const [activeSection, setActiveSection] = useState(null);

    const departureTime = departureDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const arrivalTime = arrivalDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const departureDay = departureDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });

    const arrivalDay = arrivalDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
    });


    return (

        <div className="bus-card">

            <div className="bus-main-row">

                {/* Bus Info */}

                <div className="bus-info">

                    <div className="bus-logo">

                        <i className="bi bi-bus-front-fill"></i>

                    </div>

                    <div>

                        <h4>{bus.busName}</h4>

                        <p>{bus.busOperator}</p>

                        <span className="bus-type">

                            {bus.busType.replaceAll("_", " ")}

                        </span>

                    </div>

                </div>

                {/* Journey */}

                <div className="journey-info">

                    <div>

                        <h3>{departureTime}</h3>

                        <small>{departureDay}</small>

                    </div>

                    <div className="journey-middle">

                        <p>{bus.journeyDuration}</p>

                        <div className="journey-line">

                        </div>

                    </div>

                    <div>

                        <h3>{arrivalTime}</h3>

                        <small>{arrivalDay}</small>

                    </div>

                </div>

                {/* Fare */}

                <div className="fare-info">

                    <small>Starting From</small>

                    <h3>₹ {bus.fare}</h3>

                </div>

                {/* Seats */}

                <div className="seat-info">

                    <h4>{bus.availableSeats}</h4>

                    <small>Seats Left</small>

                </div>

                {/* Button */}

                <div className="button-info">

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/seat-selection", {
                                state: {
                                    bus
                                }
                            })
                        }
                    >
                        View Seats
                    </button>

                </div>

            </div>
            <hr className="bus-divider" />

            <div className="bus-footer">

                <div
                    className="footer-item"
                    onClick={() =>
                        setActiveSection(
                            activeSection === "reviews"
                                ? null
                                : "reviews"
                        )
                    }
                >

                    <div className="footer-left">

                        <i className="bi bi-star-fill"></i>

                        <span>Reviews</span>

                    </div>

                    <i
                        className={`bi ${activeSection === "reviews"
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                            }`}
                    ></i>

                </div>

                <div
                    className="footer-item"
                    onClick={() =>
                        setActiveSection(
                            activeSection === "amenities"
                                ? null
                                : "amenities"
                        )
                    }
                >

                    <div className="footer-left">

                        <i className="bi bi-gift-fill"></i>

                        <span>Amenities</span>

                    </div>

                    <i
                        className={`bi ${activeSection === "amenities"
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                            }`}
                    ></i>

                </div>

            </div>

            {
                activeSection === "reviews" && (

                    <div className="expand-panel">

                        <div className="empty-content">

                            <i className="bi bi-chat-square-text"></i>

                            <h5>No Reviews Yet</h5>

                            <p>

                                Be the first passenger to review this journey.

                            </p>

                        </div>

                    </div>

                )
            }

            {
                activeSection === "amenities" && (

                    <div className="expand-panel">

                        {

                            bus.amenities.length > 0

                                ?

                                <div className="amenities-grid">

                                    {

                                        bus.amenities.map((amenity, index) => (

                                            <div
                                                key={index}
                                                className="amenity-card"
                                            >

                                                <i
                                                    className={`bi ${amenityIcons[amenity] || "bi-check-circle-fill"}`}
                                                ></i>

                                                <span>{amenity}</span>

                                            </div>

                                        ))

                                    }

                                </div>

                                :

                                <div className="empty-content">

                                    <i className="bi bi-gift"></i>

                                    <h5>No Amenities Available</h5>

                                    <p>

                                        No amenities have been added for this bus.

                                    </p>

                                </div>

                        }

                    </div>

                )
            }

        </div>

    );

}

export default BusCard;