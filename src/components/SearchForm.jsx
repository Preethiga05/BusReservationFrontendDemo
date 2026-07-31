
import { useState, forwardRef } from "react"

import DatePicker from "react-datepicker"

import { format, isSameDay, addDays } from "date-fns"

import "react-datepicker/dist/react-datepicker.css"

import "../css/SearchForm.css"

const CustomDateInput = forwardRef(function CustomDateInput(
    { value, onClick },
    ref
) {

    return (

        <div
            className="date-card"
            onClick={onClick}
            ref={ref}
        >

            <i className="bi bi-calendar-event search-icon"></i>

            {
                value ?

                <div>

                    <h6>{format(new Date(value), "dd MMM''yy")}</h6>

                    <small>{format(new Date(value), "EEEE")}</small>

                </div>

                :

                <div>

                    <span className="date-placeholder">

                        Select Journey Date

                    </span>

                </div>
            }

        </div>

    )

})

function SearchForm() {

    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [journeyDate, setJourneyDate] = useState(null)

    function swapLocation() {

        const temp = source

        setSource(destination)

        setDestination(temp)

    }

    function selectToday() {

        setJourneyDate(new Date())

    }

    function selectTomorrow() {

        const tomorrow = new Date()

        tomorrow.setDate(tomorrow.getDate() + 1)

        setJourneyDate(tomorrow)

    }

    function searchBus() {

        console.log(source)
        console.log(destination)
        console.log(journeyDate)

    }

    return (

       <div className="search-wrapper">

            <div className="search-card">

                <div className="row align-items-center">

                    {/* Source */}

                    <div className="col-lg-3">

                        <div className="search-box">

                            <i className="bi bi-geo-alt-fill search-icon"></i>

                            <input
                                type="text"
                                className="search-input"
                                placeholder="Enter Source"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />

                        </div>

                    </div>

                    {/* Swap */}

                    <div className="col-lg-1 text-center">

                        <button
                            className="swap-btn"
                            onClick={swapLocation}
                        >

                            <i className="bi bi-arrow-left-right"></i>

                        </button>

                    </div>

                    {/* Destination */}

                    <div className="col-lg-3">

                        <div className="search-box">

                            <i className="bi bi-geo-fill search-icon"></i>

                            <input
                                type="text"
                                className="search-input"
                                placeholder="Enter Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />

                        </div>

                    </div>

                    {/* Journey Date */}

                    <div className="col-lg-3">

                        <div className="search-box">

                            

                            <DatePicker

                                selected={journeyDate}

                                onChange={(date) => setJourneyDate(date)}

                                minDate={new Date()}

                                dateFormat="dd MMM yyyy"

                                calendarClassName="custom-calendar"

                                placeholderText="Select Journey Date"

                                monthsShown={1}

                                showPopperArrow={false}

                                fixedHeight

                                todayButton="Today"

                                customInput={<CustomDateInput />}

                            />

                        </div>

                    </div>

                    {/* Today Tomorrow */}

                    <div className="col-lg-2">

                        <div className="quick-date">

                            <button

                                className={

                                    journeyDate && isSameDay(journeyDate, new Date())

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

        </div>

    )

}

export default SearchForm