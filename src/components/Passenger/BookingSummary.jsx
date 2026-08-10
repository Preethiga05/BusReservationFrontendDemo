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

        <div
            className="card border-0 rounded-4 shadow-sm position-sticky"
            style={{ top: "20px" }}
        >

            {/* Header */}

            <div className="card-header bg-primary text-white border-0 rounded-top-4 p-3">

                <h3 className="mb-0 fs-5 fw-bold">

                    <i className="bi bi-receipt me-2"></i>

                    Journey Summary

                </h3>

            </div>


            {/* Body */}

            <div className="card-body p-4">


                {/* Bus */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <span className="text-secondary">

                        Bus

                    </span>

                    <strong className="text-primary text-end ms-3">

                        {bus.busName}

                    </strong>

                </div>


                {/* Route */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <span className="text-secondary">

                        Route

                    </span>

                    <strong className="text-primary text-end ms-3">

                        {bus.source}

                        {" → "}

                        {bus.destination}

                    </strong>

                </div>


                {/* Seats */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <span className="text-secondary">

                        Seats

                    </span>

                    <strong className="text-primary text-end ms-3">

                        {

                            selectedSeats

                                .map(

                                    seat => seat.seatNumber

                                )

                                .join(", ")

                        }

                    </strong>

                </div>


                {/* Passengers */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <span className="text-secondary">

                        Passengers

                    </span>

                    <strong className="text-primary">

                        {selectedSeats.length}

                    </strong>

                </div>


                <hr />


                {/* Total */}

                <div className="d-flex justify-content-between align-items-center my-4">

                    <span className="fs-5 fw-bold text-primary">

                        Total Fare

                    </span>

                    <strong className="fs-4 text-primary">

                        ₹ {totalFare}

                    </strong>

                </div>


                {/* Continue Payment */}

                <button

                    className="btn btn-primary w-100 py-3 rounded-3 fw-semibold"

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