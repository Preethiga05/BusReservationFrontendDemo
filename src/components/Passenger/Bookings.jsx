import BookingDetailsModal from "./BookingDetailsModal";
import TicketModal from "./TicketModal";
import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";

function Bookings() {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showTicket, setShowTicket] = useState(false);

    const [ticketBooking, setTicketBooking] = useState(null);

    const [bookings, setBookings] = useState([]);


    useEffect(() => {

        loadBookings();

    }, []);


    async function loadBookings() {

        try {

            const response =
                await BookingService.getBookingHistory();

            console.log(response.data);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }


    const filteredBookings = bookings.filter((booking) => {

        const matchesSearch =

            booking.bookingReference
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            booking.busName
                .toLowerCase()
                .includes(search.toLowerCase());


        const matchesStatus =

            statusFilter === "ALL"

            ||

            booking.bookingStatus === statusFilter;


        return matchesSearch && matchesStatus;

    });


    return (

        <div className="container-fluid">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="text-primary fw-bold mb-0">

                    My Bookings

                </h3>

            </div>


            {/* Toolbar */}

            <div className="d-flex align-items-center gap-3 flex-wrap mb-4">

                <input

                    type="text"

                    className="form-control"

                    style={{ maxWidth: "400px" }}

                    placeholder="Search Booking Reference..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />


                <div className="d-flex gap-2 flex-wrap">

                    <button

                        className={
                            statusFilter === "ALL"
                                ? "btn btn-primary rounded-pill px-4"
                                : "btn btn-outline-primary rounded-pill px-4"
                        }

                        onClick={() =>
                            setStatusFilter("ALL")
                        }

                    >

                        All

                    </button>


                    <button

                        className={
                            statusFilter === "CONFIRMED"
                                ? "btn btn-primary rounded-pill px-4"
                                : "btn btn-outline-primary rounded-pill px-4"
                        }

                        onClick={() =>
                            setStatusFilter("CONFIRMED")
                        }

                    >

                        Confirmed

                    </button>


                    <button

                        className={
                            statusFilter === "COMPLETED"
                                ? "btn btn-primary rounded-pill px-4"
                                : "btn btn-outline-primary rounded-pill px-4"
                        }

                        onClick={() =>
                            setStatusFilter("COMPLETED")
                        }

                    >

                        Completed

                    </button>


                    <button

                        className={
                            statusFilter === "CANCELLED"
                                ? "btn btn-primary rounded-pill px-4"
                                : "btn btn-outline-primary rounded-pill px-4"
                        }

                        onClick={() =>
                            setStatusFilter("CANCELLED")
                        }

                    >

                        Cancelled

                    </button>

                </div>

            </div>


            {/* Booking Cards */}

            <div className="row g-4">

                {

                    filteredBookings.map((booking) => (

                        <div

                            className="col-lg-6"

                            key={booking.bookingId}

                        >

                            <div className="card h-100 border rounded-4 shadow-sm">

                                <div className="card-body p-4">


                                    {/* Card Header */}

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div>

                                            <h5 className="text-primary fw-bold mb-1">

                                                {booking.bookingReference}

                                            </h5>

                                            <p className="text-secondary mb-0">

                                                {booking.busName}

                                            </p>

                                        </div>


                                        <span

                                            className={
                                                `badge rounded-pill px-3 py-2 ${
                                                    booking.bookingStatus === "CONFIRMED"
                                                        ? "bg-success"
                                                        : booking.bookingStatus === "COMPLETED"
                                                            ? "bg-primary"
                                                            : "bg-danger"
                                                }`
                                            }

                                        >

                                            {booking.bookingStatus}

                                        </span>

                                    </div>


                                    <hr />


                                    {/* Journey Route */}

                                    <div className="d-flex align-items-center gap-2 text-primary fw-semibold mb-4">

                                        <i className="bi bi-geo-alt-fill"></i>

                                        <span>

                                            {booking.originCity}

                                        </span>

                                        <i className="bi bi-arrow-right text-primary"></i>

                                        <span>

                                            {booking.destinationCity}

                                        </span>

                                    </div>


                                    {/* Booking Details */}

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-4">

                                            <div className="bg-light rounded-3 p-3 h-100">

                                                <label className="d-block text-secondary small fw-semibold mb-1">

                                                    Journey Date

                                                </label>

                                                <p className="mb-0 fw-semibold">

                                                    {booking.journeyDate}

                                                </p>

                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="bg-light rounded-3 p-3 h-100">

                                                <label className="d-block text-secondary small fw-semibold mb-1">

                                                    Tickets

                                                </label>

                                                <p className="mb-0 fw-semibold">

                                                    {booking.numberOfTickets}

                                                </p>

                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="bg-light rounded-3 p-3 h-100">

                                                <label className="d-block text-secondary small fw-semibold mb-1">

                                                    Total Fare

                                                </label>

                                                <p className="mb-0 fw-semibold">

                                                    ₹ {booking.totalFare}

                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Payment */}

                                    <div className="border-top pt-3 d-flex justify-content-between align-items-center flex-wrap gap-3">

                                        <div>

                                            <label className="d-block text-secondary small fw-semibold mb-1">

                                                Payment

                                            </label>

                                            <span

                                                className={
                                                    `badge rounded-pill px-3 py-2 ${
                                                        booking.paymentStatus === "SUCCESS"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`
                                                }

                                            >

                                                {booking.paymentStatus}

                                            </span>

                                        </div>


                                        <button

                                            className="btn btn-primary"

                                            onClick={() =>
                                                setSelectedBooking(
                                                    booking
                                                )
                                            }

                                        >

                                            <i className="bi bi-eye-fill me-2"></i>

                                            View Details

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>


            {/* Booking Details Modal */}

            {

                selectedBooking &&

                <BookingDetailsModal

                    booking={selectedBooking}

                    close={() =>
                        setSelectedBooking(null)
                    }

                    openTicket={() => {

                        setTicketBooking(
                            selectedBooking
                        );

                        setSelectedBooking(null);

                        setShowTicket(true);

                    }}

                    openCancel={() =>
                        console.log("Cancel Booking")
                    }

                />

            }


            {/* Ticket Modal */}

            {

                showTicket &&

                <TicketModal

                    booking={ticketBooking}

                    close={() => {

                        setShowTicket(false);

                        setTicketBooking(null);

                    }}

                />

            }

        </div>

    );

}

export default Bookings;