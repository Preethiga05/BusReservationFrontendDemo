import "./PaymentCss/PaymentSummary.css";

function PaymentSummary({

    bus,

    selectedSeats,

    passengers

}) {

    const departure = new Date(bus.departureDateTime);

    const arrival = new Date(bus.arrivalDateTime);

    const departureTime = departure.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    const arrivalTime = arrival.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    const journeyDate = departure.toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    return (

        <div className="payment-summary-card">

            <div className="payment-summary-header">

                <div>

                    <h3>

                        <i className="bi bi-bus-front-fill me-2"></i>

                        {bus.busName}

                    </h3>

                    <p>

                        {bus.busOperator}

                    </p>

                </div>

                <span className="payment-bus-type">

                    {bus.busType.replaceAll("_", " ")}

                </span>

            </div>

            <div className="payment-summary-body">

                <div className="payment-route">

                    <div className="route-city">

                        <h4>

                            {departureTime}

                        </h4>

                        <span>

                            {bus.source}

                        </span>

                    </div>

                    <div className="payment-route-middle">

                        <span>

                            {bus.journeyDuration}

                        </span>

                        <div className="payment-route-line">

                            <span className="dot"></span>

                            <div className="bus-icon">

                                <i className="bi bi-bus-front-fill"></i>

                            </div>

                            <span className="dot"></span>

                        </div>

                    </div>

                    <div className="route-city">

                        <h4>

                            {arrivalTime}

                        </h4>

                        <span>

                            {bus.destination}

                        </span>

                    </div>

                </div>

                <div className="payment-info-grid">

                    <div>

                        <small>

                            Journey Date

                        </small>

                        <strong>

                            {journeyDate}

                        </strong>

                    </div>

                    <div>

                        <small>

                            Seats

                        </small>

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

                    <div>

                        <small>

                            Passengers

                        </small>

                        <strong>

                            {passengers.length}

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PaymentSummary;