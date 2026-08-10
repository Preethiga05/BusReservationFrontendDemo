import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function TicketModal({

    booking,

    close

}) {

    const ticketRef = useRef(null);

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


    function getStatusClass(status) {

        switch (status) {

            case "SUCCESS":
                return "bg-success";

            case "CONFIRMED":
                return "bg-success";

            case "COMPLETED":
                return "bg-primary";

            case "CANCELLED":
                return "bg-danger";

            case "FAILED":
                return "bg-danger";

            case "PENDING":
                return "bg-warning text-dark";

            default:
                return "bg-secondary";

        }

    }


    const downloadTicket = async () => {

        try {

            if (!ticketRef.current) {

                return;

            }


            const canvas = await html2canvas(
                ticketRef.current,
                {
                    scale: 2,
                    useCORS: true
                }
            );


            const image = canvas.toDataURL(
                "image/png"
            );


            const pdf = new jsPDF(
                "p",
                "mm",
                "a4"
            );


            const pageWidth =
                pdf.internal.pageSize.getWidth();


            const pageHeight =
                (canvas.height * pageWidth) /
                canvas.width;


            pdf.addImage(
                image,
                "PNG",
                0,
                0,
                pageWidth,
                pageHeight
            );


            pdf.save(
                `FastX-${booking.bookingReference}.pdf`
            );

        }

        catch (error) {

            console.error(
                "Ticket download failed:",
                error
            );

        }

    };


    return (

        <div
            className="modal d-block bg-dark bg-opacity-50"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

                <div className="modal-content border-0 rounded-4 shadow-lg">

                    {/* CLOSE BUTTON */}

                    <button

                        type="button"

                        className="btn-close position-absolute top-0 end-0 m-3 z-3"

                        onClick={close}

                    >
                    </button>


                    {/* TICKET CONTENT */}

                    <div
                        ref={ticketRef}
                        className="p-4"
                    >

                        {/* HEADER */}

                        <div className="bg-primary text-white rounded-4 p-4 text-center mb-4">

                            <h2 className="fw-bold mb-2">

                                FASTX

                            </h2>

                            <p className="mb-0 opacity-75">

                                Electronic Bus Ticket

                            </p>

                        </div>


                        {/* JOURNEY */}

                        <div className="mb-4">

                            <div className="d-flex align-items-center justify-content-between text-center">

                                <div>

                                    <h5 className="fw-bold text-primary mb-1">

                                        {booking.originCity}

                                    </h5>

                                    <small className="text-secondary">

                                        Departure

                                    </small>

                                </div>


                                <div className="d-flex align-items-center justify-content-center flex-grow-1 mx-3">

                                    <hr className="border-primary border-2 border-dashed flex-grow-1" />

                                    <i className="bi bi-bus-front-fill text-primary fs-4 mx-2"></i>

                                    <hr className="border-primary border-2 border-dashed flex-grow-1" />

                                </div>


                                <div>

                                    <h5 className="fw-bold text-primary mb-1">

                                        {booking.destinationCity}

                                    </h5>

                                    <small className="text-secondary">

                                        Arrival

                                    </small>

                                </div>

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* BOOKING DETAILS */}

                        <div className="row g-3">

                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Passenger

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.passengerName || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Booking Reference

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.bookingReference || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Bus

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.busName || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Bus Number

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.busNumber || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        From

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.originCity || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        To

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.destinationCity || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Journey Date

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.journeyDate || "N/A"}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Departure

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {formatTime(
                                            booking.departureDateTime
                                        )}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Arrival

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {formatTime(
                                            booking.arrivalDateTime
                                        )}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Seat Numbers

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {
                                            booking.seatNumbers &&
                                            booking.seatNumbers.length > 0

                                                ? booking.seatNumbers.join(", ")

                                                : "Seat information unavailable"
                                        }

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Tickets

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        {booking.numberOfTickets ?? 0}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-1">

                                        Fare

                                    </label>

                                    <p className="mb-0 fw-semibold text-primary">

                                        ₹ {booking.totalFare ?? 0}

                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-2">

                                        Payment Status

                                    </label>

                                    <span
                                        className={`badge ${getStatusClass(
                                            booking.paymentStatus
                                        )}`}
                                    >

                                        {booking.paymentStatus || "N/A"}

                                    </span>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="bg-light border rounded-3 p-3 h-100">

                                    <label className="d-block text-secondary small fw-semibold mb-2">

                                        Booking Status

                                    </label>

                                    <span
                                        className={`badge ${getStatusClass(
                                            booking.bookingStatus
                                        )}`}
                                    >

                                        {booking.bookingStatus || "N/A"}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="border-top p-3 d-flex justify-content-end gap-2 flex-wrap">

                        <button

                            className="btn btn-primary fw-semibold px-4"

                            onClick={downloadTicket}

                        >

                            <i className="bi bi-download me-2"></i>

                            Download Ticket

                        </button>


                        <button

                            className="btn btn-secondary fw-semibold px-4"

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

export default TicketModal;