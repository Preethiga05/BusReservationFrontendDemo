import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookingService from "../services/BookingService";
import PaymentSummary from "../components/Payment/PaymentSummary";
import FareBreakdown from "../components/Payment/FareBreakdown";
import PaymentMethod from "../components/Payment/PaymentMethod";

import "../css/PaymentPage.css";

function PaymentPage() {

    const navigate = useNavigate();
    const [fareSummary, setFareSummary] = useState(null);

    const { state } = useLocation();


    const {

        bus,

        selectedSeats,

        passengers

    } = state;

    const [paymentMethod, setPaymentMethod] = useState("UPI");
    useEffect(() => {

        loadFareSummary();

    }, []);

    async function loadFareSummary() {

        try {

            const response = await BookingService.calculateFare({

                busScheduleId: bus.busScheduleId,

                seatIds: selectedSeats.map(

                    seat => seat.seatId

                )

            });
            console.log(response.data);

            setFareSummary(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="payment-page">

            <div className="payment-container">

                <button

                    className="payment-back-btn"

                    onClick={() => navigate(-1)}

                >

                    <i className="bi bi-arrow-left"></i>

                    Back

                </button>

                <div className="payment-header">

                    <h2>

                        Secure Payment

                    </h2>

                    <p>

                        Complete your payment to confirm your booking

                    </p>

                </div>

                <PaymentSummary

                    bus={bus}

                    selectedSeats={selectedSeats}

                    passengers={passengers}

                />

                <div className="payment-layout">

                    <div>

                        <FareBreakdown
                            fareSummary={fareSummary}
                        />

                    </div>

                    <div>

                        {
                            fareSummary &&

                            <PaymentMethod
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                fareSummary={fareSummary}
                                bus={bus}
                                selectedSeats={selectedSeats}
                                passengers={passengers}
                            />
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PaymentPage;