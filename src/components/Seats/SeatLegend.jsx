function SeatLegend() {

    return (

        <div className="d-flex flex-wrap align-items-center gap-4">

            {/* Available */}

            <div className="d-flex align-items-center gap-2">

                <span
                    className="border border-primary bg-white rounded-2"
                    style={{
                        width: "22px",
                        height: "22px"
                    }}
                ></span>

                <span className="fw-semibold">

                    Available

                </span>

            </div>


            {/* Selected */}

            <div className="d-flex align-items-center gap-2">

                <span
                    className="bg-primary border border-primary rounded-2"
                    style={{
                        width: "22px",
                        height: "22px"
                    }}
                ></span>

                <span className="fw-semibold">

                    Selected

                </span>

            </div>


            {/* Booked */}

            <div className="d-flex align-items-center gap-2">

                <span
                    className="bg-secondary border border-secondary rounded-2"
                    style={{
                        width: "22px",
                        height: "22px"
                    }}
                ></span>

                <span className="fw-semibold">

                    Booked

                </span>

            </div>


            {/* Female Reserved */}

            <div className="d-flex align-items-center gap-2">

                <span
                    className="bg-danger border border-danger rounded-2"
                    style={{
                        width: "22px",
                        height: "22px"
                    }}
                ></span>

                <span className="fw-semibold">

                    Female Reserved

                </span>

            </div>


            {/* Window Seat */}

            <div className="d-flex align-items-center gap-2">

                <span
                    className="bg-info border border-info rounded-2 d-flex justify-content-center align-items-center"
                    style={{
                        width: "22px",
                        height: "22px"
                    }}
                >

                    <i
                        className="bi bi-window-sidebar text-white"
                        style={{
                            fontSize: "12px"
                        }}
                    ></i>

                </span>

                <span className="fw-semibold">

                    Window Seat

                </span>

            </div>

        </div>

    );

}

export default SeatLegend;