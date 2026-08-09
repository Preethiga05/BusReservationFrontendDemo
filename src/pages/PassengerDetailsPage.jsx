import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PassengerCard from "../components/Passenger/PassengerCard";
import BookingSummary from "../components/Passenger/BookingSummary";

import "../css/PassengerDetailsPage.css";

function PassengerDetailsPage() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const booking = state ||
        JSON.parse(sessionStorage.getItem("pendingBooking"));

    const bus = booking?.bus;

    const selectedSeats = booking?.selectedSeats || [];

    const [passengers, setPassengers] = useState([]);

    useEffect(() => {

        if (!booking) {

            navigate("/");

            return;

        }

        const passengerList = selectedSeats.map(seat => ({

            seatId: seat.seatId,

            seatNumber: seat.seatNumber,

            fullName: "",

            age: "",

            gender: ""

        }));

        setPassengers(passengerList);

    }, []);

    function updatePassenger(index, field, value) {

        const updated = [...passengers];

        updated[index][field] = value;

        setPassengers(updated);

    }

    function continuePayment() {

        console.log(passengers);


            navigate("/payment",{

                state:{

                    bus,

                    selectedSeats,

                    passengers

                }

            })

        

    }

    return (

        <div className="passenger-page">

            <div className="passenger-container">

                <button

                    className="back-btn"

                    onClick={() => navigate(-1)}

                >

                    <i className="bi bi-arrow-left"></i>

                    Back

                </button>

                <div className="page-header">

                    <h2>

                        Passenger Details

                    </h2>

                    <p>

                        Complete your booking details

                    </p>

                </div>
                                <div className="passenger-layout">

                    <div className="passenger-left">

                        {

                            passengers.map(

                                (

                                    passenger,

                                    index

                                ) => (

                                    <PassengerCard

                                        key={passenger.seatId}

                                        index={index}

                                        passenger={passenger}

                                        updatePassenger={updatePassenger}

                                    />

                                )

                            )

                        }

                    </div>

                    <div className="passenger-right">

                        <BookingSummary

                            bus={bus}

                            selectedSeats={selectedSeats}

                            passengers={passengers}

                            continuePayment={continuePayment}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PassengerDetailsPage;