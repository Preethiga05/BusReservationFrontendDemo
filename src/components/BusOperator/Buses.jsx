import "./BusOperatorCss/Buses.css";
import { useEffect, useState } from "react";
import BusDetailsModal from "./BusDetailsModal";
import AddBusModal from "./AddBusModal";
import UpdateBusModal from "./UpdateBusModal";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function Buses() {

    const [selectedBus, setSelectedBus] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    const [search, setSearch] = useState("");

    const [buses] = useState([

        {

            busId: 1,

            busNumber: "TN01AB1234",

            busName: "KPN Express",

            busType: "SLEEPER_AC",

            totalSeats: 40,

            status: "ACTIVE"

        },

        {

            busId: 2,

            busNumber: "TN22XY5678",

            busName: "Sai Travels",

            busType: "SEATER_AC",

            totalSeats: 35,

            status: "ACTIVE"

        },

        {

            busId: 3,

            busNumber: "TN55ZZ8888",

            busName: "GreenLine",

            busType: "SLEEPER_NON_AC",

            totalSeats: 40,

            status: "INACTIVE"

        }

    ]);

    const [filteredBuses, setFilteredBuses] = useState(buses);

    useEffect(() => {

        const filtered = buses.filter(bus =>

            bus.busName.toLowerCase().includes(search.toLowerCase())

            ||

            bus.busNumber.toLowerCase().includes(search.toLowerCase())

        );

        setFilteredBuses(filtered);

    }, [search, buses]);

    return (

        <div className="buses-page">

            <div className="page-header">

                <div>

                    <h2>

                        My Buses

                    </h2>

                    <p>

                        Manage all buses registered under your company.

                    </p>

                </div>

                <div className="header-actions">

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search Bus..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={() => setShowAddModal(true)}

                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Bus

                    </button>

                </div>

            </div>

            <div className="table-card">

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Bus Number</th>

                            <th>Bus Name</th>

                            <th>Type</th>

                            <th>Seats</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredBuses.map((bus, index) => (

                                <tr key={bus.busId}>

                                    <td>

                                        {index + 1}

                                    </td>

                                    <td>

                                        {bus.busNumber}

                                    </td>

                                    <td>

                                        {bus.busName}

                                    </td>

                                    <td>

                                        {bus.busType}

                                    </td>

                                    <td>

                                        {bus.totalSeats}

                                    </td>

                                    <td>

                                        {

                                            bus.status === "ACTIVE"

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

                                        <div className="action-buttons">

                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setSelectedBus(bus)}
                                            >
                                                View
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <BusDetailsModal

    bus={selectedBus}

    close={() => setSelectedBus(null)}

    openUpdate={() => {

        setSelectedBus(selectedBus);

        setShowUpdateModal(true);

    }}

    openDeactivate={() => {

        setShowDeactivateModal(true);

    }}

/>

            <AddBusModal

                show={showAddModal}

                close={() => setShowAddModal(false)}

            />

            <UpdateBusModal

                show={showUpdateModal}

                bus={selectedBus}

                close={() => setShowUpdateModal(false)}

            />

            <ConfirmationModal

                show={showDeactivateModal}

                title="Bus Status"

                message={`Are you sure you want to change the status of "${selectedBus?.busName}"?`}

                confirmButtonText="Yes"

                confirmButtonClass="btn-danger"

                onCancel={() => setShowDeactivateModal(false)}

                onConfirm={() => {

                    console.log("API Tomorrow");

                    setShowDeactivateModal(false);

                }}

            />

        </div>

    );

}

export default Buses;