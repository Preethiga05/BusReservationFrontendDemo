import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

{/*import "./AuthCss/Register.css";*/}

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [emergencyContact, setEmergencyContact] = useState("");

    const [dob, setDob] = useState("");

    const [gender, setGender] = useState("");

    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (localStorage.getItem("token")) {

            navigate("/");

        }

    }, [navigate]);

    const validateForm = () => {

        let validationErrors = {};

        if (!name.trim()) {

            validationErrors.name = "Full Name is required.";

        }

        if (!username.trim()) {

            validationErrors.username = "Username is required.";

        }

        if (!password) {

            validationErrors.password = "Password is required.";

        }

        if (!confirmPassword) {

            validationErrors.confirmPassword = "Confirm Password is required.";

        }

        if (password && confirmPassword && password !== confirmPassword) {

            validationErrors.confirmPassword = "Passwords do not match.";

        }

        if (!phoneNumber) {

            validationErrors.phoneNumber = "Phone Number is required.";

        }

        else if (phoneNumber.length !== 10) {

            validationErrors.phoneNumber = "Phone Number must contain exactly 10 digits.";

        }

        if (!emergencyContact) {

            validationErrors.emergencyContact = "Emergency Contact is required.";

        }

        else if (emergencyContact.length !== 10) {

            validationErrors.emergencyContact = "Emergency Contact must contain exactly 10 digits.";

        }

        if (!dob) {

            validationErrors.dob = "Date of Birth is required.";

        }

        if (!gender) {

            validationErrors.gender = "Please select a gender.";

        }

        if (!address.trim()) {

            validationErrors.address = "Address is required.";

        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const register = async () => {

        if (!validateForm()) {

            return;

        }

        const passenger = {

            username,

            password,

            name,

            phoneNumber,

            emergencyContact,

            dob,

            gender,

            address

        };

        try {

            setLoading(true);

            await PassengerService.registerPassenger(passenger);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            const message = error.response?.data?.message;

            if (message === "Phone number already registered") {

                setErrors(prev => ({
                    ...prev,
                    phoneNumber: message
                }));

            }
            else if (message === "Username already exists") {

                setErrors(prev => ({
                    ...prev,
                    username: message
                }));

            }
            else {

                alert(message || "Registration Failed");

            }

        }

        finally {

            setLoading(false);

        }

    };
   return (

    <div className="container py-5">

        <div className="row justify-content-center">

            <div className="col-lg-10">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-primary text-white text-center py-4">

                        <i className="bi bi-person-plus-fill fs-1"></i>

                        <h2 className="fw-bold mt-2">
                            Create Passenger Account
                        </h2>

                        <p className="mb-0">
                            Join FastX and book your next journey with ease.
                        </p>

                    </div>

                    <div className="card-body p-5">

                        <div className="row">

                            {/* Full Name */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className={`form-control shadow-sm ${errors.name ? "is-invalid" : ""}`}
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrors({ ...errors, name: "" });
                                    }}
                                />

                                {errors.name &&
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                }

                            </div>

                            {/* Username */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className={`form-control shadow-sm ${errors.username ? "is-invalid" : ""}`}
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setErrors(prev => ({
                                            ...prev,
                                            username: ""
                                        }));
                                    }}
                                />

                                {errors.username &&
                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>
                                }

                            </div>

                            {/* Password */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors({ ...errors, password: "" });
                                        }}
                                    />

                                    <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                    </button>

                                </div>

                                {errors.password &&
                                    <div className="invalid-feedback d-block">
                                        {errors.password}
                                    </div>
                                }

                            </div>

                            {/* Confirm Password */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Confirm Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setErrors({ ...errors, confirmPassword: "" });
                                        }}
                                    />

                                    <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                    </button>

                                </div>

                                {errors.confirmPassword &&
                                    <div className="invalid-feedback d-block">
                                        {errors.confirmPassword}
                                    </div>
                                }

                            </div>

                            {/* Phone Number */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    maxLength={10}
                                    className={`form-control shadow-sm ${errors.phoneNumber ? "is-invalid" : ""}`}
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setPhoneNumber(value);
                                        setErrors(prev => ({
                                            ...prev,
                                            phoneNumber: ""
                                        }));
                                    }}
                                />

                                {errors.phoneNumber &&
                                    <div className="invalid-feedback">
                                        {errors.phoneNumber}
                                    </div>
                                }

                            </div>

                            {/* Emergency Contact */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Emergency Contact
                                </label>

                                <input
                                    type="text"
                                    maxLength={10}
                                    className={`form-control shadow-sm ${errors.emergencyContact ? "is-invalid" : ""}`}
                                    placeholder="Enter Emergency Contact"
                                    value={emergencyContact}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setEmergencyContact(value);
                                        setErrors({ ...errors, emergencyContact: "" });
                                    }}
                                />

                                {errors.emergencyContact &&
                                    <div className="invalid-feedback">
                                        {errors.emergencyContact}
                                    </div>
                                }

                            </div>

                            {/* DOB */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Date Of Birth
                                </label>

                                <input
                                    type="date"
                                    max={new Date().toISOString().split("T")[0]}
                                    className={`form-control shadow-sm ${errors.dob ? "is-invalid" : ""}`}
                                    value={dob}
                                    onChange={(e) => {
                                        setDob(e.target.value);
                                        setErrors({ ...errors, dob: "" });
                                    }}
                                />

                                {errors.dob &&
                                    <div className="invalid-feedback">
                                        {errors.dob}
                                    </div>
                                }

                            </div>

                            {/* Gender */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Gender
                                </label>

                                <select
                                    className={`form-select shadow-sm ${errors.gender ? "is-invalid" : ""}`}
                                    value={gender}
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                        setErrors({ ...errors, gender: "" });
                                    }}
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

                                </select>

                                {errors.gender &&
                                    <div className="invalid-feedback">
                                        {errors.gender}
                                    </div>
                                }

                            </div>

                            {/* Address */}

                            <div className="col-12 mb-4">

                                <label className="form-label fw-semibold text-primary">
                                    Address
                                </label>

                                <textarea
                                    rows="4"
                                    className={`form-control shadow-sm ${errors.address ? "is-invalid" : ""}`}
                                    placeholder="Enter your Address"
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        setErrors({ ...errors, address: "" });
                                    }}
                                />

                                {errors.address &&
                                    <div className="invalid-feedback">
                                        {errors.address}
                                    </div>
                                }

                            </div>

                        </div>

                        <div className="d-grid">

                            <button
                                className="btn btn-primary btn-lg"
                                onClick={register}
                                disabled={loading}
                            >

                                {loading ?

                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Account...
                                    </>

                                    :

                                    <>
                                        <i className="bi bi-person-plus-fill me-2"></i>
                                        Create Account
                                    </>
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);
}

export default Register;