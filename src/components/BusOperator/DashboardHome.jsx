import { useState } from "react";
import "./BusOperatorCss/DashboardHome.css";

function DashboardHome() {

    const [showBanner, setShowBanner] = useState(true);

    const todayTrips = [

        {
            bus: "KPN Travels",
            route: "Chennai → Madurai",
            booked: 34,
            total: 40,
            status: "Boarding Soon"
        },

        {
            bus: "Sai Travels",
            route: "Salem → Bangalore",
            booked: 28,
            total: 40,
            status: "On Time"
        },

        {
            bus: "GreenLine",
            route: "Coimbatore → Chennai",
            booked: 40,
            total: 40,
            status: "Full"
        }

    ];

    const upcomingTrips = [

        {
            bus: "KPN Travels",
            departure: "09:30 PM",
            arrival: "05:30 AM"
        },

        {
            bus: "Sai Travels",
            departure: "10:15 PM",
            arrival: "06:00 AM"
        },

        {
            bus: "GreenLine",
            departure: "11:00 PM",
            arrival: "06:45 AM"
        }

    ];

    return (

        <div className="dashboard-home">

            {
                showBanner &&

                <div className="welcome-banner">

                    <div>

                        <h2>

                            Welcome Back, Sai Travels 👋

                        </h2>

                        <p>

                            Manage your fleet, schedules and bookings efficiently with FastX.

                        </p>

                    </div>

                    <button

                        className="banner-close"

                        onClick={() => setShowBanner(false)}

                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>

            }

            <div className="row mt-4">

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card">

                        <i className="bi bi-bus-front stats-icon"></i>

                        <h6>My Buses</h6>

                        <h2>7</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card">

                        <i className="bi bi-calendar-check stats-icon"></i>

                        <h6>Active Schedules</h6>

                        <h2>18</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card">

                        <i className="bi bi-ticket-perforated stats-icon"></i>

                        <h6>Today's Bookings</h6>

                        <h2>46</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card">

                        <i className="bi bi-cash-coin stats-icon"></i>

                        <h6>Today's Revenue</h6>

                        <h2>₹18,250</h2>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-5">

                    <div className="dashboard-card">

                        <h4>

                            Fleet Overview

                        </h4>

                        <div className="overview-row">

                            <span>Total Buses</span>

                            <strong>7</strong>

                        </div>

                        <div className="overview-row">

                            <span>Active Buses</span>

                            <strong>6</strong>

                        </div>

                        <div className="overview-row">

                            <span>Inactive Buses</span>

                            <strong>1</strong>

                        </div>

                        <div className="overview-row">

                            <span>Total Seats</span>

                            <strong>280</strong>

                        </div>

                    </div>

                </div>

                <div className="col-lg-7">

                    <div className="dashboard-card">

                        <h4>

                            Quick Actions

                        </h4>

                        <div className="row mt-3">

                            <div className="col-md-6 mb-3">

                                <button className="btn quick-btn">

                                    <i className="bi bi-plus-circle"></i>

                                    Add Bus

                                </button>

                            </div>

                            <div className="col-md-6 mb-3">

                                <button className="btn quick-btn">

                                    <i className="bi bi-calendar-plus"></i>

                                    Create Schedule

                                </button>

                            </div>

                            <div className="col-md-6">

                                <button className="btn quick-btn">

                                    <i className="bi bi-ticket"></i>

                                    View Bookings

                                </button>

                            </div>

                            <div className="col-md-6">

                                <button className="btn quick-btn">

                                    <i className="bi bi-bus-front"></i>

                                    Manage Buses

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
                        <div className="row mt-4">

                <div className="col-lg-7">

                    <div className="dashboard-card">

                        <h4>

                            Today's Trips

                        </h4>

                        <table className="table align-middle mt-3">

                            <thead>

                                <tr>

                                    <th>Bus</th>

                                    <th>Route</th>

                                    <th>Occupancy</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    todayTrips.map((trip, index) => (

                                        <tr key={index}>

                                            <td>

                                                {trip.bus}

                                            </td>

                                            <td>

                                                {trip.route}

                                            </td>

                                            <td>

                                                <strong>

                                                    {trip.booked} / {trip.total}

                                                </strong>

                                            </td>

                                            <td>

                                                {

                                                    trip.status === "Full"

                                                    ?

                                                    <span className="badge bg-danger">

                                                        Full

                                                    </span>

                                                    :

                                                    trip.status === "Boarding Soon"

                                                    ?

                                                    <span className="badge bg-warning text-dark">

                                                        Boarding

                                                    </span>

                                                    :

                                                    <span className="badge bg-success">

                                                        On Time

                                                    </span>

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="col-lg-5">

                    <div className="dashboard-card">

                        <h4>

                            Upcoming Departures

                        </h4>

                        <table className="table mt-3">

                            <thead>

                                <tr>

                                    <th>Bus</th>

                                    <th>Departure</th>

                                    <th>Arrival</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    upcomingTrips.map((trip, index) => (

                                        <tr key={index}>

                                            <td>

                                                {trip.bus}

                                            </td>

                                            <td>

                                                {trip.departure}

                                            </td>

                                            <td>

                                                {trip.arrival}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardHome;