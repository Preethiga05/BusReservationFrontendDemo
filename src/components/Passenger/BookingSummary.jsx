import "./PassengerCss/BookingSummary.css";

function BookingSummary({

    bus,

    selectedSeats,

    passengers,

    continuePayment

}) {

    const fare = Number(bus?.fare ?? 0);

    const totalFare = fare * selectedSeats.length;

    const isValid = passengers.every(

        passenger =>

            passenger.fullName.trim() !== "" &&

            passenger.age !== "" &&

            passenger.gender !== ""

    );

    return (

        <div className="booking-summary-card">

            <div className="booking-summary-header">

                <h3>

                    <i className="bi bi-receipt me-2"></i>

                    Journey Summary

                </h3>

            </div>

            <div className="booking-summary-body">

                <div className="summary-item">

                    <span>

                        Bus

                    </span>

                    <strong>

                        {bus.busName}

                    </strong>

                </div>

                <div className="summary-item">

                    <span>

                        Route

                    </span>

                    <strong>

                        {bus.source}

                        {" → "}

                        {bus.destination}

                    </strong>

                </div>

                <div className="summary-item">

                    <span>

                        Seats

                    </span>

                    <strong>

                        {

                            selectedSeats

                                .map(

                                    seat => seat.seatNumber

                                )

                                .join(", ")

                        }

                    </strong>

                </div>

                <div className="summary-item">

                    <span>

                        Passengers

                    </span>

                    <strong>

                        {selectedSeats.length}

                    </strong>

                </div>

                <hr />

                <div className="summary-total">

                    <span>

                        Total Fare

                    </span>

                    <strong>

                        ₹ {totalFare}

                    </strong>

                </div>

                <button

                    className="continue-payment-btn"

                    disabled={!isValid}

                    onClick={continuePayment}

                >

                    <i className="bi bi-credit-card-fill me-2"></i>

                    Continue To Payment

                </button>

            </div>

        </div>

    );

}

export default BookingSummary;