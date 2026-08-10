import { useEffect, useState } from "react";
import PassengerService from "../../services/PassengerService";

function DashboardHome() {

    const [summary, setSummary] = useState({

        totalBookings: 0,

        upcomingTrips: 0,

        completedTrips: 0,

        cancelledTrips: 0

    });

    const [upcomingJourney, setUpcomingJourney] = useState(null);

    const [recentBookings, setRecentBookings] = useState([]);


    useEffect(() => {

        loadDashboard();

    }, []);


    async function loadDashboard() {

        try {

            const response =
                await PassengerService.getDashboard();

            const dashboard = response.data;

            console.log(dashboard);

            setSummary({

                totalBookings: dashboard.totalBookings,

                upcomingTrips: dashboard.upcomingTrips,

                completedTrips: dashboard.completedTrips,

                cancelledTrips: dashboard.cancelledTrips

            });

            setUpcomingJourney(
                dashboard.upcomingJourney
            );

            setRecentBookings(
                dashboard.recentBookings
            );

        }

        catch (error) {

            console.log(error);

        }

    }


    return (

        <div className="d-flex flex-column gap-4">


            {/* ================= Travel Summary ================= */}

            <div>

                <h4 className="text-primary fw-bold mb-3">

                    Travel Summary

                </h4>


                <div className="row g-4">


                    {/* Total Bookings */}

                    <div className="col-lg-3 col-md-6">

                        <div className="card h-100 text-center border rounded-4 shadow-sm">

                            <div className="card-body p-4">

                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        fontSize: "28px"
                                    }}
                                >

                                    <i className="bi bi-journal-check"></i>

                                </div>

                                <h2 className="fw-bold text-primary mb-2">

                                    {summary.totalBookings}

                                </h2>

                                <p className="text-secondary fw-medium mb-0">

                                    Total Bookings

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Upcoming Trips */}

                    <div className="col-lg-3 col-md-6">

                        <div className="card h-100 text-center border rounded-4 shadow-sm">

                            <div className="card-body p-4">

                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        fontSize: "28px"
                                    }}
                                >

                                    <i className="bi bi-calendar-event"></i>

                                </div>

                                <h2 className="fw-bold text-primary mb-2">

                                    {summary.upcomingTrips}

                                </h2>

                                <p className="text-secondary fw-medium mb-0">

                                    Upcoming Trips

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Completed Trips */}

                    <div className="col-lg-3 col-md-6">

                        <div className="card h-100 text-center border rounded-4 shadow-sm">

                            <div className="card-body p-4">

                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        fontSize: "28px"
                                    }}
                                >

                                    <i className="bi bi-check-circle"></i>

                                </div>

                                <h2 className="fw-bold text-primary mb-2">

                                    {summary.completedTrips}

                                </h2>

                                <p className="text-secondary fw-medium mb-0">

                                    Completed Trips

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Cancelled Trips */}

                    <div className="col-lg-3 col-md-6">

                        <div className="card h-100 text-center border rounded-4 shadow-sm">

                            <div className="card-body p-4">

                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        fontSize: "28px"
                                    }}
                                >

                                    <i className="bi bi-x-circle"></i>

                                </div>

                                <h2 className="fw-bold text-primary mb-2">

                                    {summary.cancelledTrips}

                                </h2>

                                <p className="text-secondary fw-medium mb-0">

                                    Cancelled Trips

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= Upcoming Journey ================= */}

            <div className="card border-0 border-start border-primary border-4 rounded-4 shadow-sm">

                <div className="card-body p-4">


                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h4 className="text-primary fw-bold mb-0">

                            Upcoming Journey

                        </h4>


                        {

                            upcomingJourney &&

                            <span className="badge bg-success">

                                {upcomingJourney.bookingStatus}

                            </span>

                        }

                    </div>


                    {

                        upcomingJourney ?

                            <>

                                <div className="fs-5 fw-bold text-primary">

                                    {upcomingJourney.originCity}

                                    <i className="bi bi-arrow-right mx-3"></i>

                                    {upcomingJourney.destinationCity}

                                </div>


                                <div className="row g-4 mt-2">


                                    <div className="col-lg-3 col-md-6">

                                        <div>

                                            <label className="d-block text-secondary small fw-semibold mb-1">

                                                Bus

                                            </label>

                                            <span className="fw-semibold">

                                                {upcomingJourney.busName}

                                            </span>

                                        </div>

                                    </div>


                                    <div className="col-lg-3 col-md-6">

                                        <div>

                                            <label className="d-block text-secondary small fw-semibold mb-1">

                                                Travel Date

                                            </label>

                                            <span className="fw-semibold">

                                                {upcomingJourney.journeyDate}

                                            </span>

                                        </div>

                                    </div>


                                    <div className="col-lg-3 col-md-6">

                                        <div>

                                            <label className="d-block text-secondary small fw-semibold mb-1">

                                                Departure

                                            </label>

                                            <span className="fw-semibold">

                                                {

                                                    new Date(

                                                        upcomingJourney.departureDateTime

                                                    ).toLocaleTimeString(

                                                        [],

                                                        {

                                                            hour: "2-digit",

                                                            minute: "2-digit"

                                                        }

                                                    )

                                                }

                                            </span>

                                        </div>

                                    </div>


                                    <div className="col-lg-3 col-md-6">

                                        <div>

                                            <label className="d-block text-secondary small fw-semibold mb-1">

                                                Seat

                                            </label>

                                            <span className="fw-semibold">

                                                {

                                                    upcomingJourney.seatNumbers &&

                                                    upcomingJourney.seatNumbers.length > 0

                                                        ?

                                                        upcomingJourney.seatNumbers.join(", ")

                                                        :

                                                        "--"

                                                }

                                            </span>

                                        </div>

                                    </div>


                                </div>

                            </>

                            :

                            <div className="text-center py-4">

                                <i

                                    className="bi bi-bus-front text-secondary"

                                    style={{

                                        fontSize: "3rem"

                                    }}

                                ></i>

                                <h5 className="mt-3">

                                    No Upcoming Trips

                                </h5>

                                <p className="text-muted mb-0">

                                    Your next journey will appear here.

                                </p>

                            </div>

                    }

                </div>

            </div>


            {/* ================= Recent Bookings ================= */}

            <div className="card border-0 rounded-4 shadow-sm">

                <div className="card-body p-4">


                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h4 className="text-primary fw-bold mb-0">

                            Recent Bookings

                        </h4>

                    </div>


                    {

                        recentBookings.length === 0 ?

                            <p className="text-center text-muted mb-0">

                                No bookings found.

                            </p>

                            :

                            recentBookings.map(booking => (

                                <div

                                    key={booking.bookingId}

                                    className="d-flex justify-content-between align-items-center py-3 border-bottom"

                                >

                                    <div>

                                        <div className="fw-semibold text-primary">

                                            {booking.originCity}

                                            {" → "}

                                            {booking.destinationCity}

                                        </div>

                                        <div className="text-secondary small">

                                            {booking.journeyDate}

                                        </div>

                                    </div>


                                    <span

                                        className={

                                            `badge rounded-pill px-3 py-2 ${
                                                booking.bookingStatus === "CONFIRMED"

                                                    ? "bg-success"

                                                    : booking.bookingStatus === "CANCELLED"

                                                        ? "bg-danger"

                                                        : "bg-primary"
                                            }`

                                        }

                                    >

                                        {booking.bookingStatus}

                                    </span>

                                </div>

                            ))

                    }

                </div>

            </div>

        </div>

    );

}

export default DashboardHome;