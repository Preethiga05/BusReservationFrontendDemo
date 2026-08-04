import { useEffect, useState } from "react";
import "./BusOperatorCss/UpdateBusModal.css";

function UpdateBusModal({

    show,

    bus,

    close

}) {

    const [busName, setBusName] = useState("");

    const [busNumber, setBusNumber] = useState("");

    const [busType, setBusType] = useState("");

    const [totalSeats, setTotalSeats] = useState("");

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [amenities, setAmenities] = useState([]);

    const dummyAmenities = [

        {
            amenityId: 1,
            amenityName: "WiFi",
            description: "High-speed wireless internet",
            status: "ACTIVE"
        },

        {
            amenityId: 2,
            amenityName: "Charging Port",
            description: "USB charging facility",
            status: "ACTIVE"
        },

        {
            amenityId: 3,
            amenityName: "Blanket",
            description: "Comfortable blanket for overnight travel",
            status: "ACTIVE"
        },

        {
            amenityId: 4,
            amenityName: "Water Bottle",
            description: "Complimentary drinking water",
            status: "ACTIVE"
        },

        {
            amenityId: 5,
            amenityName: "CCTV",
            description: "24x7 Security Surveillance",
            status: "ACTIVE"
        },

        {
            amenityId: 6,
            amenityName: "Reading Light",
            description: "Personal reading light",
            status: "ACTIVE"
        }

    ];

    useEffect(() => {

        setAmenities(dummyAmenities);

        if (bus) {

            setBusName(bus.busName);

            setBusNumber(bus.busNumber);

            setBusType(bus.busType);

            setTotalSeats(bus.totalSeats);

            // Dummy selected amenities
            // Tomorrow fetch from BusAmenity API

            setSelectedAmenities([

                1,

                2,

                3

            ]);

        }

    }, [bus]);

    if (!show || !bus) return null;

    const handleBusTypeChange = (e) => {

        const type = e.target.value;

        setBusType(type);

        switch (type) {

            case "SLEEPER_AC":

                setTotalSeats(40);

                break;

            case "SLEEPER_NON_AC":

                setTotalSeats(40);

                break;

            case "SEATER_AC":

                setTotalSeats(45);

                break;

            case "SEATER_NON_AC":

                setTotalSeats(45);

                break;

            default:

                setTotalSeats("");

        }

    };

    const updateBus = () => {

        console.log({

            busId: bus.busId,

            busName,

            busNumber,

            busType,

            totalSeats,

            amenityIds: selectedAmenities

        });

        close();

    };

    return (

        <div className="application-modal-overlay">

            <div className="application-modal">

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>

                <div className="modal-header-section">

                    <div className="application-icon">

                        <i className="bi bi-pencil-square"></i>

                    </div>

                    <h3>

                        Update Bus

                    </h3>

                    <p>

                        Modify the selected bus information.

                    </p>

                </div>
                <div className="modal-body-scroll">
                    <h5 className="section-title">

                        Bus Information

                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>

                                Bus Name

                            </label>

                            <input

                                className="form-control"

                                value={busName}

                                onChange={(e) => setBusName(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Bus Number

                            </label>

                            <input

                                className="form-control"

                                value={busNumber}

                                onChange={(e) => setBusNumber(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Bus Type

                            </label>

                            <select

                                className="form-select"

                                value={busType}

                                onChange={handleBusTypeChange}

                            >

                                <option value="SLEEPER_AC">

                                    Sleeper AC

                                </option>

                                <option value="SLEEPER_NON_AC">

                                    Sleeper Non AC

                                </option>

                                <option value="SEATER_AC">

                                    Seater AC

                                </option>

                                <option value="SEATER_NON_AC">

                                    Seater Non AC

                                </option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Total Seats

                            </label>

                            <input

                                type="number"

                                className="form-control"

                                value={totalSeats}

                                onChange={(e) => setTotalSeats(e.target.value)}

                            />

                        </div>

                        <div className="col-12">

                            <small className="text-muted">

                                💡 Suggested seat count is automatically filled based on the selected bus type. You can modify it if your bus has a different seating configuration.

                            </small>

                        </div>

                    </div>

                    <hr />

                    <h5 className="section-title">

                        Bus Amenities

                    </h5>

                    <div className="row">
                        {

                            amenities

                                .filter(amenity => amenity.status === "ACTIVE")

                                .map((amenity) => (

                                    <div

                                        className="col-md-6 mb-3"

                                        key={amenity.amenityId}

                                    >

                                        <div className="form-check amenity-card">

                                            <input

                                                className="form-check-input"

                                                type="checkbox"

                                                id={`amenity-${amenity.amenityId}`}

                                                checked={

                                                    selectedAmenities.includes(

                                                        amenity.amenityId

                                                    )

                                                }

                                                onChange={(e) => {

                                                    if (e.target.checked) {

                                                        setSelectedAmenities([

                                                            ...selectedAmenities,

                                                            amenity.amenityId

                                                        ]);

                                                    }

                                                    else {

                                                        setSelectedAmenities(

                                                            selectedAmenities.filter(

                                                                item =>

                                                                    item !== amenity.amenityId

                                                            )

                                                        );

                                                    }

                                                }}

                                            />

                                            <label

                                                className="form-check-label"

                                                htmlFor={`amenity-${amenity.amenityId}`}

                                            >

                                                <strong>

                                                    {amenity.amenityName}

                                                </strong>

                                                <br />

                                                <small className="text-muted">

                                                    {amenity.description}

                                                </small>

                                            </label>

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                    <div className="mt-2">

                        <small className="text-muted">

                            💡 Select the amenities available in this bus.

                            Unchecking an amenity will remove it from this bus only.

                        </small>

                    </div>
                </div>

                <div className="modal-footer mt-4">

                    <button

                        className="btn btn-secondary"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-warning"

                        onClick={updateBus}

                    >

                        <i className="bi bi-check-circle me-2"></i>

                        Update Bus

                    </button>

                </div>

            </div>

        </div>

    );

}

export default UpdateBusModal;