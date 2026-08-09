import { useEffect, useState } from "react";
import BusAmenityService from "../../services/BusAmenityService";

function BusDetailsModal({
    bus,
    close,
    openUpdate,
    openDeactivate
}) {

    const [amenities, setAmenities] = useState([]);

    const [loadingAmenities, setLoadingAmenities] = useState(false);

    const [amenityError, setAmenityError] = useState("");
    


    useEffect(() => {

        if (!bus) {
            return;
        }

        loadAmenities();

    }, [bus]);


    async function loadAmenities() {

        try {

            setLoadingAmenities(true);

            setAmenityError("");

            console.log(
                "Loading amenities for bus:",
                bus.busId
            );

            const response =
                await BusAmenityService.getByBus(
                    bus.busId
                );

            console.log(
                "Bus amenities response:",
                response.data
            );

            setAmenities(response.data);

        }
        catch (error) {

            console.log(
                "Bus amenities loading error:",
                error
            );

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Response:",
                error.response?.data
            );

            setAmenities([]);

            setAmenityError(
                "Unable to load amenities."
            );

        }
        finally {

            setLoadingAmenities(false);

        }

    }


    if (!bus) {
        return null;
    }


    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content shadow">


                    {/* HEADER */}

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-bus-front-fill text-primary fs-4"></i>

                                <h5 className="modal-title mb-0">

                                    Bus Details

                                </h5>

                            </div>

                            <small className="text-muted">

                                View complete information about this bus.

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


                        {/* BUS INFORMATION */}

                        <div className="row g-3">


                            <div className="col-md-6">

                                <div className="border rounded p-3">

                                    <small className="text-muted">

                                        Bus Number

                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {bus.busNumber || "N/A"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded p-3">

                                    <small className="text-muted">

                                        Bus Name

                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {bus.busName || "N/A"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded p-3">

                                    <small className="text-muted">

                                        Bus Type

                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {bus.busType || "N/A"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="border rounded p-3">

                                    <small className="text-muted">

                                        Total Seats

                                    </small>

                                    <div className="fw-semibold mt-1">

                                        {bus.totalSeats}

                                    </div>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="border rounded p-3">

                                    <small className="text-muted">

                                        Status

                                    </small>

                                    <div className="mt-2">

                                        {bus.busStatus === "ACTIVE" ? (

                                            <span className="badge bg-success">

                                                Active

                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                        )}

                                    </div>

                                </div>

                            </div>


                        </div>


                        <hr className="my-4" />


                        {/* AMENITIES */}

                        <h6 className="fw-semibold">

                            Amenities

                        </h6>


                        <div className="d-flex flex-wrap gap-2 mt-3">


                            {loadingAmenities ? (

                                <div className="text-muted">

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Loading amenities...

                                </div>

                            ) : amenityError ? (

                                <div className="alert alert-danger w-100 mb-0">

                                    {amenityError}

                                </div>

                            ) : amenities.length > 0 ? (

                                amenities.map((amenity) => (

                                    <span
                                        key={amenity.busAmenityId}
                                        className="badge text-bg-light border"
                                    >

                                        {amenity.amenityName}

                                    </span>

                                ))

                            ) : (

                                <span className="text-muted">

                                    No amenities assigned.

                                </span>

                            )}

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


                        <button
                            className="btn btn-warning"
                            onClick={openUpdate}
                        >

                            <i className="bi bi-pencil-square me-2"></i>

                            Update Bus

                        </button>


                        <button
                            className={
                                bus.busStatus === "ACTIVE"
                                    ? "btn btn-danger"
                                    : "btn btn-success"
                            }
                            onClick={openDeactivate}
                        >

                            <i
                                className={
                                    bus.busStatus === "ACTIVE"
                                        ? "bi bi-toggle-off me-2"
                                        : "bi bi-toggle-on me-2"
                                }
                            ></i>

                            {
                                bus.busStatus === "ACTIVE"
                                    ? "Deactivate Bus"
                                    : "Activate Bus"
                            }

                        </button>


                    </div>


                </div>

            </div>

        </div>

    );

}

export default BusDetailsModal;