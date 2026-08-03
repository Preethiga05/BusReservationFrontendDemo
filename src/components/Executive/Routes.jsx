import "./ExecutiveCss/Routes.css";

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

        const response = await RouteService.getAllRoutes();

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

        const response = await RouteService.getRouteById(routeId);

        console.log(response.data);

        setSelectedRoute(response.data);

    }

    catch (err) {

        console.log(err);

    }

};
    return (

        <div className="routes-page">

            <div className="page-header">

                <div>

                    <h2>

                        Routes

                    </h2>

                    <p>

                        Manage available travel routes across the FastX platform.

                    </p>

                </div>

                <div className="page-actions">

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search Route..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={() => setShowAddModal(true)}

                    >

                        <i className="bi bi-plus-lg"></i>

                        {" "}Add Route

                    </button>

                </div>

            </div>

            <div className="table-card">

                <table className="table table-hover align-middle">

                    <thead>

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

                                    <td>{index + 1}</td>

                                    <td>{route.originCity}</td>

                                    <td>{route.destinationCity}</td>

                                    <td>{route.distanceKm} KM</td>

                                    <td>{route.estimatedDurationMinutes} Min</td>

                                    <td>

                                        {

                                            route.status === "ACTIVE"

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

                                           onClick={() => getRouteById(route.routeId)}
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

    close={() => setShowAddModal(false)}

    refreshRoutes={getAllRoutes}

/>
                <RouteDetailsModal

    route={selectedRoute}

    close={() => setSelectedRoute(null)}

    refreshRoutes={getAllRoutes}

/>

            </div>

        </div>

    );

}

export default Routes;