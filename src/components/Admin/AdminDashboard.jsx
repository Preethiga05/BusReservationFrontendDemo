import { useEffect, useState } from "react";

import AdminService from "../../services/AdminService";

import AdminSidebar from "./AdminSidebar";

import Executives from "./Executives";
import AdminProfile from "./AdminProfile";


function AdminDashboard() {
const [showBanner, setShowBanner] = useState(true);

    // =========================================================
    // ACTIVE MENU
    // =========================================================

    const [activeMenu, setActiveMenu] =
        useState("dashboard");


    // =========================================================
    // DASHBOARD DATA
    // =========================================================

    const [dashboard, setDashboard] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // =========================================================
    // FILTER STATES
    // =========================================================

    const [selectedPeriod, setSelectedPeriod] =
        useState("LAST_30_DAYS");


    const [selectedStatus, setSelectedStatus] =
        useState("ALL");


    const [period, setPeriod] =
        useState("LAST_30_DAYS");


    const [bookingStatus, setBookingStatus] =
        useState("ALL");


    // =========================================================
    // OPERATOR PAGINATION
    // =========================================================

    const [operatorPage, setOperatorPage] =
        useState(0);


    const [operatorSize, setOperatorSize] =
        useState(5);


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, [
        period,
        bookingStatus,
        operatorPage,
        operatorSize
    ]);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await AdminService.getDashboard(
                    period,
                    bookingStatus,
                    operatorPage,
                    operatorSize
                );


            setDashboard(
                response.data
            );

        }
        catch (error) {

            console.error(
                "Failed to load admin dashboard:",
                error
            );


            setError(
                "Unable to load dashboard information."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // =========================================================
    // APPLY FILTERS
    // =========================================================

    const applyFilters = () => {

        setOperatorPage(0);

        setPeriod(
            selectedPeriod
        );

        setBookingStatus(
            selectedStatus
        );

    };


    // =========================================================
    // RESET FILTERS
    // =========================================================

    const resetFilters = () => {

        setSelectedPeriod(
            "LAST_30_DAYS"
        );

        setSelectedStatus(
            "ALL"
        );

        setPeriod(
            "LAST_30_DAYS"
        );

        setBookingStatus(
            "ALL"
        );

        setOperatorPage(0);

    };


    // =========================================================
    // OPERATOR PAGINATION
    // =========================================================

    const computeOperatorPage = (
        operation
    ) => {

        switch (operation) {

            case "PREV":

                setOperatorPage(
                    operatorPage === 0
                        ? 0
                        : operatorPage - 1
                );

                break;


            case "NEXT":

                setOperatorPage(
                    operatorPage + 1
                );

                break;


            default:

                break;

        }

    };


    // =========================================================
    // OPERATOR PAGE SIZE
    // =========================================================

    const computeOperatorSize = (
        size
    ) => {

        setOperatorPage(0);

        setOperatorSize(
            Number(size)
        );

    };


    // =========================================================
    // DASHBOARD VALUES
    // =========================================================

    const totalBookings =
        dashboard?.totalBookings || 0;


    const confirmedBookings =
        dashboard?.confirmedBookings || 0;


    const cancelledBookings =
        dashboard?.cancelledBookings || 0;


    const totalRevenue =
        dashboard?.totalRevenue || 0;


    // =========================================================
    // BOOKING PERCENTAGES
    // =========================================================

    const confirmedPercentage =
        totalBookings > 0

            ? Math.round(
                (
                    confirmedBookings /
                    totalBookings
                ) * 100
            )

            : 0;


    const cancelledPercentage =
        totalBookings > 0

            ? Math.round(
                (
                    cancelledBookings /
                    totalBookings
                ) * 100
            )

            : 0;


    // =========================================================
    // OPERATORS
    // =========================================================

    const operators =
        dashboard?.topOperators || [];


    // =========================================================
    // INITIAL LOADING
    // =========================================================

    if (
        loading &&
        !dashboard
    ) {

        return (

            <div className="container-fluid py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <p className="mt-3 text-muted">

                    Loading dashboard...

                </p>

            </div>

        );

    }


    return (

        <div
            className="container-fluid bg-light min-vh-100 p-0"
        >

            <div className="row g-0">


                {/* =====================================================
                    SIDEBAR
                ===================================================== */}

                <div
                    className="col-lg-2 col-md-3"
                >

                    <AdminSidebar

                        activeMenu={
                            activeMenu
                        }

                        setActiveMenu={
                            setActiveMenu
                        }

                    />

                </div>


                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}

                <div
                    className="col-lg-10 col-md-9"
                >

                    <div
                        className="p-3 p-lg-4"
                        style={{
                            background: "#f4f8fc",
                            minHeight: "100vh"
                        }}
                    >


                        {/* =================================================
                            DASHBOARD
                        ================================================= */}

                        {

                            activeMenu === "dashboard"

                            &&

                            (

                                <>

                                    {/* =====================================
                                        WELCOME BANNER
                                    ====================================== */}

                                    {showBanner && (

                <div
                    className="alert alert-primary
                    border-0 shadow-sm rounded-4
                    d-flex justify-content-between
                    align-items-center mb-4"
                >

                    <div>

                        <h2 className="h4 fw-bold mb-2">

                            Welcome Back ADMIN👋

                        </h2>

                        <p className="mb-0">

                            Manage your FastX.

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


                                    {/* =====================================
                                        ERROR
                                    ====================================== */}

                                    {error && (

                                        <div className="alert alert-danger">

                                            <i className="bi bi-exclamation-triangle me-2"></i>

                                            {error}

                                        </div>

                                    )}


                                    {/* =====================================
                                        FILTER SECTION
                                    ====================================== */}

                                    <div
                                        className="card shadow-sm border-0 mb-4"
                                    >

                                        <div className="card-body">

                                            <div
                                                className="row g-3 align-items-end"
                                            >


                                                {/* DATE */}

                                                <div className="col-md-4">

                                                    <label className="form-label fw-semibold">

                                                        Date Range

                                                    </label>


                                                    <select
                                                        className="form-select"
                                                        value={
                                                            selectedPeriod
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPeriod(
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="TODAY">
                                                            Today
                                                        </option>

                                                        <option value="LAST_7_DAYS">
                                                            Last 7 Days
                                                        </option>

                                                        <option value="LAST_30_DAYS">
                                                            Last 30 Days
                                                        </option>

                                                        <option value="THIS_MONTH">
                                                            This Month
                                                        </option>

                                                        <option value="LAST_MONTH">
                                                            Last Month
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* STATUS */}

                                                <div className="col-md-4">

                                                    <label className="form-label fw-semibold">

                                                        Booking Status

                                                    </label>


                                                    <select
                                                        className="form-select"
                                                        value={
                                                            selectedStatus
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedStatus(
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


                                                {/* BUTTONS */}

                                                <div className="col-md-4">

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={
                                                                applyFilters
                                                            }
                                                            disabled={
                                                                loading
                                                            }
                                                        >

                                                            <i className="bi bi-funnel me-2"></i>

                                                            Apply Filters

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={
                                                                resetFilters
                                                            }
                                                            disabled={
                                                                loading
                                                            }
                                                        >

                                                            <i className="bi bi-arrow-counterclockwise me-2"></i>

                                                            Reset

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =====================================
                                        BOOKINGS + REVENUE
                                    ====================================== */}

                                    <div className="row g-3 mb-4">


                                        {/* BOOKINGS */}

                                        <div className="col-xl-6">

                                            <div
                                                className="card shadow-sm border-0 h-100"
                                            >

                                                <div
                                                    className="card-header bg-white border-0 d-flex justify-content-between align-items-center"
                                                >

                                                    <div>

                                                        <h5 className="mb-1 fw-semibold">

                                                            Bookings Overview

                                                        </h5>


                                                        <small className="text-secondary">

                                                            Booking activity for the selected period

                                                        </small>

                                                    </div>


                                                    {loading && (

                                                        <div
                                                            className="spinner-border spinner-border-sm text-primary"
                                                            role="status"
                                                        >
                                                        </div>

                                                    )}

                                                </div>


                                                <div className="card-body">

                                                    <div className="row align-items-center">


                                                        {/* TOTAL */}

                                                        <div className="col-md-6 text-center">

                                                            <div className="mb-3">

                                                                <i className="bi bi-ticket-perforated-fill text-primary fs-1"></i>

                                                            </div>


                                                            <h2 className="fw-bold text-primary">

                                                                {totalBookings.toLocaleString(
                                                                    "en-IN"
                                                                )}

                                                            </h2>


                                                            <p className="text-secondary mb-3">

                                                                Total Bookings

                                                            </p>


                                                            <div
                                                                className="progress"
                                                                style={{
                                                                    height: "10px"
                                                                }}
                                                            >

                                                                <div
                                                                    className="progress-bar bg-primary"
                                                                    style={{
                                                                        width:
                                                                            totalBookings > 0
                                                                                ? "100%"
                                                                                : "0%"
                                                                    }}
                                                                >
                                                                </div>

                                                            </div>

                                                        </div>


                                                        {/* BREAKDOWN */}

                                                        <div className="col-md-6">


                                                            {/* CONFIRMED */}

                                                            <div
                                                                className="d-flex justify-content-between align-items-center mb-4"
                                                            >

                                                                <span>

                                                                    <span className="badge bg-success me-2">
                                                                        &nbsp;
                                                                    </span>

                                                                    Confirmed

                                                                </span>


                                                                <div className="text-end">

                                                                    <strong>

                                                                        {confirmedBookings.toLocaleString(
                                                                            "en-IN"
                                                                        )}

                                                                    </strong>


                                                                    <small className="text-success d-block">

                                                                        {confirmedPercentage}%

                                                                    </small>

                                                                </div>

                                                            </div>


                                                            {/* CANCELLED */}

                                                            <div
                                                                className="d-flex justify-content-between align-items-center mb-4"
                                                            >

                                                                <span>

                                                                    <span className="badge bg-danger me-2">
                                                                        &nbsp;
                                                                    </span>

                                                                    Cancelled

                                                                </span>


                                                                <div className="text-end">

                                                                    <strong>

                                                                        {cancelledBookings.toLocaleString(
                                                                            "en-IN"
                                                                        )}

                                                                    </strong>


                                                                    <small className="text-danger d-block">

                                                                        {cancelledPercentage}%

                                                                    </small>

                                                                </div>

                                                            </div>


                                                            {/* OTHER */}

                                                            <div
                                                                className="d-flex justify-content-between align-items-center"
                                                            >

                                                                <span>

                                                                    <span className="badge bg-secondary me-2">
                                                                        &nbsp;
                                                                    </span>

                                                                    Other

                                                                </span>


                                                                <strong>
                                                                    0
                                                                </strong>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        {/* REVENUE */}

                                        <div className="col-xl-6">

                                            <div
                                                className="card shadow-sm border-0 h-100"
                                            >

                                                <div
                                                    className="card-header bg-white border-0"
                                                >

                                                    <h5 className="mb-1 fw-semibold">

                                                        Revenue Overview

                                                    </h5>


                                                    <small className="text-secondary">

                                                        Revenue for the selected period

                                                    </small>

                                                </div>


                                                <div className="card-body">

                                                    <p className="text-secondary mb-1">

                                                        Total Revenue

                                                    </p>


                                                    <h2 className="fw-bold text-primary mb-4">

                                                        ₹{" "}

                                                        {Number(
                                                            totalRevenue
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}

                                                    </h2>


                                                    <div className="mb-4">

                                                        <div
                                                            className="d-flex justify-content-between mb-2"
                                                        >

                                                            <small className="text-secondary">

                                                                Confirmed booking revenue

                                                            </small>


                                                            <small className="fw-semibold text-success">

                                                                {confirmedPercentage}%

                                                            </small>

                                                        </div>


                                                        <div
                                                            className="progress"
                                                            style={{
                                                                height: "10px"
                                                            }}
                                                        >

                                                            <div
                                                                className="progress-bar bg-primary"
                                                                style={{
                                                                    width:
                                                                        `${confirmedPercentage}%`
                                                                }}
                                                            >
                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div
                                                        className="bg-primary-subtle rounded-3 p-3"
                                                    >

                                                        <div className="d-flex align-items-center">

                                                            <div
                                                                className="bg-primary text-white rounded-3 p-3 me-3"
                                                            >

                                                                <i className="bi bi-currency-rupee fs-4"></i>

                                                            </div>


                                                            <div>

                                                                <small className="text-secondary d-block">

                                                                    Selected Period

                                                                </small>


                                                                <span className="fw-semibold">

                                                                    {
                                                                        period === "TODAY"
                                                                            ? "Today"
                                                                            : period === "LAST_7_DAYS"
                                                                                ? "Last 7 Days"
                                                                                : period === "LAST_30_DAYS"
                                                                                    ? "Last 30 Days"
                                                                                    : period === "THIS_MONTH"
                                                                                        ? "This Month"
                                                                                        : "Last Month"
                                                                    }

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =====================================
                                        TOP BUS OPERATORS
                                    ====================================== */}

                                    <div className="row">

                                        <div className="col-12">

                                            <div
                                                className="card shadow-sm border-0"
                                            >


                                                {/* HEADER */}

                                                <div
                                                    className="card-header bg-white border-0 d-flex justify-content-between align-items-center"
                                                >

                                                    <div>

                                                        <h5 className="mb-1 fw-semibold">

                                                            Top Bus Operators

                                                        </h5>


                                                        <small className="text-secondary">

                                                            Based on confirmed bookings

                                                        </small>

                                                    </div>


                                                    <span
                                                        className="badge bg-primary-subtle text-primary"
                                                    >

                                                        Page{" "}

                                                        {operatorPage + 1}

                                                    </span>

                                                </div>


                                                {/* BODY */}

                                                <div className="card-body">


                                                    {operators.length > 0 ? (

                                                        operators.map(
                                                            (operator) => (

                                                                <div
                                                                    key={
                                                                        operator.operatorName
                                                                    }
                                                                    className="mb-4"
                                                                >

                                                                    <div
                                                                        className="d-flex justify-content-between align-items-center mb-2"
                                                                    >

                                                                        <div>

                                                                            <strong>

                                                                                {
                                                                                    operator.operatorName
                                                                                }

                                                                            </strong>


                                                                            <small className="text-secondary d-block">

                                                                                {
                                                                                    operator.bookings
                                                                                }{" "}

                                                                                {
                                                                                    operator.bookings === 1
                                                                                        ? "Booking"
                                                                                        : "Bookings"
                                                                                }

                                                                            </small>

                                                                        </div>


                                                                        <strong className="text-primary">

                                                                            {
                                                                                operator.percentage
                                                                            }%

                                                                        </strong>

                                                                    </div>


                                                                    <div
                                                                        className="progress"
                                                                        role="progressbar"
                                                                        style={{
                                                                            height: "8px"
                                                                        }}
                                                                    >

                                                                        <div
                                                                            className="progress-bar bg-primary"
                                                                            style={{
                                                                                width:
                                                                                    `${operator.percentage}%`
                                                                            }}
                                                                        >
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            )
                                                        )

                                                    ) : (

                                                        <div
                                                            className="text-center text-muted py-5"
                                                        >

                                                            <i className="bi bi-bus-front fs-2 d-block mb-2"></i>

                                                            No operator data available.

                                                        </div>

                                                    )}


                                                    {/* PAGINATION */}

                                                    <div
                                                        className="d-flex justify-content-center align-items-center mt-4"
                                                    >

                                                        <nav>

                                                            <ul className="pagination mb-0">


                                                                {/* PREVIOUS */}

                                                                <li
                                                                    className={
                                                                        `page-item ${operatorPage === 0
                                                                            ? "disabled"
                                                                            : ""
                                                                        }`
                                                                    }
                                                                >

                                                                    <button
                                                                        type="button"
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            computeOperatorPage(
                                                                                "PREV"
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            operatorPage === 0 ||
                                                                            loading
                                                                        }
                                                                    >

                                                                        <i className="bi bi-chevron-left me-1"></i>

                                                                        Previous

                                                                    </button>

                                                                </li>


                                                                {/* CURRENT PAGE */}

                                                                <li className="page-item active">

                                                                    <button
                                                                        type="button"
                                                                        className="page-link"
                                                                    >

                                                                        {operatorPage + 1}

                                                                    </button>

                                                                </li>


                                                                {/* NEXT */}

                                                                <li
                                                                    className={
                                                                        `page-item ${operators.length < operatorSize
                                                                            ? "disabled"
                                                                            : ""
                                                                        }`
                                                                    }
                                                                >

                                                                    <button
                                                                        type="button"
                                                                        className="page-link"
                                                                        onClick={() =>
                                                                            computeOperatorPage(
                                                                                "NEXT"
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            loading ||
                                                                            operators.length < operatorSize
                                                                        }
                                                                    >

                                                                        Next

                                                                        <i className="bi bi-chevron-right ms-1"></i>

                                                                    </button>

                                                                </li>

                                                            </ul>

                                                        </nav>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </>

                            )

                        }


                        {/* =================================================
                            EXECUTIVES
                        ================================================= */}

                        {

                            activeMenu === "executives"

                            &&

                            <Executives />

                        }


                        {/* =================================================
                            PROFILE
                        ================================================= */}

                        {
                            activeMenu === "profile" &&
                            <AdminProfile />
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AdminDashboard;