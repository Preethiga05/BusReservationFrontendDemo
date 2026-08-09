import { useEffect, useState } from "react";
import BusScheduleService from "../../services/BusScheduleService";
import ScheduleDetailsModal from "./ScheduleDetailsModal";
import AddScheduleModal from "./AddScheduleModal";
import UpdateScheduleModal from "./UpdateScheduleModal";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function BusSchedules() {

    const [schedules, setSchedules] = useState([]);

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [busFilter, setBusFilter] = useState("ALL");

    const [dateFilter, setDateFilter] = useState("ALL");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD SCHEDULES
    // ==========================================

    const loadSchedules = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await BusScheduleService.getOwnSchedules();

            console.log(
                "Schedules:",
                response.data
            );

            setSchedules(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load schedules:",
                error
            );

            setError(
                "Unable to load schedules."
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadSchedules();

    }, []);


    // ==========================================
    // GET UNIQUE BUS NAMES
    // ==========================================

    const busNames = [
        ...new Set(
            schedules
                .map(schedule => schedule.busName)
                .filter(Boolean)
        )
    ];


    // ==========================================
    // DATE HELPERS
    // ==========================================

    const getToday = () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return today;

    };


    const getDateOnly = (dateString) => {

        const [year, month, day] =
            dateString.split("-").map(Number);

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

        if (dateFilter === "ALL") {

            return true;

        }


        const scheduleDate =
            getDateOnly(journeyDate);

        const today =
            getToday();


        // --------------------------------------
        // TODAY
        // --------------------------------------

        if (dateFilter === "TODAY") {

            return isSameDate(
                scheduleDate,
                today
            );

        }


        // --------------------------------------
        // PAST 1 WEEK
        // --------------------------------------

        if (dateFilter === "PAST_WEEK") {

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


        // --------------------------------------
        // PAST 1 MONTH
        // --------------------------------------

        if (dateFilter === "PAST_MONTH") {

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


        // --------------------------------------
        // UPCOMING 1 WEEK
        // --------------------------------------

        if (dateFilter === "UPCOMING_WEEK") {

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


        // --------------------------------------
        // UPCOMING 1 MONTH
        // --------------------------------------

        if (dateFilter === "UPCOMING_MONTH") {

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
    // FILTER SCHEDULES
    // ==========================================

    const filteredSchedules =
        schedules.filter((schedule) => {


            // ----------------------------------
            // SEARCH
            // ----------------------------------

            const searchText =
                search.toLowerCase();


            const busName =
                schedule.busName
                    ?.toLowerCase() || "";


            const origin =
                schedule.originCity
                    ?.toLowerCase() || "";


            const destination =
                schedule.destinationCity
                    ?.toLowerCase() || "";


            const matchesSearch =
                busName.includes(searchText) ||
                origin.includes(searchText) ||
                destination.includes(searchText);


            // ----------------------------------
            // STATUS
            // ----------------------------------

            const matchesStatus =
                statusFilter === "ALL" ||
                schedule.scheduledStatus ===
                    statusFilter;


            // ----------------------------------
            // BUS
            // ----------------------------------

            const matchesBus =
                busFilter === "ALL" ||
                schedule.busName === busFilter;


            // ----------------------------------
            // DATE
            // ----------------------------------

            const matchesDate =
                checkDateFilter(
                    schedule.journeyDate
                );


            return (
                matchesSearch &&
                matchesStatus &&
                matchesBus &&
                matchesDate
            );

        });


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (
        dateTime
    ) => {

        if (!dateTime) {

            return "N/A";

        }


        return new Date(
            dateTime
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


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
            getDateOnly(dateString);


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    return (

        <div className="container-fluid px-4 py-4">

            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-primary mb-1">

                        Bus Schedules

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all schedules created for your buses.

                    </p>

                </div>


                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setShowAddModal(true)
                    }
                >

                    <i className="bi bi-plus-circle me-2"></i>

                    Create Schedule

                </button>

            </div>


            {/* ================================= */}
            {/* FILTER CARD */}
            {/* ================================= */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3 align-items-end">


                        {/* SEARCH */}

                        <div className="col-lg-4">

                            <label className="form-label fw-semibold">

                                Search

                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search text-primary"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search bus or route..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* BUS FILTER */}

                        <div className="col-lg-2">

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
                                    (busName) => (

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


                        {/* DATE FILTER */}

                        <div className="col-lg-3">

                            <label className="form-label fw-semibold">

                                Date

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


                        {/* STATUS FILTER */}

                        <div className="col-lg-2">

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

                                <option value="SCHEDULED">

                                    Scheduled

                                </option>

                                <option value="CANCELLED">

                                    Cancelled

                                </option>

                            </select>

                        </div>


                        {/* CLEAR */}

                        <div className="col-lg-1">

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {

                                    setSearch("");

                                    setBusFilter("ALL");

                                    setDateFilter("ALL");

                                    setStatusFilter("ALL");

                                }}
                                title="Clear Filters"
                            >

                                <i className="bi bi-arrow-clockwise"></i>

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* RESULT COUNT */}
            {/* ================================= */}

            {!loading && !error && (

                <div className="d-flex justify-content-between align-items-center mb-2">

                    <small className="text-muted">

                        Showing{" "}

                        <strong>

                            {filteredSchedules.length}

                        </strong>

                        {" "}of{" "}

                        <strong>

                            {schedules.length}

                        </strong>

                        {" "}schedules

                    </small>

                </div>

            )}


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

                            Loading schedules...

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
                                            Bus
                                        </th>

                                        <th>
                                            Route
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Departure
                                        </th>

                                        <th>
                                            Arrival
                                        </th>

                                        <th>
                                            Fare
                                        </th>

                                        <th>
                                            Seats
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

                                    {filteredSchedules.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="10"
                                                className="text-center py-5"
                                            >

                                                <i className="bi bi-calendar-x fs-1 text-muted"></i>

                                                <p className="text-muted mt-2 mb-0">

                                                    No schedules found.

                                                </p>

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredSchedules.map(
                                            (schedule, index) => (

                                                <tr
                                                    key={
                                                        schedule.busScheduleId
                                                    }
                                                >

                                                    <td className="px-3">

                                                        {index + 1}

                                                    </td>


                                                    <td>

                                                        <span className="fw-semibold">

                                                            {
                                                                schedule.busName
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            schedule.originCity
                                                        }

                                                        <i className="bi bi-arrow-right mx-2 text-primary"></i>

                                                        {
                                                            schedule.destinationCity
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            formatDate(
                                                                schedule.journeyDate
                                                            )
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            formatTime(
                                                                schedule.departureDateTime
                                                            )
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            formatTime(
                                                                schedule.arrivalDateTime
                                                            )
                                                        }

                                                    </td>


                                                    <td>

                                                        <span className="fw-semibold">

                                                            ₹{" "}

                                                            {
                                                                schedule.fare
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <span className="badge bg-light text-dark border">

                                                            {
                                                                schedule.availableSeats
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {schedule.scheduledStatus ===
                                                        "SCHEDULED" ? (

                                                            <span className="badge rounded-pill bg-success-subtle text-success">

                                                                Scheduled

                                                            </span>

                                                        ) : (

                                                            <span className="badge rounded-pill bg-danger-subtle text-danger">

                                                                Cancelled

                                                            </span>

                                                        )}

                                                    </td>


                                                    <td>

                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() =>
                                                                setSelectedSchedule(
                                                                    schedule
                                                                )
                                                            }
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


            {/* ================================= */}
            {/* DETAILS MODAL */}
            {/* ================================= */}

            <ScheduleDetailsModal

                schedule={selectedSchedule}

                close={() =>
                    setSelectedSchedule(null)
                }

                openUpdate={() => {

                    setShowUpdateModal(true);

                }}

                openCancel={() => {

                    setShowCancelModal(true);

                }}

            />


            {/* ================================= */}
            {/* ADD MODAL */}
            {/* ================================= */}

            <AddScheduleModal

                show={showAddModal}

                close={() =>
                    setShowAddModal(false)
                }

            />


            {/* ================================= */}
            {/* UPDATE MODAL */}
            {/* ================================= */}

            <UpdateScheduleModal

                show={showUpdateModal}

                schedule={selectedSchedule}

                close={() =>
                    setShowUpdateModal(false)
                }

            />


            {/* ================================= */}
            {/* CANCEL CONFIRMATION */}
            {/* ================================= */}

            <ConfirmationModal

                show={showCancelModal}

                title="Cancel Schedule"

                message={`Are you sure you want to cancel this schedule? 
                
Passengers who have already booked will not be affected.

This schedule will no longer be available for future bookings.`}

                confirmButtonText="Cancel Schedule"

                confirmButtonClass="btn-danger"

                onCancel={() =>
                    setShowCancelModal(false)
                }

                onConfirm={() => {

                    console.log(
                        "Cancel Schedule API"
                    );

                    setShowCancelModal(false);

                }}

            />

        </div>

    );

}

export default BusSchedules;