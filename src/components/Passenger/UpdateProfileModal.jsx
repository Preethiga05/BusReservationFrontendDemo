import { useEffect, useState } from "react";

function UpdateProfileModal({
    passenger,
    close
}) {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [passengerName, setPassengerName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [gender, setGender] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState("");

    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {

        if (passenger) {

            console.log("========== PASSENGER PROFILE ==========");
            console.log("Complete passenger object:", passenger);
            console.log("Passenger Name:", passenger?.passengerName);
            console.log("Name:", passenger?.name);
            console.log("Email:", passenger?.email);
            console.log("Phone:", passenger?.phoneNumber);
            console.log("=======================================");

            setUsername(
                passenger.username || ""
            );

            setPassword("");

            setPassengerName(
                passenger.name || ""
            );
            setEmail(passenger.email || "");
            setPhoneNumber(
                passenger.phoneNumber || ""
            );

            setGender(
                passenger.gender || ""
            );

            setDateOfBirth(
                passenger.dateOfBirth || ""
            );

            setAddress(
                passenger.address || ""
            );

        }

    }, [passenger]);


    const updateProfile = () => {

        const profileData = {

            username: username,

            password: password,

            passengerName: passengerName,

            phoneNumber: phoneNumber,

            gender: gender,

            dob: dateOfBirth,

            address: address

        };

        console.log(
            "Updating Passenger Profile:",
            profileData
        );

        close();

    };


    if (!passenger) {
        return null;
    }


    return (

        <div
            className="modal d-block bg-dark bg-opacity-50"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

                <div className="modal-content border-0 rounded-4 shadow-lg">


                    {/* Close Button */}

                    <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-3 z-3"
                        onClick={close}
                    >
                    </button>


                    {/* Header */}

                    <div className="modal-header border-0 d-block text-center pt-4">

                        <div
                            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                                width: "75px",
                                height: "75px"
                            }}
                        >

                            <i className="bi bi-person-gear fs-2"></i>

                        </div>

                        <h3 className="fw-bold mb-2">

                            Update Profile

                        </h3>

                        <p className="text-secondary mb-0">

                            Update your personal information.

                        </p>

                    </div>


                    {/* Scrollable Body */}

                    <div className="modal-body px-4 pb-3">


                        <h5 className="fw-bold text-primary mb-3">

                            Account Information

                        </h5>


                        <div className="row">


                            {/* Username */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Username

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* New Password */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    New Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter new password"
                                />

                                <small className="text-muted">

                                    Leave blank to keep your current password.

                                </small>

                            </div>


                            {/* Personal Information */}

                            <div className="col-12 mt-2 mb-2">

                                <h5 className="fw-bold text-primary">

                                    Personal Information

                                </h5>

                            </div>


                            {/* Full Name */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={passengerName}
                                    onChange={(e) =>
                                        setPassengerName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* Email */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>


                            {/* Phone Number */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Phone Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* Gender */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Gender

                                </label>

                                <select
                                    className="form-select"
                                    value={gender}
                                    onChange={(e) =>
                                        setGender(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">

                                        Select Gender

                                    </option>

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


                            {/* Date of Birth */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Date of Birth

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateOfBirth}
                                    onChange={(e) =>
                                        setDateOfBirth(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* Address */}

                            <div className="col-12 mb-3">

                                <label className="form-label fw-semibold text-primary">

                                    Address

                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(
                                            e.target.value
                                        )
                                    }
                                ></textarea>

                            </div>


                        </div>

                    </div>


                    {/* Footer */}

                    <div className="modal-footer border-top px-4 py-3">

                        <button
                            className="btn btn-secondary px-4"
                            onClick={close}
                        >

                            Cancel

                        </button>


                        <button
                            className="btn btn-primary px-4"
                            onClick={updateProfile}
                        >

                            <i className="bi bi-check-circle me-2"></i>

                            Update Profile

                        </button>

                    </div>


                </div>

            </div>

        </div>

    );

}

export default UpdateProfileModal;