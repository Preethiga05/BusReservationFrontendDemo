import Navbar from "../components/Navbar";
import { useState } from "react";
import "../css/partnerWithFastX.css";
import PartnerApplication from "../components/Partner/PartnerApplication";

function PartnerWithFastX() {
    const [showApplication, setShowApplication] = useState(false);

    return (

        <div className="container-fluid p-0">

            <Navbar />

            <div className="container-fluid partner-page">

                <div className="partner-hero">

                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="hero-badge">
                                Partner Program
                            </span>

                            <h1>
                                Partner With
                                <span> FastX</span>
                            </h1>

                            <p>
                                Grow your bus business with India's trusted
                                reservation platform. Reach more passengers,
                                manage schedules effortlessly, and increase
                                your revenue with FastX.
                            </p>

                            <button className="btn hero-btn" onClick={() => setShowApplication(true)}>
                                Apply Now
                            </button>

                        </div>

                        <div className="col-lg-5 text-center">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3448/3448339.png"
                                alt="Partner"
                                className="partner-image"
                            />

                        </div>

                    </div>

                </div>
                {/* Why Partner Section */}

                <div className="container mt-5 mb-5">

                    <div className="text-center mb-5">

                        <h2 className="section-title">
                            Why Partner With FastX?
                        </h2>

                        <p className="section-subtitle">
                            Join India's growing network of trusted bus operators and expand your business with powerful digital tools.
                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-lg-3 col-md-6">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    <i className="bi bi-people-fill"></i>
                                </div>

                                <h5>More Customers</h5>

                                <p>
                                    Reach thousands of passengers every day across multiple cities.
                                </p>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    <i className="bi bi-cash-stack"></i>
                                </div>

                                <h5>Secure Payments</h5>

                                <p>
                                    Receive secure online payments with complete booking transparency.
                                </p>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    <i className="bi bi-bar-chart-fill"></i>
                                </div>

                                <h5>Business Insights</h5>

                                <p>
                                    Monitor bookings, schedules and business performance in real time.
                                </p>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    <i className="bi bi-headset"></i>
                                </div>

                                <h5>Dedicated Support</h5>

                                <p>
                                    Our support team is always ready to help your business succeed.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
                {/* Statistics Section */}

                <div className="container-fluid partner-page">

                    <div className="stats-section">

                        <div className="row text-center">

                            <div className="col-lg-3 col-md-6">

                                <div className="stat-card">

                                    <h2>10K+</h2>

                                    <p>Daily Bookings</p>

                                </div>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <div className="stat-card">

                                    <h2>500+</h2>

                                    <p>Partner Operators</p>

                                </div>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <div className="stat-card">

                                    <h2>120+</h2>

                                    <p>Cities Connected</p>

                                </div>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <div className="stat-card">

                                    <h2>99.9%</h2>

                                    <p>Platform Uptime</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {
    showApplication &&

    <PartnerApplication
        close={() => setShowApplication(false)}
    />
}

        </div>

    );

}

export default PartnerWithFastX;