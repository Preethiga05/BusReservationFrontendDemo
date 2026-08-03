import { useState } from "react";
import "./ExecutiveCss/AddAmenityModal.css";
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

                        <i className="bi bi-stars"></i>

                    </div>

                    <h3>

                        Add Amenity

                    </h3>

                    <p>

                        Create a new amenity available for buses.

                    </p>

                </div>

                <div className="application-details">

                    <div className="detail-item">

                        <label>

                            Amenity Name

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Amenity Name"

                            value={amenityName}

                            onChange={(e) => setAmenityName(e.target.value)}

                        />

                    </div>

                    <div className="detail-item">

                        <label>

                            Description

                        </label>

                        <textarea

                            className="form-control"

                            rows="4"

                            placeholder="Enter Description"

                            value={description}

                            onChange={(e) => setDescription(e.target.value)}

                        />

                    </div>

                </div>

                <div className="modal-footer">

                    <button

                        className="btn btn-primary"

                        onClick={handleSave}

                    >

                        Save Amenity

                    </button>

                </div>

            </div>

        </div>

    );
}


export default AddAmenityModal;