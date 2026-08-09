import { useEffect, useState } from "react";

import BusService from "../../services/BusService";
import AmenityService from "../../services/AmenityService";
import BusAmenityService from "../../services/BusAmenityService";

function UpdateBusModal({
    show,
    bus,
    close,
    onBusUpdated
}) {

    const [busName, setBusName] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [busType, setBusType] = useState("");

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    /*
     * Stores the currently ACTIVE BusAmenity records.
     *
     * Example:
     *
     * [
     *   {
     *      busAmenityId: 59,
     *      amenityId: 3,
     *      amenityName: "Charging Point"
     *   }
     * ]
     */
    const [existingBusAmenities, setExistingBusAmenities] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingAmenities, setLoadingAmenities] = useState(false);

    const [error, setError] = useState("");



    /*
     * When the Update Bus modal opens,
     * load the bus information and amenities.
     */
    useEffect(() => {

        if (!show || !bus) {
            return;
        }

        setBusName(bus.busName || "");
        setBusNumber(bus.busNumber || "");
        setBusType(bus.busType || "");

        setError("");

        loadAmenities();

    }, [show, bus]);



    /*
     * Load:
     *
     * 1. All available amenities
     * 2. Amenities currently assigned to this bus
     */
    async function loadAmenities() {

        try {

            setLoadingAmenities(true);

            const [
                allAmenitiesResponse,
                busAmenitiesResponse
            ] = await Promise.all([

                AmenityService.getAllAmenities(),

                BusAmenityService.getByBus(
                    bus.busId
                )

            ]);


            /*
             * Only show ACTIVE amenities from the
             * master Amenity table.
             *
             * If your backend already returns only
             * ACTIVE amenities, this still works.
             */
            const activeAmenities =
                allAmenitiesResponse.data.filter(
                    (amenity) =>
                        !amenity.status ||
                        amenity.status === "ACTIVE"
                );


            setAmenities(activeAmenities);


            const currentBusAmenities =
                busAmenitiesResponse.data;


            setExistingBusAmenities(
                currentBusAmenities
            );


            /*
             * Automatically check the amenities
             * currently assigned to this bus.
             */
            const selectedIds =
                currentBusAmenities.map(
                    (amenity) =>
                        amenity.amenityId
                );


            setSelectedAmenities(selectedIds);

        }
        catch (error) {

            console.log(
                "Amenity loading error:",
                error
            );

            setError(
                "Unable to load bus amenities."
            );

        }
        finally {

            setLoadingAmenities(false);

        }

    }



    /*
     * Check / uncheck an amenity.
     */
    function handleAmenityChange(amenityId) {

        setSelectedAmenities((previous) => {

            if (previous.includes(amenityId)) {

                return previous.filter(
                    (id) => id !== amenityId
                );

            }

            return [
                ...previous,
                amenityId
            ];

        });

    }



    /*
     * Update bus + amenities.
     */
    async function updateBus() {

        setError("");

        if (
            !busName.trim() ||
            !busNumber.trim() ||
            !busType
        ) {

            setError(
                "Please fill all the required fields."
            );

            return;

        }


        try {

            setLoading(true);


            /*
             * ------------------------------------------------
             * 1. UPDATE BUS DETAILS
             * ------------------------------------------------
             */

            const busData = {

                busName: busName.trim(),

                /*
                 * Registration number is disabled,
                 * but we still send the existing value
                 * because the backend DTO may require it.
                 */
                busNumber: busNumber,

                busType: busType,

                /*
                 * Seat count cannot be changed after
                 * bus creation.
                 */
                totalSeats: bus.totalSeats

            };


            await BusService.updateBus(
                bus.busId,
                busData
            );



            /*
             * ------------------------------------------------
             * 2. FIND REMOVED AMENITIES
             * ------------------------------------------------
             *
             * Existing active amenities:
             *
             * [3, 4, 5, 6]
             *
             * New selection:
             *
             * [3, 4, 5, 7]
             *
             * Therefore:
             *
             * 6 needs to be deactivated.
             */

            const removedAmenities =
                existingBusAmenities.filter(
                    (existingAmenity) =>
                        !selectedAmenities.includes(
                            existingAmenity.amenityId
                        )
                );



            /*
             * ------------------------------------------------
             * 3. DEACTIVATE REMOVED AMENITIES
             * ------------------------------------------------
             */

            for (
                const busAmenity
                of removedAmenities
            ) {

                await BusAmenityService.deactivate(
                    busAmenity.busAmenityId
                );

            }



            /*
             * ------------------------------------------------
             * 4. ADD / REACTIVATE SELECTED AMENITIES
             * ------------------------------------------------
             *
             * Your improved backend add() method should:
             *
             * - create a new BusAmenity if it doesn't exist
             * - set existing INACTIVE relationship to ACTIVE
             * - leave existing ACTIVE relationship ACTIVE
             *
             * Therefore we can simply send all selected IDs.
             */

            if (
                selectedAmenities.length > 0
            ) {

                await BusAmenityService.add(
                    bus.busId,
                    selectedAmenities
                );

            }



            /*
             * ------------------------------------------------
             * 5. REFRESH BUSES
             * ------------------------------------------------
             */

            if (onBusUpdated) {

                await onBusUpdated();

            }


            close();

        }
        catch (error) {

            console.log(
                "Update bus error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update bus."
            );

        }
        finally {

            setLoading(false);

        }

    }



    if (!show || !bus) {

        return null;

    }



    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div
                className="modal-dialog modal-dialog-centered modal-lg"
            >

                <div className="modal-content border-0 shadow">


                    {/* ================= HEADER ================= */}

                    <div className="modal-header">

                        <div>

                            <div className="d-flex align-items-center gap-2">

                                <i className="bi bi-pencil-square text-primary fs-4"></i>

                                <h5 className="modal-title mb-0">

                                    Update Bus

                                </h5>

                            </div>

                            <small className="text-muted">

                                Update bus information and amenities.

                            </small>

                        </div>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                            disabled={loading}
                        ></button>

                    </div>



                    {/* ================= BODY ================= */}

                    <div className="modal-body">


                        {error && (

                            <div
                                className="alert alert-danger"
                                role="alert"
                            >

                                <i className="bi bi-exclamation-circle me-2"></i>

                                {error}

                            </div>

                        )}



                        {/* ================= BUS DETAILS ================= */}

                        <h6 className="fw-bold mb-3">

                            Bus Information

                        </h6>


                        <div className="row g-3">


                            {/* Bus Name */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={busName}
                                    onChange={(e) =>
                                        setBusName(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                />

                            </div>



                            {/* Registration Number */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Registration Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={busNumber}
                                    disabled
                                />

                                <small className="text-muted">

                                    Registration number cannot be changed after bus registration.

                                </small>

                            </div>



                            {/* Bus Type */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Bus Type

                                </label>

                                <select
                                    className="form-select"
                                    value={busType}
                                    onChange={(e) =>
                                        setBusType(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
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



                            {/* Total Seats */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Total Seats

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={bus.totalSeats}
                                    disabled
                                />

                                <small className="text-muted">

                                    Seat count cannot be changed after bus creation.

                                </small>

                            </div>

                        </div>



                        <hr className="my-4" />



                        {/* ================= AMENITIES ================= */}

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <h6 className="fw-bold mb-1">

                                    Amenities

                                </h6>

                                <small className="text-muted">

                                    Select the amenities available on this bus.

                                </small>

                            </div>

                        </div>



                        {loadingAmenities ? (

                            <div className="text-center py-4">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="text-muted mt-2 mb-0">

                                    Loading amenities...

                                </p>

                            </div>

                        ) : amenities.length === 0 ? (

                            <div className="alert alert-light border">

                                <i className="bi bi-info-circle me-2"></i>

                                No active amenities available.

                            </div>

                        ) : (

                            <div className="row g-2">

                                {amenities.map(
                                    (amenity) => (

                                        <div
                                            className="col-md-4"
                                            key={
                                                amenity.amenityId
                                            }
                                        >

                                            <div
                                                className={`form-check border rounded p-3 h-100 ${
                                                    selectedAmenities.includes(
                                                        amenity.amenityId
                                                    )
                                                        ? "border-primary bg-light"
                                                        : ""
                                                }`}
                                            >

                                                <input
                                                    type="checkbox"
                                                    className="form-check-input ms-0 me-2"
                                                    id={`update-amenity-${amenity.amenityId}`}
                                                    checked={selectedAmenities.includes(
                                                        amenity.amenityId
                                                    )}
                                                    onChange={() =>
                                                        handleAmenityChange(
                                                            amenity.amenityId
                                                        )
                                                    }
                                                    disabled={loading}
                                                />

                                                <label
                                                    className="form-check-label fw-semibold"
                                                    htmlFor={`update-amenity-${amenity.amenityId}`}
                                                >

                                                    {
                                                        amenity.amenityName
                                                    }

                                                </label>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}



                        <div className="mt-3">

                            <small className="text-muted">

                                <i className="bi bi-info-circle me-1"></i>

                                Unchecking an amenity removes it from this bus. You can add it again later.

                            </small>

                        </div>


                    </div>



                    {/* ================= FOOTER ================= */}

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={close}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={updateBus}
                            disabled={
                                loading ||
                                loadingAmenities
                            }
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>

                                    Saving Changes...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Save Changes

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UpdateBusModal;