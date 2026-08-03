import "./ExecutiveCss/Passengers.css";

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

        const response = await PassengerService.getAllPassengers();

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

        const response = await PassengerService.getPassengerById(passengerId);

        console.log(response.data);

        setSelectedPassenger(response.data);

    }

    catch (err) {

        console.log(err);

    }

};
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

                            filteredPassengers.map((passenger, index) => (

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

                                            onClick={() => getPassengerById(passenger.passengerId)}
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

    refreshPassengers={getAllPassengers}

/>

            </div>

        </div>

    );

}

export default Passengers;