import "./BusOperatorCss/BusDetailsModal.css";

function BusDetailsModal({

    bus,

    close,
    openUpdate,

    openDeactivate

}) {

    if (!bus) return null;

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

                        <i className="bi bi-bus-front-fill"></i>

                    </div>

                    <h3>

                        Bus Details

                    </h3>

                    <p>

                        View complete information about this bus.

                    </p>

                </div>

                <div className="application-details">

                    <div className="detail-item">

                        <label>

                            Bus Number

                        </label>

                        <span>

                            {bus.busNumber}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Bus Name

                        </label>

                        <span>

                            {bus.busName}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Bus Type

                        </label>

                        <span>

                            {bus.busType}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Total Seats

                        </label>

                        <span>

                            {bus.totalSeats}

                        </span>

                    </div>

                    <div className="detail-item">

                        <label>

                            Status

                        </label>

                        {

                            bus.status === "ACTIVE"

                                ?

                                <span className="badge bg-success">

                                    Active

                                </span>

                                :

                                <span className="badge bg-danger">

                                    Inactive

                                </span>

                        }

                    </div>

                </div>

                <hr />

                <h5>

                    Amenities

                </h5>

                <div className="amenities-list">

                    <span className="amenity-chip">

                        WiFi

                    </span>

                    <span className="amenity-chip">

                        Charging Port

                    </span>

                    <span className="amenity-chip">

                        Water Bottle

                    </span>

                    <span className="amenity-chip">

                        CCTV

                    </span>

                    <span className="amenity-chip">

                        Blanket

                    </span>

                </div>

                <hr />

                <div className="row text-center mt-3">

                    <div className="col">

                        <h3>

                            12

                        </h3>

                        <small>

                            Active Schedules

                        </small>

                    </div>

                    <div className="col">

                        <h3>

                            280

                        </h3>

                        <small>

                            Total Trips

                        </small>

                    </div>

                </div>

                <div className="modal-footer mt-4">

                    <button

                        className="btn btn-warning"

                        onClick={() => {

                            close();

                            openUpdate();

                        }}

                    >

                        Update Bus

                    </button>

                    <button

                        className={
                            bus.status === "ACTIVE"
                                ? "btn btn-danger"
                                : "btn btn-success"
                        }

                        onClick={() => {

                            close();

                            openDeactivate();

                        }}

                    >

                        {

                            bus.status === "ACTIVE"

                                ?

                                "Deactivate Bus"

                                :

                                "Activate Bus"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default BusDetailsModal;