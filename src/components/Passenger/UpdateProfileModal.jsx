import { useEffect, useState } from "react";
import "./PassengerCss/UpdateProfileModal.css";

function UpdateProfileModal({

    passenger,

    close

}) {

    const [passengerName, setPassengerName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [gender, setGender] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState("");

    const [address, setAddress] = useState("");

    useEffect(() => {

        if (passenger) {

            setPassengerName(passenger.passengerName);

            setPhoneNumber(passenger.phoneNumber);

            setGender(passenger.gender);

            setDateOfBirth(passenger.dateOfBirth);

            setAddress(passenger.address);

        }

    }, [passenger]);

    const updateProfile = () => {

        console.log({

            passengerName,

            phoneNumber,

            gender,

            dateOfBirth,

            address

        });

        close();

    };

    if (!passenger) return null;

    return (

        <div className="application-modal-overlay">

            <div className="application-modal profile-update-modal">

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>

                <div className="modal-header-section">

                    <div className="application-icon">

                        <i className="bi bi-person-gear"></i>

                    </div>

                    <h3>

                        Update Profile

                    </h3>

                    <p>

                        Update your personal information.

                    </p>

                </div>

                <div className="modal-body-scroll">

                    <h5 className="section-title">

                        Personal Information

                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>

                                Full Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                value={passengerName}

                                onChange={(e) => setPassengerName(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Email

                            </label>

                            <input

                                type="email"

                                className="form-control"

                                value={passenger.email}

                                disabled

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Phone Number

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                value={phoneNumber}

                                onChange={(e) => setPhoneNumber(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Gender

                            </label>

                            <select

                                className="form-select"

                                value={gender}

                                onChange={(e) => setGender(e.target.value)}

                            >

                                <option value="MALE">

                                    Male

                                </option>

                                <option value="FEMALE">

                                    Female

                                </option>

                                <option value="OTHER">

                                    Other

                                </option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Date of Birth

                            </label>

                            <input

                                type="date"

                                className="form-control"

                                value={dateOfBirth}

                                onChange={(e) =>

                                    setDateOfBirth(e.target.value)

                                }

                            />

                        </div>

                        <div className="col-12 mb-3">

                            <label>

                                Address

                            </label>

                            <textarea

                                rows="4"

                                className="form-control"

                                value={address}

                                onChange={(e) =>

                                    setAddress(e.target.value)

                                }

                            >

                            </textarea>

                        </div>

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

                        onClick={updateProfile}

                    >

                        <i className="bi bi-check-circle me-2"></i>

                        Update Profile

                    </button>

                </div>

            </div>

        </div>

    );

}

export default UpdateProfileModal;