import { useEffect, useState } from "react";

import BusDetailsModal from "./BusDetailsModal";
import AddBusModal from "./AddBusModal";

import ConfirmationModal from "../RusableComponents/ConfirmationModal";

import BusService from "../../services/BusService";
import UpdateBusModal from "./UpdateBusModal";


function Buses() {

    const [buses, setBuses] = useState([]);

    const [filteredBuses, setFilteredBuses] = useState([]);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);

    const [selectedBus, setSelectedBus] = useState(null);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadBuses();

    }, []);


    async function loadBuses() {

    try {

        const response =
            await BusService.getOwnBuses();

        console.log(
            "Buses:",
            response.data
        );

        setBuses(response.data);

    }
    catch (error) {

        console.error(
            "Failed to load buses:",
            error
        );

    }

}


    useEffect(() => {

        const value =
            search.toLowerCase().trim();

        const filtered =
            buses.filter((bus) =>

                bus.busName
                    ?.toLowerCase()
                    .includes(value)

                ||

                bus.busNumber
                    ?.toLowerCase()
                    .includes(value)

                ||

                bus.busType
                    ?.toLowerCase()
                    .includes(value)

            );

        setFilteredBuses(filtered);

    }, [search, buses]);


    async function changeBusStatus() {

        if (!selectedBus) {
            return;
        }


        try {

            if (selectedBus.busStatus === "ACTIVE") {

                await BusService.deactivateBus(
                    selectedBus.busId
                );

            }
            else {

                await BusService.activateBus(
                    selectedBus.busId
                );

            }


            setShowDeactivateModal(false);

            setSelectedBus(null);

            await loadBuses();

        }
        catch (error) {

            console.log(
                "Bus status update error:",
                error
            );

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Unable to change bus status."
            );

        }

    }

    return (

        <div className="container-fluid py-4 px-4">


            {/* PAGE HEADER */}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>

                    <h2 className="fw-bold text-primary mb-1">

                        My Buses

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all buses registered under your company.

                    </p>

                </div>


                <div className="d-flex gap-2">

                    <input
                        type="text"
                        className="form-control"
                        style={{
                            width: "260px"
                        }}
                        placeholder="Search Bus..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    <button
                        className="btn btn-primary text-nowrap"
                        onClick={() =>
                            setShowAddModal(true)
                        }
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Bus

                    </button>

                </div>

            </div>


            {/* ERROR */}

            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>
            }


            {/* TABLE CARD */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-3 p-md-4">


                    {
                        loading

                            ?

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="text-muted mt-3 mb-0">

                                    Loading buses...

                                </p>

                            </div>

                            :

                            filteredBuses.length === 0

                                ?

                                <div className="text-center py-5">

                                    <i
                                        className="bi bi-bus-front text-muted"
                                        style={{
                                            fontSize: "3rem"
                                        }}
                                    ></i>

                                    <h5 className="mt-3">

                                        No buses found

                                    </h5>

                                    <p className="text-muted">

                                        {
                                            search
                                                ? "No buses match your search."
                                                : "You have not registered any buses yet."
                                        }

                                    </p>

                                </div>

                                :

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle mb-0">

                                        <thead className="table-light">

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
                                                filteredBuses.map(
                                                    (bus, index) => (

                                                        <tr
                                                            key={bus.busId}
                                                        >

                                                            <td>

                                                                {index + 1}

                                                            </td>

                                                            <td className="fw-semibold">

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
                                                                    bus.busStatus === "ACTIVE"

                                                                        ?

                                                                        <span className="badge bg-success-subtle text-success">

                                                                            Active

                                                                        </span>

                                                                        :

                                                                        <span className="badge bg-danger-subtle text-danger">

                                                                            Inactive

                                                                        </span>
                                                                }

                                                            </td>

                                                            <td>

                                                                <button
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={() =>
                                                                        setSelectedBus(bus)
                                                                    }
                                                                >

                                                                    <i className="bi bi-eye me-1"></i>

                                                                    View

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                    }

                </div>

            </div>


            {/* BUS DETAILS */}

            {
                selectedBus &&

                !showDeactivateModal &&

                <BusDetailsModal

                    bus={selectedBus}

                    close={() =>
                        setSelectedBus(null)
                    }

                    openUpdate={() => {

                        setShowUpdateModal(true);

                    }}

                    openDeactivate={() => {

                        setShowDeactivateModal(true);

                    }}

                />
            }

            {/* ADD BUS */}


            <AddBusModal

                show={showAddModal}

                close={() =>
                    setShowAddModal(false)
                }

                onBusAdded={loadBuses}

            />


            {/* STATUS CONFIRMATION */}

            <ConfirmationModal

    show={showDeactivateModal}

    title={
        selectedBus?.busStatus === "ACTIVE"
            ? "Deactivate Bus"
            : "Activate Bus"
    }

    message={`Are you sure you want to ${
        selectedBus?.busStatus === "ACTIVE"
            ? "deactivate"
            : "activate"
    } "${selectedBus?.busName}"?`}

    confirmButtonText="Yes"

    confirmButtonClass={
        selectedBus?.busStatus === "ACTIVE"
            ? "btn-danger"
            : "btn-success"
    }

    onCancel={() => {
        setShowDeactivateModal(false);
    }}

    onConfirm={async () => {

        try {

            console.log(
                "Selected bus:",
                selectedBus
            );

            console.log(
                "Bus ID:",
                selectedBus?.busId
            );

            if (!selectedBus) {
                return;
            }

            if (selectedBus.busStatus === "ACTIVE") {

                console.log(
                    "Calling deactivate API..."
                );

                await BusService.deactivateBus(
                    selectedBus.busId
                );

            } else {

                console.log(
                    "Calling activate API..."
                );

                await BusService.activateBus(
                    selectedBus.busId
                );

            }

            console.log(
                "Bus status updated successfully"
            );

            setShowDeactivateModal(false);

            setSelectedBus(null);

            // Reload buses
            await loadBuses();

        }
        catch (error) {

            console.error(
                "Bus status update failed:",
                error
            );

            console.error(
                "Response:",
                error.response?.data
            );

            console.error(
                "Status:",
                error.response?.status
            );

        }

    }}

/>

            <UpdateBusModal

                show={showUpdateModal}

                bus={selectedBus}

                close={() => {

                    setShowUpdateModal(false);

                }}

                onBusUpdated={async () => {

                    await loadBuses();

                    setShowUpdateModal(false);

                    setSelectedBus(null);

                }}

            />

        </div>

    );

}

export default Buses;