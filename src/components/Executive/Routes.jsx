import AddRouteModal from "./AddRouteModal";
import RouteDetailsModal from "./RouteDetailsModal";
import { useEffect, useState } from "react";
import RouteService from "../../services/RouteService";

function Routes() {

    const [search, setSearch] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);

    const [selectedRoute, setSelectedRoute] = useState(null);

    const [routes, setRoutes] = useState([]);


    useEffect(() => {

        getAllRoutes();

    }, []);


    const getAllRoutes = async () => {

        try {

            const response =
                await RouteService.getAllRoutes();

            console.log(response.data);

            setRoutes(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };


    const filteredRoutes = routes.filter(route =>

        route.originCity
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        route.destinationCity
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    const getRouteById = async (routeId) => {

        try {

            const response =
                await RouteService.getRouteById(routeId);

            console.log(response.data);

            setSelectedRoute(response.data);

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

                        Routes

                    </h2>

                    <p className="text-secondary mb-0">

                        Manage available travel routes across the FastX platform.

                    </p>

                </div>


                <div className="d-flex align-items-center gap-3">

                    <input

                        type="text"

                        className="form-control"

                        style={{ width: "260px" }}

                        placeholder="Search Route..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />


                    <button

                        className="btn btn-primary"

                        onClick={() =>
                            setShowAddModal(true)
                        }

                    >

                        <i className="bi bi-plus-lg"></i>

                        {" "}Add Route

                    </button>

                </div>

            </div>


            {/* Routes Table */}

            <div className="bg-white rounded-4 shadow-sm p-4">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>

                            <th>#</th>

                            <th>Origin</th>

                            <th>Destination</th>

                            <th>Distance</th>

                            <th>Duration</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {

                            filteredRoutes.map((route, index) => (

                                <tr key={route.routeId}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {route.originCity}
                                    </td>

                                    <td>
                                        {route.destinationCity}
                                    </td>

                                    <td>
                                        {route.distanceKm} KM
                                    </td>

                                    <td>
                                        {route.estimatedDurationMinutes} Min
                                    </td>

                                    <td>

                                        {

                                            route.status === "ACTIVE"

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
                                                getRouteById(
                                                    route.routeId
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


                <AddRouteModal

                    show={showAddModal}

                    close={() =>
                        setShowAddModal(false)
                    }

                    refreshRoutes={getAllRoutes}

                />


                <RouteDetailsModal

                    route={selectedRoute}

                    close={() =>
                        setSelectedRoute(null)
                    }

                    refreshRoutes={getAllRoutes}

                />

            </div>

        </div>

    );

}

export default Routes;