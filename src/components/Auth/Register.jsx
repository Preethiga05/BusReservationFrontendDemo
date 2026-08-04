import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PassengerService from "../../services/PassengerService";
import "./AuthCss/Register.css";
import { useEffect } from "react";
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
    useEffect(() => {

        if (localStorage.getItem("token")) {

            navigate("/");

        }

    }, []);

    const register = async () => {

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }
        if (
            !name ||
            !username ||
            !password ||
            !confirmPassword ||
            !phoneNumber ||
            !emergencyContact ||
            !dob ||
            !gender ||
            !address
        ) {

            alert("Please fill all the fields.");

            return;

        }

        const passenger = {

            username,

            password,

            name,

            phoneNumber,

            emergencyContact,

            Dob: dob,

            gender,

            address

        };
        try {

            setLoading(true);

            await PassengerService.registerPassenger(passenger);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            if (err.response) {

                alert(err.response.data);

            }

            else {

                alert("Something went wrong.");

            }

        }

        finally {

            setLoading(false);

        }


    };

    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h2>

                        Create Passenger Account

                    </h2>

                    <p>

                        Join FastX and book your next journey with ease.

                    </p>

                </div>

                <div className="row">

                    {/* Name */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Full Name

                        </label>

                        <input

                            type="text"

                            className="form-control" placeholder="Enter FullName"

                            value={name}

                            onChange={(e) => setName(e.target.value)}

                        />

                    </div>

                    {/* Username */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label" >

                            Username

                        </label>

                        <input

                            type="text"

                            className="form-control" placeholder="Enter Username"

                            value={username}

                            onChange={(e) => setUsername(e.target.value)}

                        />

                    </div>

                    {/* Password */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label" >

                            Password

                        </label>

                        <input

                            type="password"

                            className="form-control" placeholder="Enter password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                        />

                    </div>

                    {/* Confirm Password */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Confirm Password

                        </label>

                        <input

                            type="password"

                            className="form-control" placeholder="Confirm password"

                            value={confirmPassword}

                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />

                    </div>

                    {/* Phone */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label" >

                            Phone Number

                        </label>

                        <input

                            type="text"

                            className="form-control" maxLength={10} minLength={10} placeholder="Enter Phone Number"

                            value={phoneNumber}

                            onChange={(e) => setPhoneNumber(e.target.value)}

                        />

                    </div>

                    {/* Emergency Contact */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label" >

                            Emergency Contact

                        </label>

                        <input

                            type="text"

                            className="form-control" maxLength={10} minLength={10} placeholder="Enter Emergency Contact"

                            value={emergencyContact}

                            onChange={(e) => setEmergencyContact(e.target.value)}

                        />

                    </div>

                    {/* DOB */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Date Of Birth

                        </label>

                        <input

                            type="date"

                            className="form-control"

                            max={new Date().toISOString().split("T")[0]}

                            value={dob}

                            onChange={(e) => setDob(e.target.value)}

                        />

                    </div>

                    {/* Gender */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Gender

                        </label>

                        <select

                            className="form-select"

                            value={gender}

                            onChange={(e) => setGender(e.target.value)}

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

                    </div>

                    {/* Address */}

                    <div className="col-12 mb-4">

                        <label className="form-label" >

                            Address

                        </label>

                        <textarea

                            rows="3"

                            className="form-control" placeholder="Enter your address"

                            value={address}

                            onChange={(e) => setAddress(e.target.value)}

                        />

                    </div>

                </div>

                <button

                    className="btn register-btn"

                    onClick={register}

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Creating Account..."

                            :

                            "Create Account"

                    }

                </button>

                <div className="text-center mt-4">

                    Already have an account?

                    <button

                        className="login-link-btn"

                        onClick={() => navigate("/login")}

                    >

                        Login

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Register;