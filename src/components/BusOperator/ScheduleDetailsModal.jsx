function ScheduleDetailsModal({
    schedule,
    close,
    openUpdate,
    openCancel
}) {

    if (!schedule) {
        return null;
    }


    const isScheduled =
        schedule.scheduledStatus === "SCHEDULED";


    const formatDateTime = (dateTime) => {

        if (!dateTime) {
            return "N/A";
        }

        return new Date(dateTime).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content border-0 shadow-lg rounded-4">

                    {/* HEADER */}

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-calendar-week-fill text-primary fs-4"></i>

                                <h5 className="modal-title fw-bold mb-0">

                                    Schedule Details

                                </h5>

                            </div>

                            <small className="text-muted">

                                View complete journey information.

                            </small>

                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                        ></button>

                    </div>


                    {/* BODY */}

                    <div className="modal-body">

                        <div className="row g-3">

                            <div className="col-md-6">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Bus
                                    </small>

                                    <div className="fw-semibold mt-1">
                                        {schedule.busName}
                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Route
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {schedule.originCity}
                                        {" → "}
                                        {schedule.destinationCity}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Journey Date
                                    </small>

                                    <div className="fw-semibold mt-1">
                                        {schedule.journeyDate}
                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Fare
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        ₹ {schedule.fare}

                                    </div>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Departure
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {formatDateTime(
                                            schedule.departureDateTime
                                        )}

                                    </div>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Arrival
                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {formatDateTime(
                                            schedule.arrivalDateTime
                                        )}

                                    </div>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="border rounded-3 p-3">

                                    <small className="text-muted">
                                        Status
                                    </small>

                                    <div className="mt-2">

                                        {isScheduled ? (

                                            <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">

                                                Scheduled

                                            </span>

                                        ) : (

                                            <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-2">

                                                Cancelled

                                            </span>

                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>


                        <hr className="my-4" />


                        <div className="row text-center">

                            <div className="col border-end">

                                <h3 className="fw-bold text-primary">

                                    {schedule.bookedSeats}

                                </h3>

                                <small className="text-muted">

                                    Booked Seats

                                </small>

                            </div>

                            <div className="col">

                                <h3 className="fw-bold text-success">

                                    {schedule.availableSeats}

                                </h3>

                                <small className="text-muted">

                                    Available Seats

                                </small>

                            </div>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={close}
                        >

                            Close

                        </button>


                        {isScheduled && (

                            <>

                                <button
                                    className="btn btn-warning"
                                    onClick={openUpdate}
                                >

                                    <i className="bi bi-pencil-square me-2"></i>

                                    Update Schedule

                                </button>


                                <button
                                    className="btn btn-danger"
                                    onClick={openCancel}
                                >

                                    <i className="bi bi-x-circle me-2"></i>

                                    Cancel Schedule

                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ScheduleDetailsModal;