function PassengerCard({

    index,
    passenger,
    updatePassenger

}) {

    return (

        <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

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

                    <div
                        className="bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center fw-bold"
                        style={{
                            width: "52px",
                            height: "52px"
                        }}
                    >

                        {passenger.seatNumber}

                    </div>

                </div>

            </div>


            {/* Body */}

            <div className="card-body p-4">

                <div className="row">

                    {/* Full Name */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

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


                    {/* Age */}

                    <div className="col-md-3 mb-3">

                        <label className="form-label fw-semibold">

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


                    {/* Gender */}

                    <div className="col-md-3 mb-3">

                        <label className="form-label fw-semibold">

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

                            <option value="OTHER">

                                Other

                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PassengerCard;