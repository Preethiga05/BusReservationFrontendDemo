import "./BusOperatorCss/ScheduleDetailsModal.css";

function ScheduleDetailsModal({

    schedule,

    close,

    openUpdate,

    openCancel

}) {

    if (!schedule) return null;

    return (

        <div className="application-modal-overlay">

            <div className="application-modal">

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>

                <div className="modal-header-section">

                    <div className="application-icon">

                        <i className="bi bi-calendar-week-fill"></i>

                    </div>

                    <h3>

                        Schedule Details

                    </h3>

                    <p>

                        View complete journey information.

                    </p>

                </div>

                <div className="application-details">

                    <div className="detail-item">

                        <label>

                            Bus

                        </label>

                        <span>

                            {schedule.busName}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Route

                        </label>

                        <span>

                            {schedule.route}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Journey Date

                        </label>

                        <span>

                            {schedule.journeyDate}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Departure

                        </label>

                        <span>

                            {schedule.departure}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Arrival

                        </label>

                        <span>

                            {schedule.arrival}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Fare

                        </label>

                        <span>

                            ₹ {schedule.fare}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Available Seats

                        </label>

                        <span>

                            {schedule.availableSeats}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Status

                        </label>

                        {

                            schedule.status === "ACTIVE"

                            ?

                            <span className="badge bg-success">

                                Active

                            </span>

                            :

                            <span className="badge bg-danger">

                                Cancelled

                            </span>

                        }

                    </div>

                </div>

                <hr/>

                <div className="row text-center">

                    <div className="col">

                        <h3>

                            22

                        </h3>

                        <small>

                            Booked Seats

                        </small>

                    </div>

                    <div className="col">

                        <h3>

                            18

                        </h3>

                        <small>

                            Available Seats

                        </small>

                    </div>

                </div>

                <div className="modal-footer mt-4">

                    {

                        schedule.status === "ACTIVE"

                        &&

                        <button

                            className="btn btn-warning"

                            onClick={() => {

                                openUpdate();

                            }}

                        >

                            Update Schedule

                        </button>

                    }

                    {

                        schedule.status === "ACTIVE"

                        &&

                        <button

                            className="btn btn-danger"

                            onClick={() => {

                                openCancel();

                            }}

                        >

                            Cancel Schedule

                        </button>

                    }

                </div>

            </div>

        </div>

    );

}

export default ScheduleDetailsModal;