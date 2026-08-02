import DashboardCard from "../RusableComponents/DashboardCard";
import "./ExecutiveCss/DashboardHome.css";
import { useState } from "react";
function DashboardHome({ setSelectedMenu }) {
    const username = localStorage.getItem("username") || "Executive";
    const [showWelcome, setShowWelcome] = useState(true);

    return (

        <div className="container-fluid p-4">
            <div className="dashboard-home">

            {
                showWelcome &&

                <div className="welcome-banner">

                    <div>

                        <h3>

                            👋 Welcome Back, {username}!

                        </h3>

                        <p>

                            We're glad to see you again.
                            Manage your FastX platform efficiently.

                        </p>

                    </div>

                    <button

                        className="close-banner-btn"

                        onClick={() => setShowWelcome(false)}

                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>

            }

            <div className="row g-4">

                <div className="col-lg-3">

                    <DashboardCard

                        title="Pending Applications"

                        count={12}

                        icon="bi-file-earmark-text-fill"

                        color="#2563EB"

                        onClick={() => setSelectedMenu("applications")}

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Bus Operators"

                        count={48}

                        icon="bi-buildings-fill"

                        color="#10B981"

                        onClick={() => setSelectedMenu("operators")}

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Passengers"

                        count={1250}

                        icon="bi-people-fill"

                        color="#F59E0B"

                        onClick={() => setSelectedMenu("passengers")}

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Routes"

                        count={80}

                        icon="bi-signpost-fill"

                        color="#8B5CF6"

                        onClick={() => setSelectedMenu("routes")}

                    />

                </div>

            </div>

            <div className="row g-4 mt-2">

                <div className="col-lg-3">

                    <DashboardCard

                        title="Amenities"

                        count={15}

                        icon="bi-stars"

                        color="#06B6D4"

                        onClick={() => setSelectedMenu("amenities")}

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Today's Bookings"

                        count={165}

                        icon="bi-ticket-perforated-fill"

                        color="#3B82F6"

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Revenue"

                        count="₹1.8L"

                        icon="bi-currency-rupee"

                        color="#22C55E"

                    />

                </div>

                <div className="col-lg-3">

                    <DashboardCard

                        title="Cancelled"

                        count={8}

                        icon="bi-x-circle-fill"

                        color="#EF4444"

                    />

                </div>

            </div>
            </div>

            {/* Recent Applications */}

            {/* Recent Bookings */}

        </div>

    );

}

export default DashboardHome;