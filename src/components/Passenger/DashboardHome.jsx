import "./PassengerCss/DashboardHome.css";
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

        <div className="dashboard-home">
            {/* Travel Summary */}

            <div>

                <h4 className="section-title">

                    Travel Summary

                </h4>

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <div className="summary-card">

                            <div className="summary-icon">

                                <i className="bi bi-journal-check"></i>

                            </div>

                            <h2>{summary.totalBookings}</h2>

                            <p>Total Bookings</p>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="summary-card">

                            <div className="summary-icon">

                                <i className="bi bi-calendar-event"></i>

                            </div>

                            <h2>{summary.upcomingTrips}</h2>

                            <p>Upcoming Trips</p>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="summary-card">

                            <div className="summary-icon">

                                <i className="bi bi-check-circle"></i>

                            </div>

                            <h2>{summary.completedTrips}</h2>

                            <p>Completed Trips</p>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="summary-card">

                            <div className="summary-icon">

                                <i className="bi bi-x-circle"></i>

                            </div>

                            <h2>{summary.cancelledTrips}</h2>

                            <p>Cancelled Trips</p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Upcoming Journey */}

            <div className="dashboard-card journey-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4 className="section-title mb-0">

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

                            <div className="route">

                                {upcomingJourney.originCity}

                                <i className="bi bi-arrow-right mx-2"></i>

                                {upcomingJourney.destinationCity}

                            </div>

                            <div className="info-row">

                                <div className="info-box">

                                    <label>Bus</label>

                                    <span>

                                        {upcomingJourney.busName}

                                    </span>

                                </div>

                                <div className="info-box">

                                    <label>Travel Date</label>

                                    <span>

                                        {upcomingJourney.journeyDate}

                                    </span>

                                </div>

                                <div className="info-box">

                                    <label>Departure</label>

                                    <span>

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

                                <div className="info-box">

                                    <label>Seat</label>

                                    <span>
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

                        </>

                        :

                        <div className="text-center py-4">

                            <i

                                className="bi bi-bus-front"

                                style={{

                                    fontSize: "3rem",

                                    color: "#bdbdbd"

                                }}

                            ></i>

                            <h5 className="mt-3">

                                No Upcoming Trips

                            </h5>

                            <p className="text-muted">

                                Your next journey will appear here.

                            </p>

                        </div>

                }

            </div>

            {/* Recent Bookings */}

            <div className="dashboard-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4 className="section-title mb-0">

                        Recent Bookings

                    </h4>

                </div>

                {

                    recentBookings.length === 0 ?

                        <p className="text-center text-muted">

                            No bookings found.

                        </p>

                        :

                        recentBookings.map(booking => (

                            <div

                                key={booking.bookingId}

                                className="booking-item"

                            >

                                <div>

                                    <div className="booking-route">

                                        {booking.originCity}

                                        {" → "}

                                        {booking.destinationCity}

                                    </div>

                                    <div className="booking-date">

                                        {booking.journeyDate}

                                    </div>

                                </div>

                                <span

                                    className={`booking-status ${booking.bookingStatus === "CONFIRMED"

                                        ? "status-confirmed"

                                        : booking.bookingStatus === "CANCELLED"

                                            ? "status-cancelled"

                                            : "status-completed"

                                        }`}

                                >

                                    {booking.bookingStatus}

                                </span>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default DashboardHome;