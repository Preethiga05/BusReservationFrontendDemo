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

        <div className="p-4">

            {/* Page Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-dark mb-1">

                        Amenities

                    </h2>

                    <p className="text-secondary mb-0">

                        Manage bus amenities available across the FastX platform.

                    </p>

                </div>


                {/* Page Actions */}

                <div className="d-flex align-items-center gap-3">

                    <input

                        type="text"

                        className="form-control"

                        style={{ width: "260px" }}

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


            {/* Table Card */}

            <div className="bg-white rounded-4 shadow-sm p-4">

                <table className="table table-hover align-middle mb-0">

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

                                                <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">

                                                    Active

                                                </span>

                                                :

                                                <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill px-3 py-2">

                                                    Inactive

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={() =>
                                                getAmenityById(amenity.amenityId)
                                            }

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