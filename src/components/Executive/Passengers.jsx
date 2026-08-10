import PassengerDetailsModal from "./PassengerDetailsModal";
import { useEffect, useState } from "react";
import PassengerService from "../../services/PassengerService";

function Passengers() {

    const [search, setSearch] = useState("");

    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const [passengers, setPassengers] = useState([]);


    useEffect(() => {

        getAllPassengers();

    }, []);


    const getAllPassengers = async () => {

        try {

            const response =
                await PassengerService.getAllPassengers();

            console.log(response.data);

            setPassengers(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };


    const filteredPassengers = passengers.filter(passenger =>

        passenger.name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        passenger.username
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    const getPassengerById = async (passengerId) => {

        try {

            const response =
                await PassengerService.getPassengerById(passengerId);

            console.log(response.data);

            setSelectedPassenger(response.data);

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

                        Passengers

                    </h2>

                    <p className="text-secondary mb-0">

                        Manage registered passengers across the FastX platform.

                    </p>

                </div>


                <div className="d-flex align-items-center gap-3">

                    <input

                        type="text"

                        className="form-control"

                        style={{ width: "260px" }}

                        placeholder="Search Passenger..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>

            </div>


            {/* Table Card */}

            <div className="bg-white rounded-4 shadow-sm p-4">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>

                            <th>#</th>

                            <th>Name</th>

                            <th>Username</th>

                            <th>Phone Number</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {

                            filteredPassengers.map((passenger, index) => (

                                <tr key={passenger.passengerId}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {passenger.name}
                                    </td>

                                    <td>
                                        {passenger.username}
                                    </td>

                                    <td>
                                        {passenger.phoneNumber}
                                    </td>

                                    <td>

                                        {

                                            passenger.status === "ACTIVE"

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
                                                getPassengerById(
                                                    passenger.passengerId
                                                )
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


                <PassengerDetailsModal

                    passenger={selectedPassenger}

                    close={() =>
                        setSelectedPassenger(null)
                    }

                    refreshPassengers={getAllPassengers}

                />

            </div>

        </div>

    );

}

export default Passengers;