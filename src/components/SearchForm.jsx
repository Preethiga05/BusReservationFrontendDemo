import { useState, forwardRef, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import "../css/SearchForm.css";
import { useNavigate } from "react-router";
import cities from "../utils/Cities";

const CustomDateInput = forwardRef(function CustomDateInput(
    { value, onClick },
    ref
) {

    return (

        <div
            className="custom-date-input"
            onClick={onClick}
            ref={ref}
        >

            <i className="bi bi-calendar-event-fill"></i>

            <input
                type="text"
                value={
                    value
                        ? format(new Date(value), "dd-MM-yyyy")
                        : ""
                }
                placeholder="DD-MM-YYYY"
                readOnly
            />

        </div>

    );

});

function SearchForm() {

    const navigate = useNavigate();

    const [source, setSource] = useState("");

    const [destination, setDestination] = useState("");

    const [journeyDate, setJourneyDate] = useState(null);

    const [filteredSourceCities, setFilteredSourceCities] = useState([]);

    const [filteredDestinationCities, setFilteredDestinationCities] = useState([]);

    const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);

    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

    const sourceRef = useRef(null);

    const destinationRef = useRef(null);

    /* ==========================================
       Restore Previous Search
    ========================================== */

    useEffect(() => {

        const savedSource = localStorage.getItem("source");

        const savedDestination = localStorage.getItem("destination");

        const savedJourneyDate = localStorage.getItem("journeyDate");

        if (savedSource) {

            setSource(savedSource);

        }

        if (savedDestination) {

            setDestination(savedDestination);

        }

        if (savedJourneyDate) {

            setJourneyDate(new Date(savedJourneyDate));

        }

    }, []);

    /* ==========================================
       Save Search Automatically
    ========================================== */

    useEffect(() => {

        localStorage.setItem("source", source);

    }, [source]);

    useEffect(() => {

        localStorage.setItem("destination", destination);

    }, [destination]);

    useEffect(() => {

        if (journeyDate) {

            localStorage.setItem(

                "journeyDate",

                journeyDate.toISOString()

            );

        }

    }, [journeyDate]);

    /* ==========================================
       Close Suggestions Outside Click
    ========================================== */

    useEffect(() => {

        function handleClickOutside(event) {

            if (

                sourceRef.current &&

                !sourceRef.current.contains(event.target)

            ) {

                setShowSourceSuggestions(false);

            }

            if (

                destinationRef.current &&

                !destinationRef.current.contains(event.target)

            ) {

                setShowDestinationSuggestions(false);

            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );

    }, []);
    /* ==========================================
   Swap Source & Destination
========================================== */

    function swapLocation() {

        const temp = source;

        setSource(destination);

        setDestination(temp);

    }

    /* ==========================================
       Quick Date Selection
    ========================================== */

    function selectToday() {

        setJourneyDate(new Date());

    }

    function selectTomorrow() {

        setJourneyDate(addDays(new Date(), 1));

    }

    /* ==========================================
       Source Auto Suggestion
    ========================================== */

    function handleSourceChange(e) {

        const value = e.target.value;

        setSource(value);

        if (!value.trim()) {

            setFilteredSourceCities([]);

            setShowSourceSuggestions(false);

            return;

        }

        const filtered = cities.filter(city =>

            city.toLowerCase().includes(

                value.toLowerCase()

            )

        );

        setFilteredSourceCities(filtered);

        setShowSourceSuggestions(true);

    }

    function selectSourceCity(city) {

        setSource(city);

        setShowSourceSuggestions(false);

    }

    /* ==========================================
       Destination Auto Suggestion
    ========================================== */

    function handleDestinationChange(e) {

        const value = e.target.value;

        setDestination(value);

        if (!value.trim()) {

            setFilteredDestinationCities([]);

            setShowDestinationSuggestions(false);

            return;

        }

        const filtered = cities.filter(city =>

            city.toLowerCase().includes(

                value.toLowerCase()

            )

        );

        setFilteredDestinationCities(filtered);

        setShowDestinationSuggestions(true);

    }

    function selectDestinationCity(city) {

        setDestination(city);

        setShowDestinationSuggestions(false);

    }

    /* ==========================================
       Search Bus
    ========================================== */

    function searchBus() {

        if (!source.trim()) {

            alert("Please select the source city.");

            return;

        }

        if (!destination.trim()) {

            alert("Please select the destination city.");

            return;

        }

        if (source === destination) {

            alert("Source and Destination cannot be the same.");

            return;

        }

        if (!journeyDate) {

            alert("Please select the journey date.");

            return;

        }

        const formattedDate = format(

            journeyDate,

            "yyyy-MM-dd"

        );

        navigate("/search-results", {

            state: {

                source,

                destination,

                journeyDate: formattedDate

            }

        });

    }

    return (

        <div
            id="searchBus"
            className="search-wrapper"
        >

            <div className="search-card">

                <div className="row align-items-center">
                    {/* ==========================
                        Source
                    ========================== */}

                    <div className="col-lg-3">

                        <div
                            className="search-box position-relative"
                            ref={sourceRef}
                        >

                            <i className="bi bi-geo-alt-fill search-icon"></i>

                            <input

                                type="text"

                                className="search-input"

                                placeholder="Enter Source"

                                value={source}

                                onChange={handleSourceChange}

                                onFocus={() => {

                                    if (filteredSourceCities.length > 0) {

                                        setShowSourceSuggestions(true);

                                    }

                                }}

                            />

                            {

                                showSourceSuggestions &&

                                filteredSourceCities.length > 0 &&

                                (

                                    <div className="suggestion-box">

                                        {

                                            filteredSourceCities.map(city => (

                                                <div

                                                    key={city}

                                                    className="suggestion-item"

                                                    onClick={() =>

                                                        selectSourceCity(city)

                                                    }

                                                >


                                                    {city}

                                                </div>

                                            ))

                                        }

                                    </div>

                                )

                            }

                        </div>

                    </div>

                    {/* ==========================
                        Swap
                    ========================== */}

                    <div className="col-lg-1 text-center">

                        <button

                            className="swap-btn"

                            onClick={swapLocation}

                        >

                            <i className="bi bi-arrow-left-right"></i>

                        </button>

                    </div>

                    {/* ==========================
                        Destination
                    ========================== */}

                    <div className="col-lg-3">

                        <div
                            className="search-box position-relative"
                            ref={destinationRef}
                        >

                            <i className="bi bi-geo-fill search-icon"></i>

                            <input

                                type="text"

                                className="search-input"

                                placeholder="Enter Destination"

                                value={destination}

                                onChange={handleDestinationChange}

                                onFocus={() => {

                                    if (

                                        filteredDestinationCities.length > 0

                                    ) {

                                        setShowDestinationSuggestions(true);

                                    }

                                }}

                            />

                            {

                                showDestinationSuggestions &&

                                filteredDestinationCities.length > 0 &&

                                (

                                    <div className="suggestion-box">

                                        {

                                            filteredDestinationCities.map(city => (

                                                <div

                                                    key={city}

                                                    className="suggestion-item"

                                                    onClick={() =>

                                                        selectDestinationCity(city)

                                                    }

                                                >


                                                    {city}

                                                </div>

                                            ))

                                        }

                                    </div>

                                )

                            }

                        </div>

                    </div>

                    {/* ==========================
                        Journey Date
                    ========================== */}

                    <div className="col-lg-3">

                        <div className="search-box">


                            <DatePicker

                                selected={journeyDate}

                                onChange={(date) =>

                                    setJourneyDate(date)

                                }

                                minDate={new Date()}

                                dateFormat="dd MMM yyyy"

                                calendarClassName="custom-calendar"

                                placeholderText="DD-MM-YYYY"

                                monthsShown={1}

                                showPopperArrow={false}

                                fixedHeight

                                todayButton="Today"

                                customInput={<CustomDateInput />}

                            />

                        </div>

                    </div>
                    {/* ==========================
                        Today Tomorrow
                    ========================== */}

                    <div className="col-lg-2">

                        <div className="quick-date">

                            <button

                                className={

                                    journeyDate &&

                                        isSameDay(

                                            journeyDate,

                                            new Date()

                                        )

                                        ?

                                        "today-btn active-chip"

                                        :

                                        "today-btn"

                                }

                                onClick={selectToday}

                            >

                                Today

                            </button>

                            <button

                                className={

                                    journeyDate &&

                                        isSameDay(

                                            journeyDate,

                                            addDays(new Date(), 1)

                                        )

                                        ?

                                        "tomorrow-btn active-chip"

                                        :

                                        "tomorrow-btn"

                                }

                                onClick={selectTomorrow}

                            >

                                Tomorrow

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="text-center">

                <button

                    className="search-bus-btn"

                    onClick={searchBus}

                >

                    <i className="bi bi-search me-2"></i>

                    Search Buses

                </button>

            </div>

        </div >

    );

}

export default SearchForm;