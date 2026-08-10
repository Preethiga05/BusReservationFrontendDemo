import { useState } from "react";
import { amenityIcons } from "../../utils/amenityIcons";
import { useNavigate } from "react-router";

function BusCard({ bus }) {

    const navigate = useNavigate();

    const departureDate =
        new Date(bus.departureDateTime);

    const arrivalDate =
        new Date(bus.arrivalDateTime);

    const [activeSection, setActiveSection] =
        useState(null);

    const departureTime =
        departureDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    const arrivalTime =
        arrivalDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    const departureDay =
        departureDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        });

    const arrivalDay =
        arrivalDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        });

    return (

        <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">

            {/* Main Row */}

            <div className="row align-items-center g-4">

                {/* Bus Info */}

                <div className="col-xl-3 col-lg-12">

                    <div className="d-flex align-items-center gap-3">

                        <div
                            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "75px",
                                height: "75px"
                            }}
                        >

                            <i className="bi bi-bus-front-fill fs-1"></i>

                        </div>

                        <div>

                            <h4 className="fw-bold mb-1">

                                {bus.busName}

                            </h4>

                            <p className="text-secondary mb-2">

                                {bus.busOperator}

                            </p>

                            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">

                                {bus.busType.replaceAll("_", " ")}

                            </span>

                        </div>

                    </div>

                </div>


                {/* Journey */}

                <div className="col-xl-4 col-lg-6">

                    <div className="row align-items-center text-center">

                        <div className="col-3">

                            <h3 className="fw-bold mb-1">

                                {departureTime}

                            </h3>

                            <small className="text-secondary">

                                {departureDay}

                            </small>

                        </div>


                        <div className="col-6">

                            <p className="fw-bold text-secondary mb-2">

                                {bus.journeyDuration}

                            </p>

                            <div className="d-flex align-items-center">

                                <div className="flex-grow-1 border-top border-primary border-2"></div>

                                <i className="bi bi-arrow-right text-primary fs-4 mx-2"></i>

                                <div className="flex-grow-1 border-top border-primary border-2"></div>

                            </div>

                        </div>


                        <div className="col-3">

                            <h3 className="fw-bold mb-1">

                                {arrivalTime}

                            </h3>

                            <small className="text-secondary">

                                {arrivalDay}

                            </small>

                        </div>

                    </div>

                </div>


                {/* Fare */}

                <div className="col-xl-2 col-lg-2 text-center">

                    <small className="text-secondary d-block">

                        Starting From

                    </small>

                    <h3 className="text-success fw-bold mb-0">

                        ₹ {bus.fare}

                    </h3>

                </div>


                {/* Seats */}

                <div className="col-xl-1 col-lg-2 text-center">

                    <h4 className="text-primary fw-bold mb-0">

                        {bus.availableSeats}

                    </h4>

                    <small className="text-secondary">

                        Seats Left

                    </small>

                </div>


                {/* Button */}

                <div className="col-xl-2 col-lg-2 text-center">

                    <button

                        className="btn btn-primary rounded-pill px-4 py-3 fw-semibold"

                        onClick={() =>
                            navigate(
                                "/seat-selection",
                                {
                                    state: {
                                        bus
                                    }
                                }
                            )
                        }

                    >

                        View Seats

                    </button>

                </div>

            </div>


            <hr className="my-4" />


            {/* Footer */}

            <div className="row g-3">

                {/* Reviews */}

                <div className="col-md-6">

                    <div

                        className={`d-flex justify-content-between align-items-center p-3 rounded-3 border ${
                            activeSection === "reviews"
                                ? "border-primary bg-primary bg-opacity-10"
                                : "bg-light"
                        }`}

                        onClick={() =>
                            setActiveSection(
                                activeSection === "reviews"
                                    ? null
                                    : "reviews"
                            )
                        }

                        style={{
                            cursor: "pointer"
                        }}

                    >

                        <div className="d-flex align-items-center gap-2">

                            <i className="bi bi-star-fill text-success fs-5"></i>

                            <span className="fw-semibold">

                                Reviews

                            </span>

                        </div>

                        <i
                            className={`bi ${
                                activeSection === "reviews"
                                    ? "bi-chevron-up"
                                    : "bi-chevron-down"
                            } text-primary`}
                        ></i>

                    </div>

                </div>


                {/* Amenities */}

                <div className="col-md-6">

                    <div

                        className={`d-flex justify-content-between align-items-center p-3 rounded-3 border ${
                            activeSection === "amenities"
                                ? "border-primary bg-primary bg-opacity-10"
                                : "bg-light"
                        }`}

                        onClick={() =>
                            setActiveSection(
                                activeSection === "amenities"
                                    ? null
                                    : "amenities"
                            )
                        }

                        style={{
                            cursor: "pointer"
                        }}

                    >

                        <div className="d-flex align-items-center gap-2">

                            <i className="bi bi-gift-fill text-success fs-5"></i>

                            <span className="fw-semibold">

                                Amenities

                            </span>

                        </div>

                        <i
                            className={`bi ${
                                activeSection === "amenities"
                                    ? "bi-chevron-up"
                                    : "bi-chevron-down"
                            } text-primary`}
                        ></i>

                    </div>

                </div>

            </div>


            {/* Reviews Panel */}

            {
                activeSection === "reviews" && (

                    <div className="bg-light border rounded-3 p-4 mt-3 text-center">

                        <i className="bi bi-chat-square-text text-secondary fs-1"></i>

                        <h5 className="fw-semibold mt-3">

                            No Reviews Yet

                        </h5>

                        <p className="text-secondary mb-0">

                            Be the first passenger to review this journey.

                        </p>

                    </div>

                )
            }


            {/* Amenities Panel */}

            {
                activeSection === "amenities" && (

                    <div className="bg-light border rounded-3 p-4 mt-3">

                        {

                            bus.amenities.length > 0

                                ?

                                <div className="d-flex flex-wrap gap-3">

                                    {

                                        bus.amenities.map(
                                            (amenity, index) => (

                                                <div
                                                    key={index}
                                                    className="bg-white border rounded-3 px-3 py-2 d-flex align-items-center gap-2 shadow-sm"
                                                >

                                                    <i
                                                        className={`bi ${
                                                            amenityIcons[amenity]
                                                                || "bi-check-circle-fill"
                                                        } text-primary`}
                                                    ></i>

                                                    <span className="fw-semibold">

                                                        {amenity}

                                                    </span>

                                                </div>

                                            )
                                        )

                                    }

                                </div>

                                :

                                <div className="text-center">

                                    <i className="bi bi-gift text-secondary fs-1"></i>

                                    <h5 className="fw-semibold mt-3">

                                        No Amenities Available

                                    </h5>

                                    <p className="text-secondary mb-0">

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