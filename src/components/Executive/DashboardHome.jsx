import DashboardCard from "../RusableComponents/DashboardCard";
import { useEffect, useState } from "react";
import DashboardService from "../../services/DashboardService";

function DashboardHome({ setSelectedMenu }) {

    const username = localStorage.getItem("username") || "Executive";

    const [showWelcome, setShowWelcome] = useState(true);

    const [dashboard, setDashboard] = useState(null);


    useEffect(() => {

        getDashboardOverview();

    }, []);


    const getDashboardOverview = async () => {

        try {

            const response =
                await DashboardService.getDashboardOverview();

            console.log(response.data);

            setDashboard(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };


    if (!dashboard) {

        return (

            <div className="text-center mt-5">

                <h5>
                    Loading Dashboard...
                </h5>

            </div>

        );

    }


    return (

        <div className="container-fluid p-4">

            {/* Welcome Banner */}

            {

                showWelcome &&

                <div className="bg-primary text-white rounded-4 p-4 mb-4 shadow">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h3 className="fw-bold mb-2">

                                👋 Welcome Back, {username}!

                            </h3>

                            <p className="mb-0 text-white-50">

                                We're glad to see you again.
                                Manage your FastX platform efficiently.

                            </p>

                        </div>


                        <button

                            type="button"

                            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"

                            style={{
                                width: "42px",
                                height: "42px"
                            }}

                            onClick={() => setShowWelcome(false)}

                        >

                            <i className="bi bi-x-lg"></i>

                        </button>

                    </div>

                </div>

            }


            {/* Dashboard Cards */}

            <div className="row g-4">

                <div className="col-lg-3">

                    <DashboardCard

                        title="Pending Applications"

                        count={dashboard.pendingApplications}

                        icon="bi-file-earmark-text-fill"

                        color="#2563EB"

                        onClick={() =>
                            setSelectedMenu("applications")
                        }

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Bus Operators"

                        count={dashboard.busOperatorCount}

                        icon="bi-buildings-fill"

                        color="#10B981"

                        onClick={() =>
                            setSelectedMenu("operators")
                        }

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Passengers"

                        count={dashboard.passengerCount}

                        icon="bi-people-fill"

                        color="#F59E0B"

                        onClick={() =>
                            setSelectedMenu("passengers")
                        }

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Routes"

                        count={dashboard.routeCount}

                        icon="bi-signpost-fill"

                        color="#8B5CF6"

                        onClick={() =>
                            setSelectedMenu("routes")
                        }

                    />

                </div>

            </div>


            <div className="row g-4 mt-2">

                <div className="col-lg-3">

                    <DashboardCard

                        title="Amenities"

                        count={dashboard.amenityCount}

                        icon="bi-stars"

                        color="#06B6D4"

                        onClick={() =>
                            setSelectedMenu("amenities")
                        }

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Today's Bookings"

                        count={dashboard.todayBookings}

                        icon="bi-ticket-perforated-fill"

                        color="#3B82F6"

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Revenue"

                        count={`₹${dashboard.totalRevenue}`}

                        icon="bi-currency-rupee"

                        color="#22C55E"

                    />

                </div>


                <div className="col-lg-3">

                    <DashboardCard

                        title="Cancelled"

                        count={dashboard.cancelledBookings}

                        icon="bi-x-circle-fill"

                        color="#EF4444"

                    />

                </div>

            </div>


            {/* Recent Applications */}

            {/* Recent Bookings */}

        </div>

    );

}

export default DashboardHome;