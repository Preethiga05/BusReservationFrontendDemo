import { useState } from "react";
import "./PaymentCss/PaymentMethod.css";
import BookingService from "../../services/BookingService";
import BookingPassengerService from "../../services/BookingPassengerService";
import { useNavigate } from "react-router";

function PaymentMethod({

    paymentMethod,

    setPaymentMethod,

    fareSummary,

    bus,

    selectedSeats,

    passengers

}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const methods = [

        {
            id: "UPI",
            icon: "bi-phone-fill",
            title: "UPI"
        },

        {
            id: "CARD",
            icon: "bi-credit-card-fill",
            title: "Credit / Debit Card"
        },

        {
            id: "NET_BANKING",
            icon: "bi-bank",
            title: "Net Banking"
        },

        {
            id: "WALLET",
            icon: "bi-wallet2",
            title: "Wallet"
        }

    ];

    async function handlePayment() {

        try {

            setLoading(true);

            // Create Booking

            const bookingResponse = await BookingService.addBooking({

                busScheduleId: bus.busScheduleId,

                seatIds: selectedSeats.map(

                    seat => seat.seatId

                )

            });

            const booking = bookingResponse.data;
            console.log(booking);

            // Save Travellers
            console.log(passengers);

            await BookingPassengerService.addPassengers({

                bookingId: booking.bookingId,

                passengers: passengers

            });

            // Navigate to Ticket

            navigate("/ticket", {

                state: {

                    booking,

                    passengers,

                    fareSummary,

                    paymentSuccess: true

                }

            });

        }

        catch (error) {

            console.log(error);

            alert("Booking Failed");

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div className="payment-method-card">

            <div className="payment-method-header">

                <h3>

                    <i className="bi bi-credit-card-2-front-fill me-2"></i>

                    Payment Method

                </h3>

            </div>

            <div className="payment-method-body">

                {

                    methods.map(method => (

                        <div

                            key={method.id}

                            className={`payment-option ${paymentMethod === method.id ? "active" : ""}`}

                            onClick={() =>
                                setPaymentMethod(method.id)
                            }

                        >

                            <div className="payment-option-left">

                                <i className={`bi ${method.icon}`}></i>

                                <span>

                                    {method.title}

                                </span>

                            </div>

                            {

                                paymentMethod === method.id &&

                                <i className="bi bi-check-circle-fill payment-check"></i>

                            }

                        </div>

                    ))

                }

                <button
                    className="pay-btn"
                    onClick={handlePayment}
                    disabled={loading}
                >

                    {

                        loading

                            ?

                            "Processing Payment..."

                            :

                            `Pay ₹ ${fareSummary.totalFare}`

                    }

                </button>

            </div>

        </div>

    );

}

export default PaymentMethod;