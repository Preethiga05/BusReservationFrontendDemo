function FareBreakdown({
    fareSummary
}) {

    if (!fareSummary) {

        return (

            <div className="text-center p-5">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">

                    Calculating fare...

                </p>

            </div>

        );

    }

    return (

        <div
            className="bg-white rounded-4 overflow-hidden shadow-sm"
        >

            {/* Header */}

            <div
                className="bg-primary text-white p-3"
            >

                <h3 className="mb-0 fs-4 fw-bold">

                    <i className="bi bi-wallet2 me-2"></i>

                    Fare Breakdown

                </h3>

            </div>


            {/* Body */}

            <div className="p-4">

                {/* Seat Fare */}

                <div
                    className="d-flex justify-content-between align-items-center mb-3"
                >

                    <span className="text-secondary">

                        Seat Fare

                    </span>

                    <strong className="text-dark fs-5">

                        ₹ {fareSummary.seatFare}

                    </strong>

                </div>


                {/* Convenience Fee */}

                <div
                    className="d-flex justify-content-between align-items-center mb-3"
                >

                    <span className="text-secondary">

                        Convenience Fee

                    </span>

                    <strong className="text-dark fs-5">

                        ₹ {fareSummary.convenienceFee}

                    </strong>

                </div>


                {/* GST */}

                <div
                    className="d-flex justify-content-between align-items-center mb-3"
                >

                    <span className="text-secondary">

                        GST

                    </span>

                    <strong className="text-dark fs-5">

                        ₹ {fareSummary.gst}

                    </strong>

                </div>


                <hr />


                {/* Total */}

                <div
                    className="d-flex justify-content-between align-items-center mt-3 mb-4"
                >

                    <span className="text-primary fs-4 fw-bold">

                        Total

                    </span>

                    <strong className="text-primary fs-4 fw-bold">

                        ₹ {fareSummary.totalFare}

                    </strong>

                </div>


                {/* Security Note */}

                <div
                    className="alert alert-primary d-flex align-items-center mb-0"
                    role="alert"
                >

                    <i className="bi bi-shield-lock-fill me-2"></i>

                    <span>

                        Your payment is protected with secure encryption.

                    </span>

                </div>

            </div>

        </div>

    );

}

export default FareBreakdown;