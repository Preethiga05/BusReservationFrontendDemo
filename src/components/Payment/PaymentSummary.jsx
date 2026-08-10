function PaymentSummary({

    bus,

    selectedSeats,

    passengers

}) {

    const departure =
        new Date(bus.departureDateTime);

    const arrival =
        new Date(bus.arrivalDateTime);

    const departureTime =
        departure.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    const arrivalTime =
        arrival.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    const journeyDate =
        departure.toLocaleDateString("en-IN", {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        });

    return (

        <div
            className="bg-white rounded-4 overflow-hidden shadow-sm mb-4"
        >

            {/* Header */}

            <div
                className="bg-primary text-white p-4 d-flex justify-content-between align-items-center"
            >

                <div>

                    <h3 className="mb-1 fs-4 fw-bold">

                        <i className="bi bi-bus-front-fill me-2"></i>

                        {bus.busName}

                    </h3>

                    <p className="mb-0 opacity-75">

                        {bus.busOperator}

                    </p>

                </div>

                <span
                    className="badge bg-light text-primary rounded-pill px-3 py-2"
                >

                    {bus.busType.replaceAll("_", " ")}

                </span>

            </div>


            {/* Body */}

            <div className="p-4">

                {/* Route */}

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    {/* Departure */}

                    <div className="text-center">

                        <h4 className="text-primary fw-bold mb-1">

                            {departureTime}

                        </h4>

                        <span className="text-secondary">

                            {bus.source}

                        </span>

                    </div>


                    {/* Middle */}

                    <div className="flex-grow-1 text-center px-4">

                        <span className="fw-semibold text-dark">

                            {bus.journeyDuration}

                        </span>

                        <div
                            className="d-flex align-items-center mt-2"
                        >

                            <div
                                className="flex-grow-1 border-top border-primary"
                            ></div>

                            <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-2"
                                style={{
                                    width: "46px",
                                    height: "46px"
                                }}
                            >

                                <i className="bi bi-bus-front-fill"></i>

                            </div>

                            <div
                                className="flex-grow-1 border-top border-primary"
                            ></div>

                        </div>

                    </div>


                    {/* Arrival */}

                    <div className="text-center">

                        <h4 className="text-primary fw-bold mb-1">

                            {arrivalTime}

                        </h4>

                        <span className="text-secondary">

                            {bus.destination}

                        </span>

                    </div>

                </div>


                {/* Information */}

                <div className="row g-3">

                    <div className="col-md-4">

                        <div
                            className="bg-light rounded-3 p-3 h-100"
                        >

                            <small className="d-block text-secondary mb-1">

                                Journey Date

                            </small>

                            <strong className="text-dark">

                                {journeyDate}

                            </strong>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div
                            className="bg-light rounded-3 p-3 h-100"
                        >

                            <small className="d-block text-secondary mb-1">

                                Seats

                            </small>

                            <strong className="text-dark">

                                {

                                    selectedSeats

                                        .map(
                                            seat =>
                                                seat.seatNumber
                                        )

                                        .join(", ")

                                }

                            </strong>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div
                            className="bg-light rounded-3 p-3 h-100"
                        >

                            <small className="d-block text-secondary mb-1">

                                Passengers

                            </small>

                            <strong className="text-dark">

                                {passengers.length}

                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PaymentSummary;