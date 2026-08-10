import { useState } from "react";
import BusOperatorApplicationService from "../../services/BusOperatorApplicationService";

function PartnerApplication({ close }) {

    const [ownerName, setOwnerName] = useState("");

    const [companyName, setCompanyName] = useState("");

    const [email, setEmail] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [gender, setGender] = useState("");

    const [companyAddress, setCompanyAddress] = useState("");

    const [licenceNumber, setLicenceNumber] = useState("");


    const submitApplication = async () => {

        try {

            const application = {

                ownerName,

                companyName,

                email,

                phoneNumber,

                gender,

                companyAddress,

                licenceNumber

            };


            await BusOperatorApplicationService
                .submitApplication(application);


            alert("Application submitted successfully.");


            setOwnerName("");

            setCompanyName("");

            setEmail("");

            setPhoneNumber("");

            setGender("");

            setCompanyAddress("");

            setLicenceNumber("");


            close();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ??
                "Unable to submit application."
            );

        }

    };


    return (

        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{
                zIndex: 9999,
                backdropFilter: "blur(6px)"
            }}
        >

            <div
                className="bg-white rounded-4 shadow-lg p-4 p-md-5 position-relative"
                style={{
                    width: "750px",
                    maxWidth: "95%"
                }}
            >

                {/* Close Button */}

                <button

                    type="button"

                    className="btn-close position-absolute top-0 end-0 m-3"

                    onClick={close}

                >
                </button>


                {/* Header */}

                <div className="text-center mb-4">

                    <div
                        className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex justify-content-center align-items-center mx-auto mb-3"
                        style={{
                            width: "80px",
                            height: "80px"
                        }}
                    >

                        <i className="bi bi-bus-front-fill fs-1"></i>

                    </div>


                    <h2 className="fw-bold text-primary mb-2">

                        Partner With FastX

                    </h2>


                    <p className="text-secondary mb-0">

                        Join India's trusted bus reservation platform

                    </p>

                </div>


                {/* Form */}

                <div className="row">

                    {/* Owner Name */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Owner Name

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Owner Name"

                            value={ownerName}

                            onChange={(e) =>
                                setOwnerName(e.target.value)
                            }

                        />

                    </div>


                    {/* Company Name */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Company Name

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Company Name"

                            value={companyName}

                            onChange={(e) =>
                                setCompanyName(e.target.value)
                            }

                        />

                    </div>


                    {/* Email */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Email

                        </label>

                        <input

                            type="email"

                            className="form-control"

                            placeholder="Enter Email"

                            value={email}

                            onChange={(e) =>
                                setEmail(e.target.value)
                            }

                        />

                    </div>


                    {/* Phone Number */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Phone Number

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Phone Number"

                            value={phoneNumber}

                            onChange={(e) =>
                                setPhoneNumber(e.target.value)
                            }

                        />

                    </div>


                    {/* Gender */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Gender

                        </label>

                        <select

                            className="form-select"

                            value={gender}

                            onChange={(e) =>
                                setGender(e.target.value)
                            }

                        >

                            <option value="">

                                Select

                            </option>

                            <option value="MALE">

                                Male

                            </option>

                            <option value="FEMALE">

                                Female

                            </option>

                        </select>

                    </div>


                    {/* Licence Number */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Licence Number

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Enter Licence Number"

                            value={licenceNumber}

                            onChange={(e) =>
                                setLicenceNumber(e.target.value)
                            }

                        />

                    </div>


                    {/* Company Address */}

                    <div className="col-12 mb-4">

                        <label className="form-label fw-semibold">

                            Company Address

                        </label>

                        <textarea

                            rows="3"

                            className="form-control"

                            placeholder="Enter Company Address"

                            value={companyAddress}

                            onChange={(e) =>
                                setCompanyAddress(e.target.value)
                            }

                        />

                    </div>

                </div>


                {/* Submit Button */}

                <button

                    type="button"

                    className="btn btn-primary w-100 py-3 fw-semibold"

                    onClick={submitApplication}

                >

                    Submit Application

                </button>

            </div>

        </div>

    );

}

export default PartnerApplication;