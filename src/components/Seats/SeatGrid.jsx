import "./SeatsCss/SeatGrid.css";

function SeatGrid({

    busType,

    seats,

    selectedSeats,

    setSelectedSeats

}) {

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

        if (

            seat.seatStatus === "BOOKED"

        ) {

            return;

        }

        if (

            isSelected(seat.seatId)

        ) {

            setSelectedSeats(

                selectedSeats.filter(

                    s => s.seatId !== seat.seatId

                )

            );

        }

        else {

            setSelectedSeats(

                [

                    ...selectedSeats,

                    seat

                ]

            );

        }

    }

    function seatClass(seat) {

        let cls = "seat";

        if (

            seat.seatStatus === "BOOKED"

        ) {

            cls += " booked";

        }

        if (

            isSelected(seat.seatId)

        ) {

            cls += " selected";

        }

        return cls;

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

    function renderSeat(seat, windowSeat = false) {

        if (!seat) {

            return (

                <div className="seat-empty"></div>

            );

        }

        return (

            <button

                className={seatClass(seat)}

                onClick={() =>

                    handleSeatClick(seat)

                }

            >

                {

                    windowSeat &&

                    <i className="bi bi-window-sidebar window-icon"></i>

                }

                {

                    seat.seatStatus === "BOOKED" &&

                    <i className="bi bi-lock-fill lock-icon"></i>

                }

                {

                    isSelected(seat.seatId) &&

                    <i className="bi bi-check-circle-fill check-icon"></i>

                }

                <span>

                    {seat.seatNumber}

                </span>

            </button>

        );

    }
        function renderDeck(rows, deckName) {

        return (

            <div className="deck-card">

                <div className="deck-header">

                    <h4>

                        {deckName}

                    </h4>

                </div>

                {

                    deckName === "Lower Deck" &&

                    <div className="driver-container">

                        <div className="driver-box">

                            <i className="bi bi-steering-wheel"></i>

                            Driver

                        </div>

                    </div>

                }

                <div className="deck-body">

                    {

                        rows.map(

                            (

                                row,

                                index

                            ) => (

                                <div

                                    key={index}

                                    className="seat-row"

                                >

                                    {

                                        isSleeper ?

                                        (

                                            <>

                                                {/* Left Window */}

                                                {

                                                    renderSeat(

                                                        row[0],

                                                        true

                                                    )

                                                }

                                                <div className="seat-aisle"></div>

                                                <div className="right-side">

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

                                                <div className="left-side">

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

                                                <div className="seat-aisle"></div>

                                                <div className="right-side">

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

        <div className="seat-grid-wrapper">

            <div className="deck-grid">

                {

                    renderDeck(

                        lowerRows,

                        "Lower Deck"

                    )

                }

                {

                    upperRows.length > 0 &&

                    renderDeck(

                        upperRows,

                        "Upper Deck"

                    )

                }

            </div>

        </div>

    );

}

export default SeatGrid;