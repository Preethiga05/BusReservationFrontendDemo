import { useEffect, useState } from "react";
import BusService from "../../services/BusService";
import AmenityService from "../../services/AmenityService";
import BusAmenityService from "../../services/BusAmenityService";

function AddBusModal({
    show,
    close,
    onBusAdded
}) {

    const [busName, setBusName] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [busType, setBusType] = useState("");
    const [totalSeats, setTotalSeats] = useState("");

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!show) {
            return;
        }

        loadAmenities();

    }, [show]);


    async function loadAmenities() {

        try {

            const response =
                await AmenityService.getAllAmenities();

            setAmenities(response.data);

        }
        catch (error) {

            console.log("Amenity loading error:", error);

            setError("Unable to load amenities.");

        }

    }


    function handleAmenityChange(amenityId) {

        setSelectedAmenities((previous) => {

            if (previous.includes(amenityId)) {

                return previous.filter(
                    id => id !== amenityId
                );

            }

            return [
                ...previous,
                amenityId
            ];

        });

    }


    async function saveBus() {

        setError("");

        if (
            !busName ||
            !busNumber ||
            !busType ||
            !totalSeats
        ) {

            setError("Please fill all the required fields.");

            return;

        }

        try {

            setLoading(true);

            const busData = {

                busName: busName,

                busNumber: busNumber,

                busType: busType,

                totalSeats: Number(totalSeats)

            };


            /*
             * First create the bus.
             */

            const response =
                await BusService.addBus(busData);


            const createdBus = response.data;


            /*
             * Then attach the selected amenities.
             */

            if (
                selectedAmenities.length > 0 &&
                createdBus.busId
            ) {

                await BusAmenityService.add(

                    createdBus.busId,

                    selectedAmenities

                );

            }


            if (onBusAdded) {

                await onBusAdded();

            }


            setBusName("");
            setBusNumber("");
            setBusType("");
            setTotalSeats("");
            setSelectedAmenities([]);

            close();

        }
        catch (error) {

            console.log(
                "Add bus error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to add bus."
            );

        }
        finally {

            setLoading(false);

        }

    }


    if (!show) {

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

            <div className="modal-dialog modal-dialog-centered modal-lg">

                <div className="modal-content border-0 shadow">

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-plus-circle-fill text-primary fs-4"></i>

                                <h5 className="modal-title mb-0">

                                    Add New Bus

                                </h5>

                            </div>

                            <small className="text-muted">

                                Register a new bus under your company.

                            </small>

                        </div>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                        ></button>

                    </div>


                    <div className="modal-body">

                        {error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )}


                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={busName}
                                    onChange={(e) =>
                                        setBusName(e.target.value)
                                    }
                                    placeholder="Enter bus name"
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Registration Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={busNumber}
                                    onChange={(e) =>
                                        setBusNumber(e.target.value)
                                    }
                                    placeholder="XX00XX0000"
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Type

                                </label>

                                <select
                                    className="form-select"
                                    value={busType}
                                    onChange={(e) =>
                                        setBusType(e.target.value)
                                    }
                                >

                                    <option value="">

                                        Select Bus Type

                                    </option>

                                    <option value="SLEEPER_AC">

                                        Sleeper AC

                                    </option>

                                    <option value="SLEEPER_NON_AC">

                                        Sleeper Non AC

                                    </option>

                                    <option value="SEATER_AC">

                                        Seater AC

                                    </option>

                                    <option value="SEATER_NON_AC">

                                        Seater Non AC

                                    </option>

                                </select>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Total Seats

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={totalSeats}
                                    onChange={(e) =>
                                        setTotalSeats(e.target.value)
                                    }
                                    placeholder="Enter total seats"
                                />

                            </div>


                            {/* Amenities */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">

                                    Amenities

                                </label>

                                <div className="row g-2">

                                    {amenities.map((amenity) => (

                                        <div
                                            className="col-md-4"
                                            key={amenity.amenityId}
                                        >

                                            <div className="form-check border rounded p-2">

                                                <input
                                                    type="checkbox"
                                                    className="form-check-input ms-0 me-2"
                                                    id={`amenity-${amenity.amenityId}`}
                                                    checked={selectedAmenities.includes(
                                                        amenity.amenityId
                                                    )}
                                                    onChange={() =>
                                                        handleAmenityChange(
                                                            amenity.amenityId
                                                        )
                                                    }
                                                />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`amenity-${amenity.amenityId}`}
                                                >

                                                    {amenity.amenityName}

                                                </label>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={close}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        <button
                            className="btn btn-primary"
                            onClick={saveBus}
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Saving...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Save Bus

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddBusModal;