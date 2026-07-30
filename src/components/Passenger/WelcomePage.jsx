
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function WelcomePage() {

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [journeyDate, setJourneyDate] = useState("");
    const [buses, setBuses] = useState([]);
    const [searched, setSearched] = useState(false);

    const searchBus = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/bus-schedule/search?source=${source}&destination=${destination}&journeyDate=${journeyDate}&page=0&size=5`
            );

            console.log(response.data);
            setBuses(response.data);
            setSearched(true);

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">FastX</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="row mt-5">
                <div className="col-lg-6">
                    <div className="p-5">
                        <h1 className="display-5 fw-bold">Book. Board. Relax.</h1>
                        <p className="lead mt-4">
                            Book your bus tickets quickly and travel safely
                            with Fast X Bus Reservation System.
                        </p>
                    </div>
                </div>

                <div className="col-lg-6 text-center">
                    <img
                        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
                        className="img-fluid rounded"
                        alt="Bus"
                    />
                </div>
            </div>

            <div className="row mt-5" id="searchCard">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Enter Source"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Enter Destination"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input type="date" className="form-control"
                                        value={journeyDate}
                                        onChange={(e) => setJourneyDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button className="btn btn-primary"
                                    onClick={searchBus}
                                > Search Bus </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                searched && (buses.length > 0 ? (
                        <div className="row mt-4">
                            {
                                buses.map((bus) => (
                                    <div className="col-lg-12 mb-4" key={bus.busScheduleId}>
                                        <div className="card shadow">
                                            <div className="card-body">
                                                <div className="row">
                                                   <div className="col-lg-8">
                                                        <h4 className="fw-bold">{bus.busName}</h4>
                                                        <p className="text-muted">{bus.busOperator}</p>
                                                        <h6 className="text-primary">{bus.busType}</h6>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <h5>
                                                                    {new Date(bus.departureDateTime).toLocaleTimeString([], {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit"
                                                                    })}
                                                                </h5>
                                                                <small>Departure</small>
                                                            </div>

                                                            <div className="col-md-4 text-center">
                                                                <h6>{bus.journeyDuration}</h6>
                                                                <small>Duration</small>
                                                            </div>

                                                            <div className="col-md-4 text-end">
                                                                <h5>
                                                                    {new Date(bus.arrivalDateTime).toLocaleTimeString([], {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit"
                                                                    })}
                                                                </h5>
                                                                <small>Arrival</small>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <strong>Amenities</strong>
                                                        <div
                                                            className="mt-2 d-flex flex-nowrap overflow-auto"
                                                            style={{ gap: "8px" }}
                                                        >
                                                            {
                                                                bus.amenities.map((amenity, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="badge bg-secondary"
                                                                        style={{ whiteSpace: "nowrap" }}
                                                                    >
                                                                        {amenity}
                                                                    </span>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 border-start">
                                                        <div className="text-center">
                                                            <h3 className="text-success">
                                                                ₹ {bus.fare}
                                                            </h3>
                                                            <p>
                                                                Available Seats : 
                                                                <strong>{bus.availableSeats}</strong>
                                                            </p>
                                                            <br />
                                                            <button className="btn btn-primary w-100"> View Seats</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="alert alert-warning mt-4">
                            No buses found for the selected route and journey date.
                        </div>
                    )
                )
            }
        </div>)
}



export default WelcomePage