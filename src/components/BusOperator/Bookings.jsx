import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import BookingDetailsModal from "./BookingDetailsModal";

function Bookings() {

    const [bookings, setBookings] = useState([]);

    const [search, setSearch] = useState("");

    const [busFilter, setBusFilter] = useState("ALL");

    const [dateFilter, setDateFilter] = useState("ALL");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD BOOKINGS
    // ==========================================

    const loadBookings = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await BookingService.getOwnBookings();

            console.log(
                "Operator bookings:",
                response.data
            );

            setBookings(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load bookings:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load bookings."
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadBookings();

    }, []);


    // ==========================================
    // UNIQUE BUSES
    // ==========================================

    const busNames = [
        ...new Set(
            bookings
                .map(
                    booking =>
                        booking.busName
                )
                .filter(Boolean)
        )
    ];


    // ==========================================
    // DATE HELPERS
    // ==========================================

    const getToday = () => {

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        return today;

    };


    const getDateOnly = (
        dateString
    ) => {

        if (!dateString) {

            return null;

        }

        const [
            year,
            month,
            day
        ] = dateString
            .split("-")
            .map(Number);

        return new Date(
            year,
            month - 1,
            day
        );

    };


    const isSameDate = (
        date1,
        date2
    ) => {

        return (
            date1.getFullYear() ===
                date2.getFullYear() &&

            date1.getMonth() ===
                date2.getMonth() &&

            date1.getDate() ===
                date2.getDate()
        );

    };


    const isBetween = (
        date,
        start,
        end
    ) => {

        return (
            date >= start &&
            date <= end
        );

    };


    // ==========================================
    // DATE FILTER
    // ==========================================

    const checkDateFilter = (
        journeyDate
    ) => {

        if (
            dateFilter === "ALL"
        ) {

            return true;

        }


        const scheduleDate =
            getDateOnly(
                journeyDate
            );

        if (!scheduleDate) {

            return false;

        }


        const today =
            getToday();


        // TODAY
        if (
            dateFilter === "TODAY"
        ) {

            return isSameDate(
                scheduleDate,
                today
            );

        }


        // PAST 1 WEEK
        if (
            dateFilter === "PAST_WEEK"
        ) {

            const startDate =
                new Date(today);

            startDate.setDate(
                today.getDate() - 7
            );


            const endDate =
                new Date(today);

            endDate.setDate(
                today.getDate() - 1
            );


            return isBetween(
                scheduleDate,
                startDate,
                endDate
            );

        }


        // PAST 1 MONTH
        if (
            dateFilter === "PAST_MONTH"
        ) {

            const startDate =
                new Date(today);

            startDate.setMonth(
                today.getMonth() - 1
            );


            const endDate =
                new Date(today);

            endDate.setDate(
                today.getDate() - 1
            );


            return isBetween(
                scheduleDate,
                startDate,
                endDate
            );

        }


        // UPCOMING 1 WEEK
        if (
            dateFilter === "UPCOMING_WEEK"
        ) {

            const startDate =
                new Date(today);

            startDate.setDate(
                today.getDate() + 1
            );


            const endDate =
                new Date(today);

            endDate.setDate(
                today.getDate() + 7
            );


            return isBetween(
                scheduleDate,
                startDate,
                endDate
            );

        }


        // UPCOMING 1 MONTH
        if (
            dateFilter === "UPCOMING_MONTH"
        ) {

            const startDate =
                new Date(today);

            startDate.setDate(
                today.getDate() + 1
            );


            const endDate =
                new Date(today);

            endDate.setMonth(
                today.getMonth() + 1
            );


            return isBetween(
                scheduleDate,
                startDate,
                endDate
            );

        }


        return true;

    };


    // ==========================================
    // FILTER BOOKINGS
    // ==========================================

    const filteredBookings =
        bookings.filter(
            (booking) => {


                // SEARCH
                const searchText =
                    search
                        .toLowerCase()
                        .trim();


                const bookingReference =
                    String(
                        booking.bookingReference || ""
                    ).toLowerCase();


                const passengerName =
                    String(
                        booking.passengerName || ""
                    ).toLowerCase();


                const busName =
                    String(
                        booking.busName || ""
                    ).toLowerCase();


                const origin =
                    String(
                        booking.originCity || ""
                    ).toLowerCase();


                const destination =
                    String(
                        booking.destinationCity || ""
                    ).toLowerCase();


                const matchesSearch =
                    bookingReference.includes(
                        searchText
                    ) ||

                    passengerName.includes(
                        searchText
                    ) ||

                    busName.includes(
                        searchText
                    ) ||

                    origin.includes(
                        searchText
                    ) ||

                    destination.includes(
                        searchText
                    );


                // BUS
                const matchesBus =
                    busFilter === "ALL" ||
                    booking.busName ===
                        busFilter;


                // STATUS
                const matchesStatus =
                    statusFilter === "ALL" ||
                    booking.bookingStatus ===
                        statusFilter;


                // DATE
                const matchesDate =
                    checkDateFilter(
                        booking.journeyDate
                    );


                return (
                    matchesSearch &&
                    matchesBus &&
                    matchesStatus &&
                    matchesDate
                );

            }
        );


    // ==========================================
    // SUMMARY CARDS
    // ==========================================

    const totalBookings =
        filteredBookings.length;


    const confirmedBookings =
        filteredBookings.filter(
            booking =>
                booking.bookingStatus ===
                "CONFIRMED"
        ).length;


    const cancelledBookings =
        filteredBookings.filter(
            booking =>
                booking.bookingStatus ===
                "CANCELLED"
        ).length;


    const revenue =
        filteredBookings
            .filter(
                booking =>
                    booking.bookingStatus ===
                    "CONFIRMED"
            )
            .reduce(
                (
                    total,
                    booking
                ) => {

                    return (
                        total +
                        Number(
                            booking.totalFare || 0
                        )
                    );

                },
                0
            );


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (
        dateString
    ) => {

        if (!dateString) {

            return "N/A";

        }

        const date =
            getDateOnly(
                dateString
            );

        if (!date) {

            return "N/A";

        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ==========================================
    // FORMAT MONEY
    // ==========================================

    const formatMoney = (
        amount
    ) => {

        return Number(
            amount || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const clearFilters = () => {

        setSearch("");

        setBusFilter("ALL");

        setDateFilter("ALL");

        setStatusFilter("ALL");

    };


    return (

        <div className="container-fluid px-4 py-4">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-primary mb-1">

                        Bookings

                    </h2>

                    <p className="text-muted mb-0">

                        Manage and monitor passenger bookings for your buses.

                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================= */}

            <div className="row g-3 mb-4">


                {/* TOTAL */}

                <div className="col-xl-3 col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">

                                        Total Bookings

                                    </small>

                                    <h3 className="fw-bold mb-0 mt-2">

                                        {totalBookings}

                                    </h3>

                                </div>

                                <div className="bg-primary-subtle text-primary rounded-circle p-3">

                                    <i className="bi bi-ticket-perforated fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* CONFIRMED */}

                <div className="col-xl-3 col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">

                                        Confirmed

                                    </small>

                                    <h3 className="fw-bold text-success mb-0 mt-2">

                                        {confirmedBookings}

                                    </h3>

                                </div>

                                <div className="bg-success-subtle text-success rounded-circle p-3">

                                    <i className="bi bi-check-circle fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* CANCELLED */}

                <div className="col-xl-3 col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">

                                        Cancelled

                                    </small>

                                    <h3 className="fw-bold text-danger mb-0 mt-2">

                                        {cancelledBookings}

                                    </h3>

                                </div>

                                <div className="bg-danger-subtle text-danger rounded-circle p-3">

                                    <i className="bi bi-x-circle fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* REVENUE */}

                <div className="col-xl-3 col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">

                                        Revenue

                                    </small>

                                    <h3 className="fw-bold text-primary mb-0 mt-2">

                                        ₹ {formatMoney(revenue)}

                                    </h3>

                                </div>

                                <div className="bg-primary-subtle text-primary rounded-circle p-3">

                                    <i className="bi bi-currency-rupee fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* FILTERS */}
            {/* ================================= */}

            <div className="card border-0 shadow-sm mb-3">

                <div className="card-body">

                    <div className="row g-3 align-items-end">


                        {/* SEARCH */}

                        <div className="col-xl-4 col-lg-6">

                            <label className="form-label fw-semibold">

                                Search Booking

                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search text-primary"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Booking reference, passenger or bus..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* BUS */}

                        <div className="col-xl-2 col-lg-3">

                            <label className="form-label fw-semibold">

                                Bus

                            </label>

                            <select
                                className="form-select"
                                value={busFilter}
                                onChange={(e) =>
                                    setBusFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="ALL">

                                    All Buses

                                </option>

                                {busNames.map(
                                    busName => (

                                        <option
                                            key={busName}
                                            value={busName}
                                        >

                                            {busName}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DATE */}

                        <div className="col-xl-2 col-lg-3">

                            <label className="form-label fw-semibold">

                                Journey Date

                            </label>

                            <select
                                className="form-select"
                                value={dateFilter}
                                onChange={(e) =>
                                    setDateFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="ALL">

                                    All Dates

                                </option>

                                <option value="TODAY">

                                    Today

                                </option>

                                <option value="PAST_WEEK">

                                    Past 1 Week

                                </option>

                                <option value="PAST_MONTH">

                                    Past 1 Month

                                </option>

                                <option value="UPCOMING_WEEK">

                                    Upcoming 1 Week

                                </option>

                                <option value="UPCOMING_MONTH">

                                    Upcoming 1 Month

                                </option>

                            </select>

                        </div>


                        {/* STATUS */}

                        <div className="col-xl-2 col-lg-3">

                            <label className="form-label fw-semibold">

                                Status

                            </label>

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="ALL">

                                    All Status

                                </option>

                                <option value="CONFIRMED">

                                    Confirmed

                                </option>

                                <option value="CANCELLED">

                                    Cancelled

                                </option>

                            </select>

                        </div>


                        {/* CLEAR */}

                        <div className="col-xl-2 col-lg-3">

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={clearFilters}
                            >

                                <i className="bi bi-arrow-clockwise me-2"></i>

                                Clear Filters

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* RESULT INFORMATION */}
            {/* ================================= */}

            <div className="d-flex justify-content-between align-items-center mb-2">

                <small className="text-muted">

                    Showing{" "}

                    <strong>
                        {filteredBookings.length}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {bookings.length}
                    </strong>

                    {" "}bookings

                </small>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="alert alert-danger">

                    <i className="bi bi-exclamation-triangle me-2"></i>

                    {error}

                </div>

            )}


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {loading && (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <p className="text-muted mt-3 mb-0">

                            Loading bookings...

                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* TABLE */}
            {/* ================================= */}

            {!loading && !error && (

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th className="px-3">
                                            #
                                        </th>

                                        <th>
                                            Booking
                                        </th>

                                        <th>
                                            Passenger
                                        </th>

                                        <th>
                                            Bus
                                        </th>

                                        <th>
                                            Route
                                        </th>

                                        <th>
                                            Journey
                                        </th>

                                        <th>
                                            Seats
                                        </th>

                                        <th>
                                            Fare
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredBookings.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="10"
                                                className="text-center py-5"
                                            >

                                                <i className="bi bi-ticket-perforated fs-1 text-muted"></i>

                                                <p className="text-muted mt-2 mb-0">

                                                    No bookings found for the selected filters.

                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredBookings.map(
                                            (
                                                booking,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        booking.bookingId
                                                    }
                                                >

                                                    <td className="px-3">

                                                        {index + 1}

                                                    </td>


                                                    <td>

                                                        <span className="fw-semibold text-primary">

                                                            {
                                                                booking.bookingReference
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            booking.passengerName ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            booking.busName ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            booking.originCity
                                                        }

                                                        <i className="bi bi-arrow-right mx-2 text-primary"></i>

                                                        {
                                                            booking.destinationCity
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            formatDate(
                                                                booking.journeyDate
                                                            )
                                                        }

                                                    </td>


                                                    <td>

                                                        <span className="badge bg-light text-dark border">

                                                            {
                                                                booking.seatIds?.length ??
                                                                booking.numberOfSeats ??
                                                                0
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <span className="fw-semibold">

                                                            ₹{" "}

                                                            {
                                                                formatMoney(
                                                                    booking.totalFare
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            booking.bookingStatus ===
                                                            "CONFIRMED" ? (

                                                                <span className="badge rounded-pill bg-success-subtle text-success">

                                                                    Confirmed

                                                                </span>

                                                            ) : (

                                                                <span className="badge rounded-pill bg-danger-subtle text-danger">

                                                                    Cancelled

                                                                </span>

                                                            )
                                                        }

                                                    </td>


                                                    <td>

                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => {

                                                                setSelectedBooking(
                                                                    booking
                                                                );

                                                                setShowDetails(
                                                                    true
                                                                );

                                                            }}
                                                        >

                                                            <i className="bi bi-eye me-1"></i>

                                                            View

                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            )}

<BookingDetailsModal
    booking={
        showDetails
            ? selectedBooking
            : null
    }
    close={() => {

        setShowDetails(false);

        setSelectedBooking(null);

    }}
/>
            

        </div>

    );

}

export default Bookings;