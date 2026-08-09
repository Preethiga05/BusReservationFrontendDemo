import "./PassengerCss/PassengerCard.css";

function PassengerCard({

    index,

    passenger,

    updatePassenger

}) {

    return (

        <div className="passenger-card">

            <div className="passenger-card-header">

                <div>

                    <h4>

                        Passenger {index + 1}

                    </h4>

                    <span>

                        Seat {passenger.seatNumber}

                    </span>

                </div>

                <div className="seat-badge">

                    {passenger.seatNumber}

                </div>

            </div>

            <div className="passenger-card-body">

                <div className="mb-3">

                    <label className="form-label">

                        Full Name

                    </label>

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Enter Passenger Name"

                        value={passenger.fullName}

                        onChange={(e) =>

                            updatePassenger(

                                index,

                                "fullName",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Age

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            placeholder="Age"

                            value={passenger.age}

                            onChange={(e) =>

                                updatePassenger(

                                    index,

                                    "age",

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Gender

                        </label>

                        <select

                            className="form-select"

                            value={passenger.gender}

                            onChange={(e) =>

                                updatePassenger(

                                    index,

                                    "gender",

                                    e.target.value

                                )

                            }

                        >

                            <option value="">

                                Select

                            </option>

                            <option value="MALE">

                                Male

                            </option>

                            <option value="FEMALE">

                                Female

                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PassengerCard;