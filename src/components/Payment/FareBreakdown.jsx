import "./PaymentCss/FareBreakdown.css";

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

        <div className="fare-breakdown-card">

            <div className="fare-breakdown-header">

                <h3>

                    <i className="bi bi-wallet2 me-2"></i>

                    Fare Breakdown

                </h3>

            </div>

            <div className="fare-breakdown-body">

                <div className="fare-item">

    <span>

        Seat Fare

    </span>

    <strong>

        ₹ {fareSummary.seatFare}

    </strong>

</div>

<div className="fare-item">

    <span>

        Convenience Fee

    </span>

    <strong>

        ₹ {fareSummary.convenienceFee}

    </strong>

</div>

<div className="fare-item">

    <span>

        GST

    </span>

    <strong>

        ₹ {fareSummary.gst}

    </strong>

</div>

<hr/>

<div className="fare-total">

    <span>

        Total

    </span>

    <strong>

        ₹ {fareSummary.totalFare}

    </strong>

</div>

                <div className="payment-note">

                    <i className="bi bi-shield-lock-fill me-2"></i>

                    Your payment is protected with secure encryption.

                </div>

            </div>

        </div>

    );

}

export default FareBreakdown;