function PassengerCard({
    index,
    passenger,
    updatePassenger
}) {

    return (

        <div className="card border-0 rounded-4 shadow-sm overflow-hidden mb-4">

            {/* Header */}

            <div className="card-header bg-primary text-white border-0 p-3">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h4 className="mb-1 fw-bold">

                            Passenger {index + 1}

                        </h4>

                        <span className="small">

                            Seat {passenger.seatNumber}

                        </span>

                    </div>


                    {/* Seat Badge */}

                    <div
                        className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center fw-bold"
                        style={{
                            width: "52px",
                            height: "52px",
                            fontSize: "18px"
                        }}
                    >

                        {passenger.seatNumber}

                    </div>

                </div>

            </div>


            {/* Body */}

            <div className="card-body p-4">

                {/* Full Name */}

                <div className="mb-3">

                    <label className="form-label fw-semibold text-primary">

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


                {/* Age & Gender */}

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold text-primary">

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

                        <label className="form-label fw-semibold text-primary">

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