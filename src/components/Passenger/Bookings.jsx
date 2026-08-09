
import "./PassengerCss/Bookings.css";
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

        <div className="bookings-page">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3>

                    My Bookings

                </h3>

            </div>

            <div className="booking-toolbar">

                <input

                    type="text"

                    className="form-control"

                    placeholder="Search Booking Reference..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <div className="booking-filters">

                    <button

                        className={`filter-btn ${statusFilter === "ALL" ? "active" : ""}`}

                        onClick={() => setStatusFilter("ALL")}

                    >

                        All

                    </button>

                    <button

                        className={`filter-btn ${statusFilter === "CONFIRMED" ? "active" : ""}`}

                        onClick={() => setStatusFilter("CONFIRMED")}

                    >

                        Confirmed

                    </button>

                    <button

                        className={`filter-btn ${statusFilter === "COMPLETED" ? "active" : ""}`}

                        onClick={() => setStatusFilter("COMPLETED")}

                    >

                        Completed

                    </button>

                    <button

                        className={`filter-btn ${statusFilter === "CANCELLED" ? "active" : ""}`}

                        onClick={() => setStatusFilter("CANCELLED")}

                    >

                        Cancelled

                    </button>

                </div>

            </div>

            <div className="row mt-4 g-4">

                {

                    filteredBookings.map((booking) => (

                        <div

                            className="col-lg-6"

                            key={booking.bookingId}

                        >

                            <div className="booking-card">
                                <div className="booking-card-header">

                                    <div>

                                        <h5>

                                            {booking.bookingReference}

                                        </h5>

                                        <p className="bus-name">

                                            {booking.busName}

                                        </p>

                                    </div>

                                    <span

                                        className={`booking-status ${booking.bookingStatus.toLowerCase()}`}

                                    >

                                        {booking.bookingStatus}

                                    </span>

                                </div>

                                <hr />

                                <div className="journey-route">

                                    <i className="bi bi-geo-alt-fill"></i>

                                    <span>

                                        {booking.originCity}

                                    </span>

                                    <i className="bi bi-arrow-right route-arrow"></i>

                                    <span>

                                        {booking.destinationCity}

                                    </span>

                                </div>

                                <div className="booking-details">

                                    <div>

                                        <label>

                                            Journey Date

                                        </label>

                                        <p>

                                            {booking.journeyDate}

                                        </p>

                                    </div>

                                    <div>

                                        <label>

                                            Tickets

                                        </label>

                                        <p>

                                            {booking.numberOfTickets}

                                        </p>

                                    </div>

                                    <div>

                                        <label>

                                            Total Fare

                                        </label>

                                        <p>

                                            ₹ {booking.totalFare}

                                        </p>

                                    </div>

                                </div>

                                <div className="payment-section">

                                    <div>

                                        <label>

                                            Payment

                                        </label>

                                        <span

                                            className={`payment-status ${booking.paymentStatus.toLowerCase()}`}

                                        >

                                            {booking.paymentStatus}

                                        </span>

                                    </div>

                                    <button

                                        className="btn btn-primary"

                                        onClick={() =>

                                            setSelectedBooking(booking)

                                        }

                                    >

                                        <i className="bi bi-eye-fill me-2"></i>

                                        View Details

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {

                selectedBooking &&

                <BookingDetailsModal

                    booking={selectedBooking}

                    close={() => setSelectedBooking(null)}

                    openTicket={() => {

                        setTicketBooking(selectedBooking);

                        setSelectedBooking(null);

                        setShowTicket(true);

                    }}

                    openCancel={() => console.log("Cancel Booking")}

                />


            }
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