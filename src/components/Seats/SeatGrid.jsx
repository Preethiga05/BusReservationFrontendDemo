import { useDispatch, useSelector } from "react-redux"

import {addSeat,removeSeat} from "../../actions/SeatAction"

function SeatGrid({

    busType,
    seats

}) {
    const dispatch = useDispatch();

    const selectedSeats = useSelector(
        state => state.seat.selectedSeats
    );

    const isSleeper =
        busType === "SLEEPER_AC" ||
        busType === "SLEEPER_NON_AC";


    const lowerDeck = seats.filter(
        seat => seat.deck === "LOWER"
    );

    const upperDeck = seats.filter(
        seat => seat.deck === "UPPER"
    );


    function isSelected(seatId) {

        return selectedSeats.some(
            seat => seat.seatId === seatId
        );

    }


    function handleSeatClick(seat) {

    if (seat.seatStatus === "BOOKED") {

        return;

    }

    if (isSelected(seat.seatId)) {

        dispatch(removeSeat(seat.seatId));

    }

    else {

        dispatch(addSeat(seat));

    }

}


    function seatClass(seat) {

        let classes =
            "btn d-flex align-items-center justify-content-center position-relative fw-bold p-0";

        if (seat.seatStatus === "BOOKED") {

            classes +=
                " bg-secondary text-white border-secondary";

        }

        else if (isSelected(seat.seatId)) {

            classes +=
                " bg-primary text-white border-primary";

        }

        else {

            classes +=
                " bg-white text-primary border-primary";

        }

        return classes;

    }


    function createRows(
        seatList,
        seatsPerRow
    ) {

        const rows = [];

        for (
            let i = 0;
            i < seatList.length;
            i += seatsPerRow
        ) {

            rows.push(
                seatList.slice(
                    i,
                    i + seatsPerRow
                )
            );

        }

        return rows;

    }


    const lowerRows = createRows(
        lowerDeck,
        isSleeper ? 3 : 4
    );

    const upperRows = createRows(
        upperDeck,
        isSleeper ? 3 : 4
    );


    function renderSeat(
        seat,
        windowSeat = false
    ) {

        if (!seat) {

            return (

                <div
                    style={{
                        width: "60px",
                        height: "60px"
                    }}
                ></div>

            );

        }


        const selected =
            isSelected(seat.seatId);

        const booked =
            seat.seatStatus === "BOOKED";


        return (

            <button

                type="button"

                className={seatClass(seat)}

                disabled={booked}

                onClick={() =>
                    handleSeatClick(seat)
                }

                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "14px",
                    borderWidth: "2px",
                    boxShadow: selected
                        ? "0 8px 20px rgba(13,110,253,.25)"
                        : "0 5px 12px rgba(13,110,253,.10)"
                }}

            >

                {
                    windowSeat &&

                    <i

                        className="bi bi-window-sidebar position-absolute"

                        style={{
                            top: "5px",
                            left: "5px",
                            fontSize: "12px",
                            color: selected
                                ? "white"
                                : "#0d6efd"
                        }}

                    ></i>
                }


                {
                    booked &&

                    <i

                        className="bi bi-lock-fill position-absolute"

                        style={{
                            top: "5px",
                            right: "5px",
                            fontSize: "12px"
                        }}

                    ></i>
                }


                {
                    selected &&

                    <i

                        className="bi bi-check-circle-fill position-absolute"

                        style={{
                            top: "5px",
                            right: "5px",
                            fontSize: "13px"
                        }}

                    ></i>
                }


                <span
                    style={{
                        marginTop: "10px"
                    }}
                >

                    {seat.seatNumber}

                </span>

            </button>

        );

    }


    function renderDeck(
        rows,
        deckName
    ) {

        return (

            <div
                className="card border-0 shadow-sm rounded-4 overflow-hidden h-100"
            >

                {/* Deck Header */}

                <div className="card-header bg-primary-subtle border-0 d-flex justify-content-between align-items-center px-4 py-3">

                    <h4 className="mb-0 text-primary fw-bold fs-5">

                        {deckName}

                    </h4>

                    <div
                        className="bg-primary rounded-pill"
                        style={{
                            width: "42px",
                            height: "4px"
                        }}
                    ></div>

                </div>


                {/* Driver */}

                {
                    deckName === "Lower Deck" &&

                    <div className="d-flex justify-content-end px-4 pt-3">

                        <div
                            className="d-flex align-items-center justify-content-center gap-2 bg-primary-subtle text-primary border border-primary-subtle rounded-3 fw-bold"
                            style={{
                                width: "120px",
                                height: "48px"
                            }}
                        >

                            <i className="bi bi-steering-wheel"></i>

                            Driver

                        </div>

                    </div>
                }


                {/* Deck Body */}

                <div
                    className="p-4 overflow-auto"
                >

                    {

                        rows.map(
                            (row, index) => (

                                <div
                                    key={index}
                                    className="d-flex align-items-center justify-content-between mb-4"
                                >

                                    {

                                        isSleeper

                                            ?

                                            (

                                                <>

                                                    {/* Left Window */}

                                                    {

                                                        renderSeat(
                                                            row[0],
                                                            true
                                                        )

                                                    }


                                                    {/* Aisle */}

                                                    <div
                                                        style={{
                                                            width: "55px",
                                                            flexShrink: 0
                                                        }}
                                                    ></div>


                                                    {/* Right Side */}

                                                    <div className="d-flex gap-3">

                                                        {

                                                            renderSeat(
                                                                row[1],
                                                                false
                                                            )

                                                        }

                                                        {

                                                            renderSeat(
                                                                row[2],
                                                                true
                                                            )

                                                        }

                                                    </div>

                                                </>

                                            )

                                            :

                                            (

                                                <>

                                                    {/* Left Side */}

                                                    <div className="d-flex gap-3">

                                                        {

                                                            renderSeat(
                                                                row[0],
                                                                true
                                                            )

                                                        }

                                                        {

                                                            renderSeat(
                                                                row[1]
                                                            )

                                                        }

                                                    </div>


                                                    {/* Aisle */}

                                                    <div
                                                        style={{
                                                            width: "55px",
                                                            flexShrink: 0
                                                        }}
                                                    ></div>


                                                    {/* Right Side */}

                                                    <div className="d-flex gap-3">

                                                        {

                                                            renderSeat(
                                                                row[2]
                                                            )

                                                        }

                                                        {

                                                            renderSeat(
                                                                row[3],
                                                                true
                                                            )

                                                        }

                                                    </div>

                                                </>

                                            )

                                    }

                                </div>

                            )
                        )

                    }

                </div>

            </div>

        );

    }


    return (

        <div className="w-100">

            <div className="row g-4">

                {/* Lower Deck */}

                <div className="col-xl-6">

                    {

                        renderDeck(
                            lowerRows,
                            "Lower Deck"
                        )

                    }

                </div>


                {/* Upper Deck */}

                {

                    upperRows.length > 0 &&

                    <div className="col-xl-6">

                        {

                            renderDeck(
                                upperRows,
                                "Upper Deck"
                            )

                        }

                    </div>

                }

            </div>

        </div>

    );

}

export default SeatGrid;