import "./ExecutiveCss/Amenities.css";
import AddAmenityModal from "./AddAmenityModal";

import AmenityDetailsModal from "./AmenityDetailsModal";
import { useEffect, useState } from "react";
import AmenityService from "../../services/AmenityService";

function Amenities() {

    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState(null);

    const [amenities, setAmenities] = useState([]);

    const [filteredAmenities, setFilteredAmenities] = useState([]);
    useEffect(() => {

        getAllAmenities();

    }, []);
    const getAllAmenities = async () => {

        try {

            const response = await AmenityService.getAllAmenities();

            console.log(response.data);

            setAmenities(response.data);

            setFilteredAmenities(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };
    useEffect(() => {

        const filtered = amenities.filter((amenity) =>

            amenity.amenityName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredAmenities(filtered);

    }, [search, amenities]);
    const getAmenityById = async (amenityId) => {

        try {

            const response = await AmenityService.getAmenityById(amenityId);

            console.log(response.data);

            setSelectedAmenity(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };
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

                            filteredAmenities.map((amenity, index) => (

                                <tr key={amenity.amenityId}>

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

                                            onClick={() => getAmenityById(amenity.amenityId)}

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

                    refreshAmenities={getAllAmenities}

                />
                <AmenityDetailsModal

                    amenity={selectedAmenity}

                    close={() => setSelectedAmenity(null)}

                    refreshAmenities={getAllAmenities}

                />
            </div>

        </div>

    );

}

export default Amenities;