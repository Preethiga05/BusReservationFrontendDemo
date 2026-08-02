import "./ExecutiveCss/Passengers.css";
import { useState } from "react";
import PassengerDetailsModal from "./PassengerDetailsModal";
function Passengers() {

    const [search, setSearch] = useState("");
    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const passengers = [

        {
            passengerId: 1,
            username: "arun05",
            name: "Arun Kumar",
            phoneNumber: "9876543210",
            emergencyContact: "9876500000",
            dob: "2000-05-15",
            gender: "MALE",
            address: "Chennai",
            status: "ACTIVE"
        },

        {
            passengerId: 2,
            username: "priya08",
            name: "Priya S",
            phoneNumber: "9876543211",
            emergencyContact: "9876500001",
            dob: "2001-08-20",
            gender: "FEMALE",
            address: "Madurai",
            status: "INACTIVE"
        }

    ];

    return (

        <div className="passengers-page">

            <div className="page-header">

                <div>

                    <h2>

                        Passengers

                    </h2>

                    <p>

                        Manage registered passengers across the FastX platform.

                    </p>

                </div>

                <div className="page-actions">

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search Passenger..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

            </div>

            <div className="table-card">

                <table className="table table-hover align-middle">

                    <thead>

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

                            passengers.map((passenger, index) => (

                                <tr key={passenger.passengerId}>

                                    <td>{index + 1}</td>

                                    <td>{passenger.name}</td>

                                    <td>{passenger.username}</td>

                                    <td>{passenger.phoneNumber}</td>

                                    <td>

                                        {

                                            passenger.status === "ACTIVE"

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

                                            onClick={() => setSelectedPassenger(passenger)}

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

                    close={() => setSelectedPassenger(null)}

                />

            </div>

        </div>

    );

}

export default Passengers;