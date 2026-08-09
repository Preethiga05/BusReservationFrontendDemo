import { useLocation, useNavigate } from "react-router-dom";

import "../css/TicketPage.css";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function TicketPage() {
    const ticketRef = useRef(null);

    const navigate = useNavigate();

    const { state } = useLocation();

    const {

        booking,

        passengers,

        fareSummary,

        paymentSuccess

    } = state;

    const downloadTicket = async () => {

        const canvas = await html2canvas(ticketRef.current, {

            scale: 2,
            useCORS: true

        });

        const image = canvas.toDataURL("image/png");

        const pdf = new jsPDF(

            "p",

            "mm",

            "a4"

        );

        const pageWidth = pdf.internal.pageSize.getWidth();

        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(

            image,

            "PNG",

            0,

            0,

            pageWidth,

            pageHeight

        );

        pdf.save(`FastX-${booking.bookingReference}.pdf`);

    };

    return (

        <div className="ticket-page">

            <div className="ticket-container">

                {
                    paymentSuccess &&

                    <div className="payment-success-banner">

                        <i className="bi bi-check-circle-fill"></i>

                        <div>

                            <h4>

                                Payment Successful

                            </h4>

                            <p>

                                Your booking has been confirmed successfully.

                            </p>

                        </div>

                    </div>
                }

                <div
                    className="ticket-card"
                    ref={ticketRef}
                >

                    <div className="ticket-header">

                        <h2>

                            FastX Bus Ticket

                        </h2>

                        <span>

                            Booking Reference

                        </span>

                        <h4>

                            {booking.bookingReference}

                        </h4>

                    </div>

                    <hr />

                    <div className="ticket-section">

                        <h5>

                            Journey Details

                        </h5>

                        <div className="ticket-grid">

                            <div>

                                <small>

                                    Bus

                                </small>

                                <p>

                                    {booking.busName}

                                </p>

                            </div>

                            <div>

                                <small>

                                    Bus Number

                                </small>

                                <p>

                                    {booking.busNumber}

                                </p>

                            </div>

                            <div>

                                <small>

                                    From

                                </small>

                                <p>

                                    {booking.originCity}

                                </p>

                            </div>

                            <div>

                                <small>

                                    To

                                </small>

                                <p>

                                    {booking.destinationCity}

                                </p>

                            </div>

                            <div>

                                <small>

                                    Journey Date

                                </small>

                                <p>

                                    {booking.journeyDate}

                                </p>

                            </div>

                            <div>

                                <small>

                                    Departure

                                </small>

                                <p>

                                    {booking.departureDateTime}

                                </p>

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="ticket-section">

                        <h5>

                            Passenger Details

                        </h5>

                        {

                            passengers.map(

                                (passenger, index) => (

                                    <div

                                        key={index}

                                        className="ticket-passenger"

                                    >

                                        <span>

                                            {passenger.fullName}

                                        </span>

                                        <span>

                                            {passenger.gender}

                                        </span>

                                        <span>

                                            {passenger.age} yrs

                                        </span>

                                        <span>

                                            Seat {passenger.seatNumber}

                                        </span>

                                    </div>

                                )

                            )

                        }

                    </div>

                    <hr />

                    <div className="ticket-section">

                        <h5>

                            Fare Details

                        </h5>

                        <div className="fare-row">

                            <span>

                                Seat Fare

                            </span>

                            <span>

                                ₹ {fareSummary.seatFare}

                            </span>

                        </div>

                        <div className="fare-row">

                            <span>

                                Convenience Fee

                            </span>

                            <span>

                                ₹ {fareSummary.convenienceFee}

                            </span>

                        </div>

                        <div className="fare-row">

                            <span>

                                GST

                            </span>

                            <span>

                                ₹ {fareSummary.gst}

                            </span>

                        </div>

                        <div className="fare-total">

                            <span>

                                Total Paid

                            </span>

                            <strong>

                                ₹ {fareSummary.totalFare}

                            </strong>

                        </div>

                    </div>
                    </div>

                    <div className="ticket-buttons">

                        <button
                            className="btn btn-outline-primary"
                            onClick={downloadTicket}
                        >
                            <i className="bi bi-download"></i>
                            Download Ticket
                        </button>

                        <button

                            className="btn btn-primary"

                            onClick={() =>

                                navigate("/passenger-dashboard")

                            }

                        >

                            My Trips

                        </button>

                    </div>

                </div>

            </div>

        

    );

}

export default TicketPage;