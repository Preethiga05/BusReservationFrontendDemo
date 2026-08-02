import { useState } from "react";
import "./PartnerApplication.css";

function PartnerApplication({ close }) {

    const [ownerName, setOwnerName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [licenceNumber, setLicenceNumber] = useState("");

    const submitApplication = () => {

        console.log({

            ownerName,
            companyName,
            email,
            phoneNumber,
            gender,
            companyAddress,
            licenceNumber

        });

    }

    return (

        <div className="partner-overlay">

            <div className="partner-container">

                <button
                    className="close-btn"
                    onClick={close}
                >
                    <i className="bi bi-x-lg"></i>
                </button>

                <div className="partner-header">

                    <div className="partner-icon">

                        <i className="bi bi-bus-front-fill"></i>

                    </div>

                    <h2>Partner With FastX</h2>

                    <p>
                        Join India's trusted bus reservation platform
                    </p>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Owner Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={ownerName}
                            onChange={(e)=>setOwnerName(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Company Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={companyName}
                            onChange={(e)=>setCompanyName(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Email

                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Phone Number

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Gender

                        </label>

                        <select
                            className="form-select"
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                        >

                            <option value="">Select</option>

                            <option value="MALE">Male</option>

                            <option value="FEMALE">Female</option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Licence Number

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={licenceNumber}
                            onChange={(e)=>setLicenceNumber(e.target.value)}
                        />

                    </div>

                    <div className="col-12 mb-4">

                        <label className="form-label">

                            Company Address

                        </label>

                        <textarea
                            rows="3"
                            className="form-control"
                            value={companyAddress}
                            onChange={(e)=>setCompanyAddress(e.target.value)}
                        />

                    </div>

                </div>

                <button
                    className="btn partner-btn"
                    onClick={submitApplication}
                >

                    Submit Application

                </button>

            </div>

        </div>

    );

}

export default PartnerApplication;