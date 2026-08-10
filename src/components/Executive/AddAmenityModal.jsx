import { useState } from "react";
import AmenityService from "../../services/AmenityService";

function AddAmenityModal({
    show,
    close,
    refreshAmenities
}) {

    const [amenityName, setAmenityName] = useState("");

    const [description, setDescription] = useState("");

    if (!show) return null;

    const handleSave = async () => {

        try {

            const amenity = {

                amenityName,

                description

            };

            await AmenityService.addAmenity(amenity);

            setAmenityName("");

            setDescription("");

            await refreshAmenities();

            close();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

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
                            Add Amenity
                        </h3>

                        <p className="text-secondary mb-0">
                            Create a new amenity available for buses.
                        </p>

                    </div>


                    {/* Form */}

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Amenity Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Amenity Name"
                                value={amenityName}
                                onChange={(e) =>
                                    setAmenityName(e.target.value)
                                }
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-secondary">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    {/* Footer */}

                    <div className="d-flex justify-content-end mt-4">

                        <button
                            type="button"
                            className="btn btn-primary px-4"
                            onClick={handleSave}
                        >

                            Save Amenity

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddAmenityModal;