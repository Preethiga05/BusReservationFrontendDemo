import { useState } from "react";
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

            const bookingResponse =
                await BookingService.addBooking({

                    busScheduleId:
                        bus.busScheduleId,

                    seatIds:
                        selectedSeats.map(
                            seat => seat.seatId
                        )

                });

            const booking =
                bookingResponse.data;

            console.log(booking);

            // Save Travellers

            console.log(passengers);

            await BookingPassengerService
                .addPassengers({

                    bookingId:
                        booking.bookingId,

                    passengers:
                        passengers

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

        <div
            className="bg-white rounded-4 overflow-hidden shadow-sm"
        >

            {/* Header */}

            <div
                className="bg-primary text-white p-3"
            >

                <h3 className="mb-0 fs-4 fw-bold">

                    <i className="bi bi-credit-card-2-front-fill me-2"></i>

                    Payment Method

                </h3>

            </div>


            {/* Body */}

            <div className="p-4">

                {

                    methods.map(method => (

                        <div

                            key={method.id}

                            className={`
                                d-flex
                                justify-content-between
                                align-items-center
                                p-3
                                mb-3
                                rounded-3
                                border
                                ${paymentMethod === method.id
                                    ? "border-primary bg-primary bg-opacity-10"
                                    : "border-light-subtle"
                                }
                            `}

                            onClick={() =>
                                setPaymentMethod(
                                    method.id
                                )
                            }

                            style={{
                                cursor: "pointer"
                            }}

                        >

                            <div
                                className="d-flex align-items-center gap-3"
                            >

                                <i
                                    className={`bi ${method.icon} text-primary fs-4`}
                                ></i>

                                <span
                                    className="fw-semibold text-dark"
                                >

                                    {method.title}

                                </span>

                            </div>

                            {

                                paymentMethod === method.id &&

                                <i
                                    className="bi bi-check-circle-fill text-primary fs-5"
                                ></i>

                            }

                        </div>

                    ))

                }


                {/* Pay Button */}

                <button

                    className="btn btn-primary w-100 py-3 mt-2 fw-bold fs-5"

                    onClick={handlePayment}

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            <>

                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                ></span>

                                Processing Payment...

                            </>

                            :

                            <>

                                <i className="bi bi-credit-card-fill me-2"></i>

                                Pay ₹ {fareSummary.totalFare}

                            </>

                    }

                </button>

            </div>

        </div>

    );

}

export default PaymentMethod;