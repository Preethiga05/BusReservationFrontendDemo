import { useState } from "react";
import "./BusOperatorCss/AddBusModal.css";

function AddBusModal({

    show,

    close

}) {

    if (!show) return null;

    const [busName, setBusName] = useState("");

    const [busNumber, setBusNumber] = useState("");

    const [busType, setBusType] = useState("");

    const [totalSeats, setTotalSeats] = useState("");

    const saveBus = () => {

        console.log({

            busName,

            busNumber,

            busType,

            totalSeats

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

                        <i className="bi bi-plus-circle-fill"></i>

                    </div>

                    <h3>

                        Add New Bus

                    </h3>

                    <p>

                        Register a new bus under your company.

                    </p>

                </div>

                <div className="row mt-4">

                    <div className="col-md-6 mb-3">

                        <label>

                            Bus Name

                        </label>

                        <input

                            className="form-control"

                            value={busName}

                            onChange={(e)=>setBusName(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Bus Number

                        </label>

                        <input

                            className="form-control"

                            value={busNumber}

                            onChange={(e)=>setBusNumber(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Bus Type

                        </label>

                        <select

                            className="form-select"

                            value={busType}

                            onChange={(e)=>setBusType(e.target.value)}

                        >

                            <option value="">

                                Select Bus Type

                            </option>

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

                            onChange={(e)=>setTotalSeats(e.target.value)}

                        />

                    </div>

                </div>

                <div className="modal-footer">

                    <button

                        className="btn btn-secondary"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-primary"

                        onClick={saveBus}

                    >

                        Save Bus

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddBusModal;