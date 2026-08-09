import "./SeatsCss/FareSummary.css";
import { useNavigate } from "react-router";

function FareSummary({

    bus,

    selectedSeats

}) {
    const navigate = useNavigate();

    const fare = Number(bus?.fare ?? 0);

    const totalFare = fare * selectedSeats.length;
function continueBooking() {

    const token = localStorage.getItem("token");

    if (!token) {

        sessionStorage.setItem(

            "pendingBooking",

            JSON.stringify({

                bus,

                selectedSeats

            })

        );

        navigate("/login");

        return;

    }

    navigate(

        "/passenger-details",

        {

            state: {

                bus,

                selectedSeats

            }

        }

    );

}
    return (

        <div className="fare-summary-card">

            <div className="fare-header">

                <h3>

                    <i className="bi bi-receipt-cutoff me-2"></i>

                    Fare Summary

                </h3>

            </div>

            <div className="fare-body">

                <div className="summary-section">

                    <h5>

                        Selected Seats

                    </h5>

                    {

                        selectedSeats.length === 0 ?

                        (

                            <p className="no-seat">

                                No seats selected

                            </p>

                        )

                        :

                        (

                            <div className="selected-seat-list">

                                {

                                    selectedSeats.map(

                                        seat => (

                                            <span

                                                key={seat.seatId}

                                                className="seat-chip"

                                            >

                                                <i className="bi bi-ticket-perforated-fill me-1"></i>

                                                {

                                                    seat.seatNumber

                                                }

                                            </span>

                                        )

                                    )

                                }

                            </div>

                        )

                    }

                </div>

                <hr />

                <div className="fare-row">

                    <span>

                        Seat Fare

                    </span>

                    <strong>

                        ₹ {fare}

                    </strong>

                </div>

                <div className="fare-row">

                    <span>

                        Seats

                    </span>

                    <strong>

                        {

                            selectedSeats.length

                        }

                    </strong>

                </div>

                <div className="fare-row total-row">

                    <span>

                        Total Amount

                    </span>

                    <strong>

                        ₹ {totalFare}

                    </strong>

                </div>
                                <button

                    className="continue-btn"

                    disabled={selectedSeats.length === 0}

                    onClick={continueBooking}

                        // Next Step:
                        // navigate("/passenger-details", {
                        //     state: {
                        //         bus,
                        //         selectedSeats
                        //     }
                        // });

                    

                >

                    <i className="bi bi-arrow-right-circle-fill me-2"></i>

                    Continue Booking

                </button>

            </div>

        </div>

    );

}

export default FareSummary;