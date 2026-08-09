import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";

function BookingDetailsModal({
    booking,
    close
}) {

    const [seatNumbers, setSeatNumbers] = useState([]);

    const [loadingSeats, setLoadingSeats] = useState(false);


    useEffect(() => {

        if (!booking) {

            setSeatNumbers([]);

            return;

        }


        const loadSeats = async () => {

            try {

                setLoadingSeats(true);

                const response =
                    await BookingService.getSeatNumbers(
                        booking.bookingId
                    );

                setSeatNumbers(
                    response.data || []
                );

            }
            catch (error) {

                console.error(
                    "Failed to load seat numbers:",
                    error
                );

                setSeatNumbers([]);

            }
            finally {

                setLoadingSeats(false);

            }

        };


        loadSeats();

    }, [booking]);


    if (!booking) {

        return null;

    }


    const formatDate = (dateString) => {

        if (!dateString) {

            return "N/A";

        }

        const [
            year,
            month,
            day
        ] = dateString
            .split("-")
            .map(Number);

        const date =
            new Date(
                year,
                month - 1,
                day
            );

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatMoney = (amount) => {

        return Number(
            amount || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content border-0 shadow">


                    {/* HEADER */}

                    <div className="modal-header">

                        <div>

                            <h5 className="modal-title fw-bold text-primary">

                                <i className="bi bi-ticket-perforated me-2"></i>

                                Booking Details

                            </h5>

                            <small className="text-muted">

                                {booking.bookingReference}

                            </small>

                        </div>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                        ></button>

                    </div>


                    {/* BODY */}

                    <div className="modal-body">

                        <div className="row g-3">


                            {/* BOOKING INFORMATION */}

                            <div className="col-md-6">

                                <div className="border rounded p-3 h-100">

                                    <h6 className="fw-semibold text-primary">

                                        Booking Information

                                    </h6>

                                    <hr />

                                    <div className="mb-3">

                                        <small className="text-muted">
                                            Booking Reference
                                        </small>

                                        <div className="fw-semibold">
                                            {booking.bookingReference}
                                        </div>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Status
                                        </small>

                                        <div className="mt-1">

                                            {booking.bookingStatus ===
                                            "CONFIRMED" ? (

                                                <span className="badge bg-success">

                                                    Confirmed

                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">

                                                    Cancelled

                                                </span>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* PASSENGER */}

                            <div className="col-md-6">

                                <div className="border rounded p-3 h-100">

                                    <h6 className="fw-semibold text-primary">

                                        Passenger

                                    </h6>

                                    <hr />

                                    <div className="mb-2">

                                        <small className="text-muted">
                                            Name
                                        </small>

                                        <div className="fw-semibold">

                                            {booking.passengerName ||
                                                "N/A"}

                                        </div>

                                    </div>


                                    <div className="mb-2">

                                        <small className="text-muted">
                                            Email
                                        </small>

                                        <div>

                                            {booking.passengerEmail ||
                                                "N/A"}

                                        </div>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Phone
                                        </small>

                                        <div>

                                            {booking.passengerPhone ||
                                                "N/A"}

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* JOURNEY */}

                            <div className="col-12">

                                <div className="border rounded p-3">

                                    <h6 className="fw-semibold text-primary">

                                        Journey Information

                                    </h6>

                                    <hr />

                                    <div className="row g-3">


                                        <div className="col-md-3">

                                            <small className="text-muted">
                                                Bus
                                            </small>

                                            <div className="fw-semibold">

                                                {booking.busName ||
                                                    "N/A"}

                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <small className="text-muted">
                                                Route
                                            </small>

                                            <div className="fw-semibold">

                                                {booking.originCity}

                                                <i className="bi bi-arrow-right mx-2 text-primary"></i>

                                                {booking.destinationCity}

                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <small className="text-muted">
                                                Journey Date
                                            </small>

                                            <div className="fw-semibold">

                                                {formatDate(
                                                    booking.journeyDate
                                                )}

                                            </div>

                                        </div>


                                        <div className="col-md-3">

                                            <small className="text-muted">
                                                Total Fare
                                            </small>

                                            <div className="fw-bold text-primary">

                                                ₹{" "}
                                                {formatMoney(
                                                    booking.totalFare
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* SEATS */}

                            <div className="col-12">

                                <div className="border rounded p-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h6 className="fw-semibold text-primary mb-0">

                                            <i className="bi bi-grid-3x3-gap me-2"></i>

                                            Booked Seats

                                        </h6>

                                        {!loadingSeats && (

                                            <span className="badge bg-primary">

                                                {seatNumbers.length} Seat
                                                {seatNumbers.length !== 1
                                                    ? "s"
                                                    : ""}

                                            </span>

                                        )}

                                    </div>

                                    <hr />


                                    {loadingSeats ? (

                                        <div className="text-muted">

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Loading seats...

                                        </div>

                                    ) : seatNumbers.length > 0 ? (

                                        <div className="d-flex flex-wrap gap-2">

                                            {seatNumbers.map(
                                                (seatNumber) => (

                                                    <span
                                                        key={seatNumber}
                                                        className="badge bg-primary px-3 py-2"
                                                    >

                                                        <i className="bi bi-person-seat me-1"></i>

                                                        {seatNumber}

                                                    </span>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <span className="text-muted">

                                            No seat information available.

                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="modal-footer">

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