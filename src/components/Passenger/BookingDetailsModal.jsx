import "./PassengerCss/BookingDetailsModal.css";

function BookingDetailsModal({

    booking,

    close,

    openTicket,

    openCancel

}) {

    if (!booking) return null;
    function formatTime(dateTime) {

        if (!dateTime) {
            return "N/A";
        }

        return new Date(dateTime).toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        );

    }

    return (

        <div className="application-modal-overlay">

            <div className="application-modal booking-modal">

                {/* Close Button */}

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>


                {/* Header */}

                <div className="modal-header-section">

                    <div className="application-icon">

                        <i className="bi bi-receipt-cutoff"></i>

                    </div>

                    <h3>

                        Booking Details

                    </h3>

                    <p>

                        View complete information about your booking.

                    </p>

                </div>


                <div className="modal-body-scroll">


                    {/* ============================= */}
                    {/* STATUS BANNER */}
                    {/* ============================= */}

                    <div className="booking-banner">

                        {

                            booking.bookingStatus === "CONFIRMED"

                            &&

                            <div className="alert alert-success">

                                <i className="bi bi-check-circle-fill me-2"></i>

                                Your booking has been confirmed.

                            </div>

                        }


                        {

                            booking.bookingStatus === "COMPLETED"

                            &&

                            <div className="alert alert-primary">

                                <i className="bi bi-check2-all me-2"></i>

                                Thank you for travelling with FastX.

                            </div>

                        }


                        {

                            booking.bookingStatus === "CANCELLED"

                            &&

                            <div className="alert alert-danger">

                                <i className="bi bi-x-circle-fill me-2"></i>

                                This booking has been cancelled.

                            </div>

                        }

                    </div>


                    {/* ============================= */}
                    {/* BOOKING INFORMATION */}
                    {/* ============================= */}

                    <h5 className="section-title">

                        <i className="bi bi-journal-check me-2"></i>

                        Booking Information

                    </h5>


                    <div className="application-details">


                        <div className="detail-item">

                            <label>

                                Booking Reference

                            </label>

                            <span>

                                {booking.bookingReference}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Passenger

                            </label>

                            <span>

                                {booking.passengerName}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Number of Tickets

                            </label>

                            <span>

                                {booking.numberOfTickets}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Booking Status

                            </label>

                            <span

                                className={`badge ${booking.bookingStatus === "CONFIRMED"

                                        ? "bg-success"

                                        : booking.bookingStatus === "COMPLETED"

                                            ? "bg-primary"

                                            : "bg-danger"

                                    }`}

                            >

                                {booking.bookingStatus}

                            </span>

                        </div>

                    </div>


                    <hr />


                    {/* ============================= */}
                    {/* JOURNEY INFORMATION */}
                    {/* ============================= */}

                    <h5 className="section-title">

                        <i className="bi bi-bus-front me-2"></i>

                        Journey Information

                    </h5>


                    <div className="application-details">


                        <div className="detail-item">

                            <label>

                                Bus Name

                            </label>

                            <span>

                                {booking.busName}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Bus Number

                            </label>

                            <span>

                                {booking.busNumber}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                From

                            </label>

                            <span>

                                {booking.originCity}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                To

                            </label>

                            <span>

                                {booking.destinationCity}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Route

                            </label>

                            <span>

                                {booking.originCity}

                                {" → "}

                                {booking.destinationCity}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Journey Date

                            </label>

                            <span>

                                {booking.journeyDate}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Departure

                            </label>

                            <span>

                                <span>
                                    {formatTime(booking.departureDateTime)}
                                </span>

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Arrival

                            </label>

                            <span>

                                <span>
                                    {formatTime(booking.arrivalDateTime)}
                                </span>
                            </span>

                        </div>

                    </div>


                    <hr />


                    {/* ============================= */}
                    {/* SEAT INFORMATION */}
                    {/* ============================= */}

                    <h5 className="section-title">

                        <i className="bi bi-grid-3x3-gap me-2"></i>

                        Seat Information

                    </h5>


                    <div className="application-details">


                        <div className="detail-item">

                            <label>

                                Seat Numbers

                            </label>

                            <span>

                                {

                                    booking.seatNumbers &&

                                        booking.seatNumbers.length > 0

                                        ? booking.seatNumbers.join(", ")

                                        : "Seat information unavailable"

                                }

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Number of Tickets

                            </label>

                            <span>

                                {booking.numberOfTickets}

                            </span>

                        </div>

                    </div>


                    <hr />


                    {/* ============================= */}
                    {/* PAYMENT INFORMATION */}
                    {/* ============================= */}

                    <h5 className="section-title">

                        <i className="bi bi-credit-card me-2"></i>

                        Payment Information

                    </h5>


                    <div className="application-details">


                        <div className="detail-item">

                            <label>

                                Payment Status

                            </label>

                            <span

                                className={`badge ${booking.paymentStatus === "SUCCESS"

                                        ? "bg-success"

                                        : booking.paymentStatus === "FAILED"

                                            ? "bg-danger"

                                            : "bg-warning text-dark"

                                    }`}

                            >

                                {booking.paymentStatus}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Amount Paid

                            </label>

                            <span>

                                ₹ {booking.totalFare}

                            </span>

                        </div>

                    </div>


                    <hr />


                    {/* ============================= */}
                    {/* TICKET INFORMATION */}
                    {/* ============================= */}

                    <h5 className="section-title">

                        <i className="bi bi-ticket-perforated me-2"></i>

                        Ticket Information

                    </h5>


                    <div className="application-details">


                        <div className="detail-item">

                            <label>

                                Booking Reference

                            </label>

                            <span>

                                {booking.bookingReference}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>

                                Ticket Status

                            </label>

                            <span

                                className={`badge ${booking.bookingStatus === "CANCELLED"

                                        ? "bg-danger"

                                        : "bg-success"

                                    }`}

                            >

                                {

                                    booking.bookingStatus === "CANCELLED"

                                        ? "CANCELLED"

                                        : "GENERATED"

                                }

                            </span>

                        </div>

                    </div>

                </div>


                {/* ============================= */}
                {/* FOOTER */}
                {/* ============================= */}

                <div className="modal-footer">


                    {/* View Ticket */}

                    <button

                        className="btn btn-outline-primary"

                        onClick={() => {

                            console.log("View Ticket Clicked");

                            openTicket();

                        }}

                    >

                        <i className="bi bi-eye-fill me-2"></i>

                        View Ticket

                    </button>


                    {/* Cancel Booking */}

                    {

                        booking.bookingStatus === "CONFIRMED"

                        &&

                        <button

                            className="btn btn-danger"

                            onClick={openCancel}

                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Cancel Booking

                        </button>

                    }


                    {/* Close */}

                    <button

                        className="btn btn-secondary"

                        onClick={close}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default BookingDetailsModal;