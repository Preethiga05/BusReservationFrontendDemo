import { useState } from "react";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";
import AmenityService from "../../services/AmenityService";

function AmenityDetailsModal({
    amenity,
    close,
    refreshAmenities
}) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!amenity) return null;

    const isActive = amenity.status === "ACTIVE";

    const changeAmenityStatus = async () => {

        try {

            if (isActive) {

                await AmenityService.deactivateAmenity(
                    amenity.amenityId
                );

            }

            else {

                await AmenityService.activateAmenity(
                    amenity.amenityId
                );

            }

            await refreshAmenities();

            setShowConfirmation(false);

            close();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className="modal-content border-0 rounded-4 shadow-lg p-4">

                        {/* Close Button */}

                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-4"
                            onClick={close}
                        >
                        </button>


                        {/* Header */}

                        <div className="text-center mb-4">

                            <div
                                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "75px",
                                    height: "75px"
                                }}
                            >

                                <i className="bi bi-stars fs-2"></i>

                            </div>

                            <h3 className="fw-semibold mb-2">
                                Amenity Details
                            </h3>

                            <p className="text-secondary mb-0">
                                View amenity information.
                            </p>

                        </div>


                        {/* Amenity Details */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Amenity Name
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {amenity.amenityName}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Description
                                </label>

                                <div className="bg-light rounded-3 p-3">
                                    {amenity.description}
                                </div>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold text-secondary">
                                    Status
                                </label>

                                <div className="bg-light rounded-3 p-3">

                                    {
                                        isActive

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

                        </div>


                        {/* Footer */}

                        <div className="d-flex justify-content-end mt-4">

                            <button
                                className={
                                    isActive
                                        ? "btn btn-danger"
                                        : "btn btn-success"
                                }
                                onClick={() =>
                                    setShowConfirmation(true)
                                }
                            >

                                {
                                    isActive
                                        ? "Deactivate Amenity"
                                        : "Activate Amenity"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Confirmation Modal */}

            <ConfirmationModal

                show={showConfirmation}

                title={
                    isActive
                        ? "Deactivate Amenity"
                        : "Activate Amenity"
                }

                message={
                    isActive

                        ?

                        `Are you sure you want to deactivate "${amenity.amenityName}"?

This amenity will no longer be available while adding or updating buses.

This action can be reversed later.`

                        :

                        `Are you sure you want to activate "${amenity.amenityName}"?

This amenity will be available while adding or updating buses.`
                }

                confirmButtonText={
                    isActive
                        ? "Deactivate"
                        : "Activate"
                }

                confirmButtonClass={
                    isActive
                        ? "btn-danger"
                        : "btn-success"
                }

                onCancel={() =>
                    setShowConfirmation(false)
                }

                onConfirm={changeAmenityStatus}

            />

        </>

    );

}

export default AmenityDetailsModal;