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

        <div
            className="modal show d-block bg-dark bg-opacity-50"
            tabIndex="-1"
            style={{ zIndex: 9999 }}
        >

            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">

                <div className="modal-content rounded-4 shadow-lg">


                    {/* ============================= */}
                    {/* HEADER */}
                    {/* ============================= */}

                    <div className="modal-header border-0 text-center d-block position-relative pt-4">

                        <button

                            type="button"

                            className="btn-close position-absolute top-0 end-0 m-3"

                            onClick={close}

                        >
                        </button>


                        <div
                            className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex justify-content-center align-items-center mx-auto mb-3"
                            style={{
                                width: "75px",
                                height: "75px"
                            }}
                        >

                            <i className="bi bi-receipt-cutoff fs-2"></i>

                        </div>


                        <h3 className="fw-bold mb-2">

                            Booking Details

                        </h3>


                        <p className="text-secondary mb-0">

                            View complete information about your booking.

                        </p>

                    </div>


                    {/* ============================= */}
                    {/* BODY */}
                    {/* ============================= */}

                    <div className="modal-body px-4 px-md-5">


                        {/* ============================= */}
                        {/* STATUS BANNER */}
                        {/* ============================= */}

                        <div className="mb-4">

                            {

                                booking.bookingStatus === "CONFIRMED"

                                &&

                                <div className="alert alert-success rounded-3 fw-semibold mb-0">

                                    <i className="bi bi-check-circle-fill me-2"></i>

                                    Your booking has been confirmed.

                                </div>

                            }


                            {

                                booking.bookingStatus === "COMPLETED"

                                &&

                                <div className="alert alert-primary rounded-3 fw-semibold mb-0">

                                    <i className="bi bi-check2-all me-2"></i>

                                    Thank you for travelling with FastX.

                                </div>

                            }


                            {

                                booking.bookingStatus === "CANCELLED"

                                &&

                                <div className="alert alert-danger rounded-3 fw-semibold mb-0">

                                    <i className="bi bi-x-circle-fill me-2"></i>

                                    This booking has been cancelled.

                                </div>

                            }

                        </div>


                        {/* ============================= */}
                        {/* BOOKING INFORMATION */}
                        {/* ============================= */}

                        <h5 className="d-flex align-items-center text-primary fw-bold mb-3">

                            <i className="bi bi-journal-check me-2"></i>

                            Booking Information

                        </h5>


                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Booking Reference

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.bookingReference}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Passenger

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.passengerName}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Number of Tickets

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.numberOfTickets}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Booking Status

                                    </label>

                                    <span

                                        className={`badge rounded-pill px-3 py-2 ${
                                            booking.bookingStatus === "CONFIRMED"

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

                        </div>


                        <hr className="my-4" />


                        {/* ============================= */}
                        {/* JOURNEY INFORMATION */}
                        {/* ============================= */}

                        <h5 className="d-flex align-items-center text-primary fw-bold mb-3">

                            <i className="bi bi-bus-front me-2"></i>

                            Journey Information

                        </h5>


                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Bus Name

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.busName}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Bus Number

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.busNumber}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        From

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.originCity}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        To

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.destinationCity}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Route

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.originCity}

                                        {" → "}

                                        {booking.destinationCity}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Journey Date

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.journeyDate}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Departure

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {formatTime(
                                            booking.departureDateTime
                                        )}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Arrival

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {formatTime(
                                            booking.arrivalDateTime
                                        )}

                                    </span>

                                </div>

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ============================= */}
                        {/* SEAT INFORMATION */}
                        {/* ============================= */}

                        <h5 className="d-flex align-items-center text-primary fw-bold mb-3">

                            <i className="bi bi-grid-3x3-gap me-2"></i>

                            Seat Information

                        </h5>


                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Seat Numbers

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {

                                            booking.seatNumbers &&

                                            booking.seatNumbers.length > 0

                                                ? booking.seatNumbers.join(", ")

                                                : "Seat information unavailable"

                                        }

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Number of Tickets

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.numberOfTickets}

                                    </span>

                                </div>

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ============================= */}
                        {/* PAYMENT INFORMATION */}
                        {/* ============================= */}

                        <h5 className="d-flex align-items-center text-primary fw-bold mb-3">

                            <i className="bi bi-credit-card me-2"></i>

                            Payment Information

                        </h5>


                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Payment Status

                                    </label>

                                    <span

                                        className={`badge rounded-pill px-3 py-2 ${
                                            booking.paymentStatus === "SUCCESS"

                                                ? "bg-success"

                                                : booking.paymentStatus === "FAILED"

                                                    ? "bg-danger"

                                                    : "bg-warning text-dark"
                                        }`}

                                    >

                                        {booking.paymentStatus}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Amount Paid

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        ₹ {booking.totalFare}

                                    </span>

                                </div>

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ============================= */}
                        {/* TICKET INFORMATION */}
                        {/* ============================= */}

                        <h5 className="d-flex align-items-center text-primary fw-bold mb-3">

                            <i className="bi bi-ticket-perforated me-2"></i>

                            Ticket Information

                        </h5>


                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Booking Reference

                                    </label>

                                    <span className="text-primary fw-semibold">

                                        {booking.bookingReference}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Ticket Status

                                    </label>

                                    <span

                                        className={`badge rounded-pill px-3 py-2 ${
                                            booking.bookingStatus === "CANCELLED"

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

                    </div>


                    {/* ============================= */}
                    {/* FOOTER */}
                    {/* ============================= */}

                    <div className="modal-footer border-top d-flex justify-content-end flex-wrap gap-2 px-4 px-md-5 py-3">


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

        </div>

    );

}

export default BookingDetailsModal;