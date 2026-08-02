import "./ExecutiveCss/Amenities.css";
import AddAmenityModal from "./AddAmenityModal";
import { useState } from "react";
import AmenityDetailsModal from "./AmenityDetailsModal";

function Amenities() {

    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState(null);

    const amenities = [

        {
            id: 1,
            amenityName: "WiFi",
            description: "High-speed internet access",
            status: "ACTIVE"
        },

        {
            id: 2,
            amenityName: "Charging Point",
            description: "USB charging port",
            status: "ACTIVE"
        },

        {
            id: 3,
            amenityName: "Blanket",
            description: "Comfortable travel blanket",
            status: "ACTIVE"
        },

        {
            id: 4,
            amenityName: "Water Bottle",
            description: "Complimentary drinking water",
            status: "INACTIVE"
        }

    ];

    return (

        <div className="amenities-page">

            <div className="page-header">

                <div>

                    <h2>

                        Amenities

                    </h2>

                    <p>

                        Manage bus amenities available across the FastX platform.

                    </p>

                </div>

                <div className="page-actions">

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search Amenity..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={() => setShowAddModal(true)}

                    >

                        <i className="bi bi-plus-lg"></i>

                        {" "}Add Amenity

                    </button>

                </div>

            </div>

            <div className="table-card">

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Amenity</th>

                            <th>Description</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            amenities.map((amenity, index) => (

                                <tr key={amenity.id}>

                                    <td>{index + 1}</td>

                                    <td>{amenity.amenityName}</td>

                                    <td>{amenity.description}</td>

                                    <td>

                                        {

                                            amenity.status === "ACTIVE"

                                                ?

                                                <span className="active-status">

                                                    Active

                                                </span>

                                                :

                                                <span className="inactive-status">

                                                    Inactive

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={() => setSelectedAmenity(amenity)}

                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>
                <AddAmenityModal

                    show={showAddModal}

                    close={() => setShowAddModal(false)}

                />
                <AmenityDetailsModal

                    amenity={selectedAmenity}

                    close={() => setSelectedAmenity(null)}

                />

            </div>

        </div>

    );

}

export default Amenities;