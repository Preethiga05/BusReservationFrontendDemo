import { useEffect, useState } from "react";
import "./BusOperatorCss/UpdateProfileModal.css";

function UpdateProfileModal({

    show,

    operator,

    close

}) {

    const [busOperatorName, setBusOperatorName] = useState("");

    const [companyName, setCompanyName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [gender, setGender] = useState("");

    const [companyAddress, setCompanyAddress] = useState("");

    useEffect(() => {

        if (operator) {

            setBusOperatorName(operator.busOperatorName);

            setCompanyName(operator.companyName);

            setPhoneNumber(operator.phoneNumber);

            setGender(operator.gender);

            setCompanyAddress(operator.companyAddress);

        }

    }, [operator]);

    if (!show) return null;

    const updateProfile = () => {

        console.log({

            busOperatorName,

            companyName,

            phoneNumber,

            gender,

            companyAddress

        });

        close();

    };

    return (

        <div className="application-modal-overlay">

            <div className="application-modal profile-modal">

                <button

                    className="close-modal-btn"

                    onClick={close}

                >

                    <i className="bi bi-x-lg"></i>

                </button>

                <div className="modal-header-section">

                    <div className="application-icon">

                        <i className="bi bi-person-circle"></i>

                    </div>

                    <h3>

                        Update Profile

                    </h3>

                    <p>

                        Update your company information.

                    </p>

                </div>

                <div className="profile-modal-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>

                                Operator Name

                            </label>

                            <input

                                className="form-control"

                                value={busOperatorName}

                                onChange={(e)=>setBusOperatorName(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Company Name

                            </label>

                            <input

                                className="form-control"

                                value={companyName}

                                onChange={(e)=>setCompanyName(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Licence Number

                            </label>

                            <input

                                className="form-control"

                                value={operator.licenceNumber}

                                disabled

                            />

                            <small className="text-muted">

                                Licence Number cannot be modified.

                            </small>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Phone Number

                            </label>

                            <input

                                className="form-control"

                                value={phoneNumber}

                                onChange={(e)=>setPhoneNumber(e.target.value)}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Gender

                            </label>

                            <select

                                className="form-select"

                                value={gender}

                                onChange={(e)=>setGender(e.target.value)}

                            >

                                <option value="MALE">

                                    Male

                                </option>

                                <option value="FEMALE">

                                    Female

                                </option>

                            </select>

                        </div>

                        <div className="col-12 mb-3">

                            <label>

                                Company Address

                            </label>

                            <textarea

                                rows="4"

                                className="form-control"

                                value={companyAddress}

                                onChange={(e)=>setCompanyAddress(e.target.value)}

                            />

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