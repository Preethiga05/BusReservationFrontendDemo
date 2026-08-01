import { useState } from "react";
import "./ResultPageCss/FilterSidebar.css";
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

    }
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

    }
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

    }

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

    }
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

    }
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

    }

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

console.log("Amenities:", amenities);

    return (

        <div className="filter-sidebar">

            <h3 className="filter-title">

                <i className="bi bi-funnel-fill"></i>

                FILTERS

            </h3>

            {/* Price */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("price")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-currency-rupee"></i>

                        <span>Price</span>

                    </div>

                    <i className={`bi ${activeFilter === "price" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>

                </div>

                {

                    activeFilter === "price" &&

                    <div className="filter-body">

                        <div className="price-filter">

                            <div className="price-values">

                                <span>

                                    ₹{selectedPriceRange[0]}

                                </span>

                                <span>

                                    ₹{selectedPriceRange[1]}

                                </span>

                            </div>

                            <Slider

                                range

                                min={0}

                                max={5000}

                                step={50}

                                value={selectedPriceRange}

                                onChange={(value) => setSelectedPriceRange(value)}

                            />


                        </div>

                    </div>

                }

            </div>

            {/* Bus Type */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("busType")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-bus-front-fill"></i>

                        <span>Bus Type</span>

                    </div>

                    <i
                        className={`bi ${activeFilter === "busType"
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                            }`}
                    ></i>

                </div>

                {

                    activeFilter === "busType" &&

                    <div className="filter-body">

                        <div className="chip-group">

                            <button
                                type="button"
                                className={`filter-chip ${selectedBusTypes.includes("SLEEPER_AC")
                                    ? "selected-chip"
                                    : ""
                                    }`}
                                onClick={() => handleBusType("SLEEPER_AC")}
                            >

                                <i className="bi bi-moon-stars-fill"></i>

                                Sleeper AC

                            </button>

                            <button
                                type="button"
                                className={`filter-chip ${selectedBusTypes.includes("SLEEPER_NON_AC")
                                    ? "selected-chip"
                                    : ""
                                    }`}
                                onClick={() => handleBusType("SLEEPER_NON_AC")}
                            >

                                <i className="bi bi-moon"></i>

                                Sleeper Non AC

                            </button>

                            <button
                                type="button"
                                className={`filter-chip ${selectedBusTypes.includes("SEATER_AC")
                                    ? "selected-chip"
                                    : ""
                                    }`}
                                onClick={() => handleBusType("SEATER_AC")}
                            >

                                <i className="bi bi-person-fill"></i>

                                Seater AC

                            </button>

                            <button
                                type="button"
                                className={`filter-chip ${selectedBusTypes.includes("SEATER_NON_AC")
                                    ? "selected-chip"
                                    : ""
                                    }`}
                                onClick={() => handleBusType("SEATER_NON_AC")}
                            >

                                <i className="bi bi-person"></i>

                                Seater Non AC

                            </button>

                        </div>

                    </div>

                }

            </div>

            {/* Departure */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("departure")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-clock-fill"></i>

                        <span>Departure Time</span>

                    </div>

                    <i className={`bi ${activeFilter === "departure" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>

                </div>

                {

                    activeFilter === "departure" &&

                    <div className="filter-body">

                        <div className="time-card-group">

                            {

                                departureOptions.map(option => (

                                    <button

                                        key={option.value}

                                        type="button"

                                        className={`time-card ${selectedDepartureTimes.includes(option.value)
                                            ? "selected-time-card"
                                            : ""
                                            }`}

                                        onClick={() => handleDepartureTime(option.value)}

                                    >

                                        <i className={`bi ${option.icon}`}></i>

                                        <h5>{option.label}</h5>

                                        <small>{option.time}</small>

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>

            {/* Arrival */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("arrival")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-clock-history"></i>

                        <span>Arrival Time</span>

                    </div>

                    <i className={`bi ${activeFilter === "arrival" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>

                </div>

                {

                    activeFilter === "arrival" &&

                    <div className="filter-body">

                        <div className="time-card-group">

                            {

                                arrivalOptions.map(option => (

                                    <button

                                        key={option.value}

                                        type="button"

                                        className={`time-card ${selectedArrivalTimes.includes(option.value)
                                            ? "selected-time-card"
                                            : ""
                                            }`}

                                        onClick={() => handleArrivalTime(option.value)}

                                    >

                                        <i className={`bi ${option.icon}`}></i>

                                        <h5>{option.label}</h5>

                                        <small>{option.time}</small>

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>

            {/* Operator */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("operator")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-buildings-fill"></i>

                        <span>Bus Operator</span>

                    </div>

                    <i className={`bi ${activeFilter === "operator" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>

                </div>

                {

                    activeFilter === "operator" &&

                    <div className="filter-body">

                        <div className="chip-group">

                            {

                                operatorOptions.map(operator => (

                                    <button

                                        key={operator}

                                        type="button"

                                        className={`filter-chip ${selectedOperators.includes(operator)

                                            ? "selected-chip"

                                            : ""

                                            }`}

                                        onClick={() => handleOperator(operator)}

                                    >

                                        <i className="bi bi-buildings-fill"></i>

                                        {operator}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                }

            </div>

            {/* Amenities */}

            <div className="filter-card">

                <div
                    className="filter-header"
                    onClick={() => toggleFilter("amenities")}
                >

                    <div className="filter-heading">

                        <i className="bi bi-gift-fill"></i>

                        <span>Amenities</span>

                    </div>

                    <i className={`bi ${activeFilter === "amenities" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>

                </div>

                {

                    activeFilter === "amenities" &&

                    <div className="filter-body">

                        <div className="chip-group">

                            {amenities.map((amenity) => (

                                <button
                                    key={amenity.amenityId}
                                    type="button"
                                    className={`filter-chip ${selectedAmenities.includes(amenity.amenityId)
                                            ? "selected-chip"
                                            : ""
                                        }`}
                                    onClick={() => handleAmenity(amenity.amenityId)}
                                >
                                    <i className="bi bi-gift-fill"></i>
                                    {amenity.amenityName}
                                </button>

                            ))}

                        </div>

                    </div>

                }

            </div>
            <button

                className="apply-filter-btn"

                onClick={applyFilters}

            >

                <i className="bi bi-funnel-fill"></i>

                Apply Filters

            </button>

            <button

                className="clear-btn"

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

                <i className="bi bi-arrow-clockwise"></i>

                Clear Filters

            </button>

        </div>

    )

}

export default FilterSidebar;