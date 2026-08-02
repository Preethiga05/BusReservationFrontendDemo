import "./ExecutiveCss/Routes.css";
import { useState } from "react";
import AddRouteModal from "./AddRouteModal";
import RouteDetailsModal from "./RouteDetailsModal";

function Routes() {

    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const routes = [

        {
            routeId: 1,
            originCity: "Chennai",
            destinationCity: "Madurai",
            distanceKm: 465,
            estimatedDurationMinutes: 480,
            status: "ACTIVE"
        },

        {
            routeId: 2,
            originCity: "Bengaluru",
            destinationCity: "Chennai",
            distanceKm: 350,
            estimatedDurationMinutes: 420,
            status: "ACTIVE"
        },

        {
            routeId: 3,
            originCity: "Salem",
            destinationCity: "Coimbatore",
            distanceKm: 170,
            estimatedDurationMinutes: 180,
            status: "ACTIVE"
        },

        {
            routeId: 4,
            originCity: "Madurai",
            destinationCity: "Trichy",
            distanceKm: 135,
            estimatedDurationMinutes: 120,
            status: "INACTIVE"
        }

    ];

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

                            routes.map((route, index) => (

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

                                            onClick={() => setSelectedRoute(route)}

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

                />
                <RouteDetailsModal

                    route={selectedRoute}

                    close={() => setSelectedRoute(null)}

                />

            </div>

        </div>

    );

}

export default Routes;