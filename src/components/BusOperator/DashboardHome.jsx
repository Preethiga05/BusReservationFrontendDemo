import { useEffect, useState } from "react";
import BusService from "../../services/BusService";
import BusScheduleService from "../../services/BusScheduleService";
import BookingService from "../../services/BookingService";

function DashboardHome() {

    const [showBanner, setShowBanner] = useState(true);

    const [buses, setBuses] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [todayBookings, setTodayBookings] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadDashboard();

    }, []);


    async function loadDashboard() {

        try {

            setLoading(true);

            const today =
                new Date().toISOString().split("T")[0];

            const [
                busResponse,
                scheduleResponse,
                bookingResponse
            ] = await Promise.all([

                BusService.getOwnBuses(),

                BusScheduleService.getOwnSchedules(),

                BookingService.getOperatorBookingsByDateAndStatus(
                    today,
                    "CONFIRMED"
                )

            ]);

            setBuses(busResponse.data || []);

            setSchedules(scheduleResponse.data || []);

            setTodayBookings(bookingResponse.data || []);

        }
        catch (error) {

            console.log(
                "Dashboard loading error:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    }


    /*
     * =========================
     * FLEET STATISTICS
     * =========================
     */

    const totalBuses = buses.length;


    const activeBuses = buses.filter(
        bus =>
            bus.busStatus === "ACTIVE"
    ).length;


    const inactiveBuses = buses.filter(
        bus =>
            bus.busStatus === "INACTIVE"
    ).length;


    const totalSeats = buses.reduce(
        (total, bus) =>
            total + Number(bus.totalSeats || 0),
        0
    );


    /*
     * =========================
     * SCHEDULE STATISTICS
     * =========================
     */

    const activeSchedules = schedules.filter(
        schedule =>
            schedule.scheduledStatus === "SCHEDULED"
    ).length;


    /*
     * =========================
     * TODAY'S SALES
     * =========================
     */

    const todaySales = todayBookings.reduce(
        (total, booking) =>
            total + Number(booking.totalFare || 0),
        0
    );


    /*
     * =========================
     * TODAY
     * =========================
     */

    const today =
        new Date().toISOString().split("T")[0];


    /*
     * =========================
     * TODAY'S TRIPS
     * =========================
     */

    const todayTrips = schedules
        .filter(schedule =>
            schedule.journeyDate === today
        )
        .sort(
            (a, b) =>
                new Date(a.departureDateTime) -
                new Date(b.departureDateTime)
        );


    /*
     * =========================
     * UPCOMING DEPARTURES
     * =========================
     */

    const now = new Date();


    const upcomingTrips = schedules
        .filter(schedule => {

            if (!schedule.departureDateTime) {

                return false;

            }

            if (
                schedule.scheduledStatus !==
                "SCHEDULED"
            ) {

                return false;

            }

            const departure =
                new Date(
                    schedule.departureDateTime
                );

            return departure > now;

        })
        .sort(
            (a, b) =>
                new Date(a.departureDateTime) -
                new Date(b.departureDateTime)
        )
        .slice(0, 5);


    /*
     * =========================
     * FORMAT TIME
     * =========================
     */

    function formatTime(dateTime) {

        if (!dateTime) {

            return "N/A";

        }

        return new Date(
            dateTime
        ).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );

    }


    /*
     * =========================
     * FORMAT DATE
     * =========================
     */

    function formatDate(date) {

        if (!date) {

            return "N/A";

        }

        return new Date(
            date + "T00:00:00"
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /*
     * =========================
     * TRIP STATUS
     * =========================
     */

    function getTripStatus(schedule) {

        if (
            schedule.scheduledStatus ===
            "CANCELLED"
        ) {

            return {

                text: "Cancelled",

                className:
                    "bg-danger-subtle text-danger"

            };

        }


        if (
            schedule.scheduledStatus ===
            "COMPLETED"
        ) {

            return {

                text: "Completed",

                className:
                    "bg-secondary-subtle text-secondary"

            };

        }


        if (
            schedule.scheduledStatus ===
            "DELAYED"
        ) {

            return {

                text: "Delayed",

                className:
                    "bg-warning-subtle text-warning-emphasis"

            };

        }


        if (
            schedule.departureDateTime &&
            new Date(
                schedule.departureDateTime
            ) <= now
        ) {

            return {

                text: "Departed",

                className:
                    "bg-secondary-subtle text-secondary"

            };

        }


        return {

            text: "Scheduled",

            className:
                "bg-success-subtle text-success"

        };

    }


    /*
     * =========================
     * OCCUPANCY
     * =========================
     */

    function getOccupancyPercentage(schedule) {

        const booked =
            Number(
                schedule.bookedSeats || 0
            );

        const available =
            Number(
                schedule.availableSeats || 0
            );

        const total =
            booked + available;


        if (total === 0) {

            return 0;

        }

        return Math.round(
            (booked / total) * 100
        );

    }


    /*
     * =========================
     * LOADING
     * =========================
     */

    if (loading) {

        return (

            <div className="container-fluid py-5">

                <div className="d-flex flex-column
                    align-items-center
                    justify-content-center">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    >

                        <span className="visually-hidden">

                            Loading...

                        </span>

                    </div>

                    <span className="text-muted">

                        Loading dashboard...

                    </span>

                </div>

            </div>

        );

    }


    return (

        <div className="container-fluid py-4">


            {/* ==================================================
                WELCOME BANNER
            ================================================== */}

            {showBanner && (

                <div
                    className="alert alert-primary
                    border-0 shadow-sm rounded-4
                    d-flex justify-content-between
                    align-items-center mb-4"
                >

                    <div>

                        <h2 className="h4 fw-bold mb-2">

                            Welcome Back 👋

                        </h2>

                        <p className="mb-0">

                            Manage your fleet, schedules
                            and bookings efficiently with FastX.

                        </p>

                    </div>


                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() =>
                            setShowBanner(false)
                        }
                    ></button>

                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="row g-4 mb-4">


                {/* MY BUSES */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex
                                justify-content-between
                                align-items-start"
                            >

                                <div>

                                    <p className="text-muted mb-2">

                                        My Buses

                                    </p>

                                    <h2 className="fw-bold mb-0">

                                        {totalBuses}

                                    </h2>

                                </div>


                                <div
                                    className="bg-primary-subtle
                                    text-primary rounded-3
                                    d-flex align-items-center
                                    justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >

                                    <i className="bi bi-bus-front-fill fs-4"></i>

                                </div>

                            </div>


                            <div className="mt-3">

                                <small className="text-success">

                                    <i className="bi bi-check-circle me-1"></i>

                                    {activeBuses} active

                                </small>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ACTIVE SCHEDULES */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex
                                justify-content-between
                                align-items-start"
                            >

                                <div>

                                    <p className="text-muted mb-2">

                                        Active Schedules

                                    </p>

                                    <h2 className="fw-bold mb-0">

                                        {activeSchedules}

                                    </h2>

                                </div>


                                <div
                                    className="bg-success-subtle
                                    text-success rounded-3
                                    d-flex align-items-center
                                    justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >

                                    <i className="bi bi-calendar-check fs-4"></i>

                                </div>

                            </div>


                            <div className="mt-3">

                                <small className="text-muted">

                                    Currently scheduled

                                </small>

                            </div>

                        </div>

                    </div>

                </div>


                {/* TODAY'S BOOKINGS */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex
                                justify-content-between
                                align-items-start"
                            >

                                <div>

                                    <p className="text-muted mb-2">

                                        Today's Bookings

                                    </p>

                                    <h2 className="fw-bold mb-0">

                                        {todayBookings.length}

                                    </h2>

                                </div>


                                <div
                                    className="bg-warning-subtle
                                    text-warning-emphasis
                                    rounded-3
                                    d-flex align-items-center
                                    justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >

                                    <i className="bi bi-ticket-perforated fs-4"></i>

                                </div>

                            </div>


                            <div className="mt-3">

                                <small className="text-muted">

                                    Confirmed bookings today

                                </small>

                            </div>

                        </div>

                    </div>

                </div>


                {/* TODAY'S SALES */}

                <div className="col-xl-3 col-md-6">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex
                                justify-content-between
                                align-items-start"
                            >

                                <div>

                                    <p className="text-muted mb-2">

                                        Today's Sales

                                    </p>

                                    <h2 className="fw-bold mb-0">

                                        ₹ {todaySales.toLocaleString(
                                            "en-IN"
                                        )}

                                    </h2>

                                </div>


                                <div
                                    className="bg-info-subtle
                                    text-info rounded-3
                                    d-flex align-items-center
                                    justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >

                                    <i className="bi bi-cash-coin fs-4"></i>

                                </div>

                            </div>


                            <div className="mt-3">

                                <small className="text-muted">

                                    Confirmed booking revenue

                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                FLEET OVERVIEW + TODAY'S TRIPS
            ================================================== */}

            <div className="row g-4 mb-4">


                {/* FLEET OVERVIEW */}

                <div className="col-xl-4">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex
                                align-items-center mb-4"
                            >

                                <div
                                    className="bg-primary-subtle
                                    text-primary rounded-3
                                    d-flex align-items-center
                                    justify-content-center me-3"
                                    style={{
                                        width: "45px",
                                        height: "45px"
                                    }}
                                >

                                    <i className="bi bi-bar-chart-fill"></i>

                                </div>


                                <div>

                                    <h4 className="h5 fw-bold mb-1">

                                        Fleet Overview

                                    </h4>

                                    <small className="text-muted">

                                        Current fleet status

                                    </small>

                                </div>

                            </div>


                            {/* TOTAL BUSES */}

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center
                                py-3 border-bottom"
                            >

                                <div className="d-flex
                                    align-items-center"
                                >

                                    <i className="bi bi-bus-front
                                        text-primary me-3">
                                    </i>

                                    <span>

                                        Total Buses

                                    </span>

                                </div>


                                <span className="fw-bold">

                                    {totalBuses}

                                </span>

                            </div>


                            {/* ACTIVE BUSES */}

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center
                                py-3 border-bottom"
                            >

                                <div className="d-flex
                                    align-items-center"
                                >

                                    <i className="bi bi-check-circle
                                        text-success me-3">
                                    </i>

                                    <span>

                                        Active Buses

                                    </span>

                                </div>


                                <span className="fw-bold text-success">

                                    {activeBuses}

                                </span>

                            </div>


                            {/* INACTIVE BUSES */}

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center
                                py-3 border-bottom"
                            >

                                <div className="d-flex
                                    align-items-center"
                                >

                                    <i className="bi bi-x-circle
                                        text-danger me-3">
                                    </i>

                                    <span>

                                        Inactive Buses

                                    </span>

                                </div>


                                <span className="fw-bold text-danger">

                                    {inactiveBuses}

                                </span>

                            </div>


                            {/* TOTAL SEATS */}

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center
                                py-3"
                            >

                                <div className="d-flex
                                    align-items-center"
                                >

                                    <i className="bi bi-grid-3x3-gap
                                        text-primary me-3">
                                    </i>

                                    <span>

                                        Total Seats

                                    </span>

                                </div>


                                <span className="fw-bold">

                                    {totalSeats}

                                </span>

                            </div>


                            {/* FLEET PROGRESS */}

                            <div className="mt-4">

                                <div className="d-flex
                                    justify-content-between mb-2"
                                >

                                    <small className="text-muted">

                                        Fleet availability

                                    </small>

                                    <small className="fw-semibold">

                                        {
                                            totalBuses > 0
                                                ? Math.round(
                                                    (
                                                        activeBuses /
                                                        totalBuses
                                                    ) * 100
                                                )
                                                : 0
                                        }%

                                    </small>

                                </div>


                                <div
                                    className="progress"
                                    style={{
                                        height: "8px"
                                    }}
                                >

                                    <div
                                        className="progress-bar
                                        bg-success"
                                        style={{
                                            width:
                                                `${totalBuses > 0
                                                    ? (
                                                        activeBuses /
                                                        totalBuses
                                                    ) * 100
                                                    : 0
                                                }%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* TODAY'S TRIPS */}

                <div className="col-xl-8">

                    <div
                        className="card border-0
                        shadow-sm rounded-4 h-100"
                    >

                        <div className="card-body p-4">

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center mb-4"
                            >

                                <div>

                                    <h4 className="h5 fw-bold mb-1">

                                        Today's Trips

                                    </h4>

                                    <small className="text-muted">

                                        Scheduled journeys for today

                                    </small>

                                </div>


                                <span className="badge
                                    bg-primary-subtle
                                    text-primary px-3 py-2"
                                >

                                    {todayTrips.length} Trips

                                </span>

                            </div>


                            <div className="table-responsive">

                                <table
                                    className="table
                                    table-hover
                                    align-middle mb-0"
                                >

                                    <thead className="table-light">

                                        <tr>

                                            <th className="border-0">

                                                Bus

                                            </th>

                                            <th className="border-0">

                                                Route

                                            </th>

                                            <th className="border-0">

                                                Departure

                                            </th>

                                            <th className="border-0">

                                                Occupancy

                                            </th>

                                            <th className="border-0">

                                                Status

                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {

                                            todayTrips.length === 0

                                                ?

                                                <tr>

                                                    <td
                                                        colSpan="5"
                                                        className="text-center
                                                        text-muted py-5"
                                                    >

                                                        <i
                                                            className="bi
                                                            bi-calendar-x
                                                            fs-2 d-block mb-2"
                                                        ></i>

                                                        No trips scheduled
                                                        for today.

                                                    </td>

                                                </tr>

                                                :

                                                todayTrips.map(
                                                    trip => {

                                                        const status =
                                                            getTripStatus(
                                                                trip
                                                            );

                                                        const booked =
                                                            Number(
                                                                trip.bookedSeats ||
                                                                0
                                                            );

                                                        const available =
                                                            Number(
                                                                trip.availableSeats ||
                                                                0
                                                            );

                                                        const total =
                                                            booked +
                                                            available;

                                                        const occupancy =
                                                            getOccupancyPercentage(
                                                                trip
                                                            );


                                                        return (

                                                            <tr
                                                                key={
                                                                    trip.busScheduleId
                                                                }
                                                            >

                                                                <td>

                                                                    <div
                                                                        className="fw-semibold"
                                                                    >

                                                                        {
                                                                            trip.busName
                                                                        }

                                                                    </div>

                                                                </td>


                                                                <td>

                                                                    <div
                                                                        className="text-nowrap"
                                                                    >

                                                                        {
                                                                            trip.originCity
                                                                        }

                                                                        <i
                                                                            className="bi
                                                                            bi-arrow-right
                                                                            mx-2
                                                                            text-primary"
                                                                        ></i>

                                                                        {
                                                                            trip.destinationCity
                                                                        }

                                                                    </div>

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className="fw-semibold"
                                                                    >

                                                                        {
                                                                            formatTime(
                                                                                trip.departureDateTime
                                                                            )
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td
                                                                    style={{
                                                                        minWidth:
                                                                            "130px"
                                                                    }}
                                                                >

                                                                    <div
                                                                        className="d-flex
                                                                        justify-content-between
                                                                        mb-1"
                                                                    >

                                                                        <small>

                                                                            {
                                                                                booked
                                                                            }
                                                                            /
                                                                            {
                                                                                total
                                                                            }

                                                                        </small>

                                                                        <small
                                                                            className="text-muted"
                                                                        >

                                                                            {
                                                                                occupancy
                                                                            }%

                                                                        </small>

                                                                    </div>


                                                                    <div
                                                                        className="progress"
                                                                        style={{
                                                                            height:
                                                                                "6px"
                                                                        }}
                                                                    >

                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{
                                                                                width:
                                                                                    `${occupancy}%`
                                                                            }}
                                                                        ></div>

                                                                    </div>

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className={
                                                                            `badge
                                                                            ${status.className}
                                                                            px-2 py-1`
                                                                        }
                                                                    >

                                                                        {
                                                                            status.text
                                                                        }

                                                                    </span>

                                                                </td>

                                                            </tr>

                                                        );

                                                    }
                                                )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                UPCOMING DEPARTURES
            ================================================== */}

            <div className="row g-4">

                <div className="col-12">

                    <div
                        className="card border-0
                        shadow-sm rounded-4"
                    >

                        <div className="card-body p-4">

                            <div
                                className="d-flex
                                justify-content-between
                                align-items-center mb-4"
                            >

                                <div>

                                    <h4 className="h5 fw-bold mb-1">

                                        Upcoming Departures

                                    </h4>

                                    <small className="text-muted">

                                        Your next scheduled journeys

                                    </small>

                                </div>


                                <span
                                    className="badge
                                    bg-primary-subtle
                                    text-primary px-3 py-2"
                                >

                                    Next {upcomingTrips.length}

                                </span>

                            </div>


                            <div className="table-responsive">

                                <table
                                    className="table
                                    table-hover
                                    align-middle mb-0"
                                >

                                    <thead className="table-light">

                                        <tr>

                                            <th className="border-0">

                                                #

                                            </th>

                                            <th className="border-0">

                                                Bus

                                            </th>

                                            <th className="border-0">

                                                Route

                                            </th>

                                            <th className="border-0">

                                                Journey Date

                                            </th>

                                            <th className="border-0">

                                                Departure

                                            </th>

                                            <th className="border-0">

                                                Arrival

                                            </th>

                                            <th className="border-0">

                                                Fare

                                            </th>

                                            <th className="border-0">

                                                Seats

                                            </th>

                                            <th className="border-0">

                                                Status

                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {

                                            upcomingTrips.length === 0

                                                ?

                                                <tr>

                                                    <td
                                                        colSpan="9"
                                                        className="text-center
                                                        text-muted py-5"
                                                    >

                                                        <i
                                                            className="bi
                                                            bi-calendar-x
                                                            fs-2 d-block mb-2"
                                                        ></i>

                                                        No upcoming
                                                        departures.

                                                    </td>

                                                </tr>

                                                :

                                                upcomingTrips.map(
                                                    (trip, index) => {

                                                        const status =
                                                            getTripStatus(
                                                                trip
                                                            );

                                                        const booked =
                                                            Number(
                                                                trip.bookedSeats ||
                                                                0
                                                            );

                                                        const available =
                                                            Number(
                                                                trip.availableSeats ||
                                                                0
                                                            );


                                                        return (

                                                            <tr
                                                                key={
                                                                    trip.busScheduleId
                                                                }
                                                            >

                                                                <td>

                                                                    <span
                                                                        className="text-muted"
                                                                    >

                                                                        {
                                                                            index +
                                                                            1
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td>

                                                                    <strong>

                                                                        {
                                                                            trip.busName
                                                                        }

                                                                    </strong>

                                                                </td>


                                                                <td>

                                                                    <div
                                                                        className="text-nowrap"
                                                                    >

                                                                        {
                                                                            trip.originCity
                                                                        }

                                                                        <i
                                                                            className="bi
                                                                            bi-arrow-right
                                                                            mx-2
                                                                            text-primary"
                                                                        ></i>

                                                                        {
                                                                            trip.destinationCity
                                                                        }

                                                                    </div>

                                                                </td>


                                                                <td>

                                                                    {
                                                                        formatDate(
                                                                            trip.journeyDate
                                                                        )
                                                                    }

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className="fw-semibold"
                                                                    >

                                                                        {
                                                                            formatTime(
                                                                                trip.departureDateTime
                                                                            )
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td>

                                                                    {
                                                                        formatTime(
                                                                            trip.arrivalDateTime
                                                                        )
                                                                    }

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className="fw-semibold"
                                                                    >

                                                                        ₹ {
                                                                            Number(
                                                                                trip.fare ||
                                                                                0
                                                                            ).toLocaleString(
                                                                                "en-IN"
                                                                            )
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className="badge
                                                                        bg-light
                                                                        text-dark
                                                                        border"
                                                                    >

                                                                        {
                                                                            booked
                                                                        }
                                                                        {" / "}
                                                                        {
                                                                            booked +
                                                                            available
                                                                        }

                                                                    </span>

                                                                </td>


                                                                <td>

                                                                    <span
                                                                        className={
                                                                            `badge
                                                                            ${status.className}
                                                                            px-2 py-1`
                                                                        }
                                                                    >

                                                                        {
                                                                            status.text
                                                                        }

                                                                    </span>

                                                                </td>

                                                            </tr>

                                                        );

                                                    }
                                                )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardHome;