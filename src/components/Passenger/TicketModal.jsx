import "./PassengerCss/TicketModal.css";

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

        <div className="application-modal-overlay">


            <div className="ticket-modal">


                {/* ============================= */}
                {/* CLOSE BUTTON */}
                {/* ============================= */}

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>


                {/* ============================= */}
                {/* TICKET CONTENT */}
                {/* ============================= */}

                <div

                    className="ticket-download-content"

                    ref={ticketRef}

                >


                    {/* ============================= */}
                    {/* HEADER */}
                    {/* ============================= */}

                    <div className="ticket-header">

                        <h2>

                            FASTX

                        </h2>

                        <p>

                            Electronic Bus Ticket

                        </p>

                    </div>


                    {/* ============================= */}
                    {/* JOURNEY */}
                    {/* ============================= */}

                    <div className="ticket-section">


                        <div className="ticket-route">


                            <div>

                                <h5>

                                    {booking.originCity}

                                </h5>

                                <small>

                                    Departure

                                </small>

                            </div>


                            <div className="route-center">

                                <i className="bi bi-bus-front-fill"></i>

                                <hr />

                            </div>


                            <div>

                                <h5>

                                    {booking.destinationCity}

                                </h5>

                                <small>

                                    Arrival

                                </small>

                            </div>


                        </div>


                    </div>


                    <hr />


                    {/* ============================= */}
                    {/* BOOKING DETAILS */}
                    {/* ============================= */}

                    <div className="ticket-grid">


                        <div>

                            <label>

                                Passenger

                            </label>

                            <p>

                                {booking.passengerName || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                Booking Reference

                            </label>

                            <p>

                                {booking.bookingReference || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                Bus

                            </label>

                            <p>

                                {booking.busName || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                Bus Number

                            </label>

                            <p>

                                {booking.busNumber || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                From

                            </label>

                            <p>

                                {booking.originCity || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                To

                            </label>

                            <p>

                                {booking.destinationCity || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                Journey Date

                            </label>

                            <p>

                                {booking.journeyDate || "N/A"}

                            </p>

                        </div>


                        <div>

                            <label>

                                Departure

                            </label>

                            <p>

                                {formatTime(

                                    booking.departureDateTime

                                )}

                            </p>

                        </div>


                        <div>

                            <label>

                                Arrival

                            </label>

                            <p>

                                {formatTime(

                                    booking.arrivalDateTime

                                )}

                            </p>

                        </div>


                        <div>

                            <label>

                                Seat Numbers

                            </label>

                            <p>

                                {

                                    booking.seatNumbers &&

                                    booking.seatNumbers.length > 0

                                        ? booking.seatNumbers.join(", ")

                                        : "Seat information unavailable"

                                }

                            </p>

                        </div>


                        <div>

                            <label>

                                Tickets

                            </label>

                            <p>

                                {booking.numberOfTickets ?? 0}

                            </p>

                        </div>


                        <div>

                            <label>

                                Fare

                            </label>

                            <p>

                                ₹ {booking.totalFare ?? 0}

                            </p>

                        </div>


                        <div>

                            <label>

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


                        <div>

                            <label>

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


                {/* ============================= */}
                {/* FOOTER */}
                {/* ============================= */}

                <div className="ticket-footer">


                    <button

                        className="btn btn-primary"

                        onClick={downloadTicket}

                    >

                        <i className="bi bi-download me-2"></i>

                        Download Ticket

                    </button>


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


export default TicketModal;