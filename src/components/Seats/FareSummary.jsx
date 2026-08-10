import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
function FareSummary({

    bus

}) {
    const selectedSeats = useSelector(
        state => state.seat.selectedSeats
    );

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

        <div className="card border-0 shadow rounded-4 overflow-hidden">

            {/* Header */}

            <div className="card-header bg-primary text-white border-0 p-3">

                <h3 className="mb-0 fs-4 fw-bold">

                    <i className="bi bi-receipt-cutoff me-2"></i>

                    Fare Summary

                </h3>

            </div>


            {/* Body */}

            <div className="card-body p-4">

                {/* Selected Seats */}

                <div className="mb-4">

                    <h5 className="fw-bold text-primary mb-3">

                        Selected Seats

                    </h5>


                    {

                        selectedSeats.length === 0

                            ?

                            (

                                <p className="text-secondary fst-italic mb-0">

                                    No seats selected

                                </p>

                            )

                            :

                            (

                                <div className="d-flex flex-wrap gap-2">

                                    {

                                        selectedSeats.map(

                                            seat => (

                                                <span

                                                    key={seat.seatId}

                                                    className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2"

                                                >

                                                    <i className="bi bi-ticket-perforated-fill me-1"></i>

                                                    {seat.seatNumber}

                                                </span>

                                            )

                                        )

                                    }

                                </div>

                            )

                    }

                </div>


                <hr />


                {/* Seat Fare */}

                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">

                    <span className="text-secondary">

                        Seat Fare

                    </span>

                    <strong className="text-dark">

                        ₹ {fare}

                    </strong>

                </div>


                {/* Seats */}

                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">

                    <span className="text-secondary">

                        Seats

                    </span>

                    <strong className="text-dark">

                        {selectedSeats.length}

                    </strong>

                </div>


                {/* Total */}

                <div className="d-flex justify-content-between align-items-center py-3">

                    <span className="fw-bold fs-5">

                        Total Amount

                    </span>

                    <strong className="text-primary fs-3">

                        ₹ {totalFare}

                    </strong>

                </div>


                {/* Continue Button */}

                <button

                    type="button"

                    className="btn btn-primary btn-lg w-100 fw-semibold mt-3"

                    disabled={selectedSeats.length === 0}

                    onClick={continueBooking}

                >

                    <i className="bi bi-arrow-right-circle-fill me-2"></i>

                    Continue Booking

                </button>

            </div>

        </div>

    );

}

export default FareSummary;