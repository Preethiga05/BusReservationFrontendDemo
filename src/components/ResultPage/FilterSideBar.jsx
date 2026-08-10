import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FilterSidebar({

    selectedPriceRange,
    setSelectedPriceRange,

    selectedBusTypes,
    setSelectedBusTypes,

    selectedDepartureTimes,
    setSelectedDepartureTimes,

    selectedArrivalTimes,
    setSelectedArrivalTimes,

    selectedOperators,
    setSelectedOperators,

    operatorOptions,

    amenities,

    selectedAmenities,
    setSelectedAmenities,

    applyFilters

}) {

    const [activeFilter, setActiveFilter] = useState(null);

    const toggleFilter = (filter) => {

        if (activeFilter === filter) {

            setActiveFilter(null);

        }

        else {

            setActiveFilter(filter);

        }

    };


    const handleBusType = (type) => {

        if (selectedBusTypes.includes(type)) {

            setSelectedBusTypes(

                selectedBusTypes.filter(

                    busType => busType !== type

                )

            );

        }

        else {

            setSelectedBusTypes(

                [...selectedBusTypes, type]

            );

        }

    };


    const handleDepartureTime = (value) => {

        if (selectedDepartureTimes.includes(value)) {

            setSelectedDepartureTimes(

                selectedDepartureTimes.filter(

                    departure => departure !== value

                )

            );

        }

        else {

            setSelectedDepartureTimes(

                [...selectedDepartureTimes, value]

            );

        }

    };


    const handleArrivalTime = (value) => {

        if (selectedArrivalTimes.includes(value)) {

            setSelectedArrivalTimes(

                selectedArrivalTimes.filter(

                    arrival => arrival !== value

                )

            );

        }

        else {

            setSelectedArrivalTimes(

                [...selectedArrivalTimes, value]

            );

        }

    };


    const handleOperator = (operator) => {

        if (selectedOperators.includes(operator)) {

            setSelectedOperators(

                selectedOperators.filter(

                    value => value !== operator

                )

            );

        }

        else {

            setSelectedOperators(

                [...selectedOperators, operator]

            );

        }

    };


    const handleAmenity = (amenityId) => {

        if (selectedAmenities.includes(amenityId)) {

            setSelectedAmenities(

                selectedAmenities.filter(

                    id => id !== amenityId

                )

            );

        }

        else {

            setSelectedAmenities(

                [...selectedAmenities, amenityId]

            );

        }

    };


    const departureOptions = [

        {
            label: "Morning",
            time: "06:00 AM - 12:00 PM",
            value: "MORNING",
            icon: "bi-brightness-high-fill"
        },

        {
            label: "Afternoon",
            time: "12:00 PM - 06:00 PM",
            value: "AFTERNOON",
            icon: "bi-brightness-alt-high-fill"
        },

        {
            label: "Evening",
            time: "06:00 PM - 12:00 AM",
            value: "EVENING",
            icon: "bi-moon-stars-fill"
        },

        {
            label: "Midnight",
            time: "12:00 AM - 06:00 AM",
            value: "MIDNIGHT",
            icon: "bi-moon-fill"
        }

    ];


    const arrivalOptions = [

        {
            label: "Morning",
            time: "06:00 AM - 12:00 PM",
            value: "MORNING",
            icon: "bi-brightness-high-fill"
        },

        {
            label: "Afternoon",
            time: "12:00 PM - 06:00 PM",
            value: "AFTERNOON",
            icon: "bi-brightness-alt-high-fill"
        },

        {
            label: "Evening",
            time: "06:00 PM - 12:00 AM",
            value: "EVENING",
            icon: "bi-moon-stars-fill"
        },

        {
            label: "Midnight",
            time: "12:00 AM - 06:00 AM",
            value: "MIDNIGHT",
            icon: "bi-moon-fill"
        }

    ];


    return (

        <div className="bg-white border border-primary-subtle rounded-4 p-4 shadow-sm">

            {/* Filter Title */}

            <h3 className="d-flex justify-content-center align-items-center gap-2 text-primary fw-bold fs-3 mb-4 pb-3 border-bottom">

                <i className="bi bi-funnel-fill"></i>

                FILTERS

            </h3>


            {/* ================= PRICE ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("price")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-currency-rupee text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Price

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "price"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "price" &&

                    <div className="border-top bg-light p-3">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <span className="bg-primary-subtle text-primary px-3 py-2 rounded-3 fw-semibold">

                                ₹{selectedPriceRange[0]}

                            </span>

                            <span className="bg-primary-subtle text-primary px-3 py-2 rounded-3 fw-semibold">

                                ₹{selectedPriceRange[1]}

                            </span>

                        </div>


                        <Slider

                            range

                            min={0}

                            max={5000}

                            step={50}

                            value={selectedPriceRange}

                            onChange={(value) =>
                                setSelectedPriceRange(value)
                            }

                        />

                    </div>

                }

            </div>


            {/* ================= BUS TYPE ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("busType")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-bus-front-fill text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Bus Type

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "busType"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "busType" &&

                    <div className="border-top bg-light p-3">

                        <div className="d-flex flex-wrap gap-2">

                            <button
                                type="button"
                                className={`btn rounded-pill ${
                                    selectedBusTypes.includes("SLEEPER_AC")
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() =>
                                    handleBusType("SLEEPER_AC")
                                }
                            >

                                <i className="bi bi-moon-stars-fill me-2"></i>

                                Sleeper AC

                            </button>


                            <button
                                type="button"
                                className={`btn rounded-pill ${
                                    selectedBusTypes.includes("SLEEPER_NON_AC")
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() =>
                                    handleBusType("SLEEPER_NON_AC")
                                }
                            >

                                <i className="bi bi-moon me-2"></i>

                                Sleeper Non AC

                            </button>


                            <button
                                type="button"
                                className={`btn rounded-pill ${
                                    selectedBusTypes.includes("SEATER_AC")
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() =>
                                    handleBusType("SEATER_AC")
                                }
                            >

                                <i className="bi bi-person-fill me-2"></i>

                                Seater AC

                            </button>


                            <button
                                type="button"
                                className={`btn rounded-pill ${
                                    selectedBusTypes.includes("SEATER_NON_AC")
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() =>
                                    handleBusType("SEATER_NON_AC")
                                }
                            >

                                <i className="bi bi-person me-2"></i>

                                Seater Non AC

                            </button>

                        </div>

                    </div>

                }

            </div>


            {/* ================= DEPARTURE ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("departure")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-clock-fill text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Departure Time

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "departure"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "departure" &&

                    <div className="border-top bg-light p-3">

                        <div className="row g-2">

                            {

                                departureOptions.map(option => (

                                    <div
                                        className="col-6"
                                        key={option.value}
                                    >

                                        <button

                                            type="button"

                                            className={`btn w-100 h-100 py-3 ${
                                                selectedDepartureTimes.includes(option.value)
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                            }`}

                                            onClick={() =>
                                                handleDepartureTime(
                                                    option.value
                                                )
                                            }

                                        >

                                            <i
                                                className={`bi ${option.icon} d-block fs-4 mb-2`}
                                            ></i>

                                            <strong className="d-block">

                                                {option.label}

                                            </strong>

                                            <small>

                                                {option.time}

                                            </small>

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>


            {/* ================= ARRIVAL ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("arrival")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-clock-history text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Arrival Time

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "arrival"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "arrival" &&

                    <div className="border-top bg-light p-3">

                        <div className="row g-2">

                            {

                                arrivalOptions.map(option => (

                                    <div
                                        className="col-6"
                                        key={option.value}
                                    >

                                        <button

                                            type="button"

                                            className={`btn w-100 h-100 py-3 ${
                                                selectedArrivalTimes.includes(option.value)
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                            }`}

                                            onClick={() =>
                                                handleArrivalTime(
                                                    option.value
                                                )
                                            }

                                        >

                                            <i
                                                className={`bi ${option.icon} d-block fs-4 mb-2`}
                                            ></i>

                                            <strong className="d-block">

                                                {option.label}

                                            </strong>

                                            <small>

                                                {option.time}

                                            </small>

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>


            {/* ================= OPERATOR ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("operator")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-buildings-fill text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Bus Operator

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "operator"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "operator" &&

                    <div className="border-top bg-light p-3">

                        <div className="d-flex flex-wrap gap-2">

                            {

                                operatorOptions.map(operator => (

                                    <button

                                        key={operator}

                                        type="button"

                                        className={`btn rounded-pill ${
                                            selectedOperators.includes(operator)
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}

                                        onClick={() =>
                                            handleOperator(operator)
                                        }

                                    >

                                        <i className="bi bi-buildings-fill me-2"></i>

                                        {operator}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>


            {/* ================= AMENITIES ================= */}

            <div className="border rounded-3 overflow-hidden mb-3">

                <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFilter("amenities")}
                >

                    <div className="d-flex align-items-center gap-3">

                        <i className="bi bi-gift-fill text-primary fs-5"></i>

                        <span className="fw-semibold fs-5">

                            Amenities

                        </span>

                    </div>

                    <i
                        className={`bi ${
                            activeFilter === "amenities"
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                        } text-primary`}
                    ></i>

                </div>


                {

                    activeFilter === "amenities" &&

                    <div className="border-top bg-light p-3">

                        <div className="d-flex flex-wrap gap-2">

                            {

                                amenities.map((amenity) => (

                                    <button

                                        key={amenity.amenityId}

                                        type="button"

                                        className={`btn rounded-pill ${
                                            selectedAmenities.includes(
                                                amenity.amenityId
                                            )
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}

                                        onClick={() =>
                                            handleAmenity(
                                                amenity.amenityId
                                            )
                                        }

                                    >

                                        <i className="bi bi-gift-fill me-2"></i>

                                        {amenity.amenityName}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>


            {/* ================= APPLY ================= */}

            <button

                className="btn btn-primary w-100 py-3 fw-semibold fs-5 mb-2"

                onClick={applyFilters}

            >

                <i className="bi bi-funnel-fill me-2"></i>

                Apply Filters

            </button>


            {/* ================= CLEAR ================= */}

            <button

                className="btn btn-outline-primary w-100 py-3 fw-semibold fs-5"

                onClick={() => {

                    setSelectedPriceRange([0, 5000]);

                    setSelectedBusTypes([]);

                    setSelectedDepartureTimes([]);

                    setSelectedArrivalTimes([]);

                    setSelectedOperators([]);

                    setSelectedAmenities([]);

                    setTimeout(() => {

                        applyFilters();

                    }, 0);

                }}

            >

                <i className="bi bi-arrow-clockwise me-2"></i>

                Clear Filters

            </button>

        </div>

    );

}

export default FilterSidebar;