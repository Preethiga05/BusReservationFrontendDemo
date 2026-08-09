import "./AuthCss/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { saveLoginDetails } from "../../utils/Auth";

function Login({ close }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const validateForm = () => {

        let validationErrors = {};

        if (!username.trim()) {

            validationErrors.username = "Username is required.";

        }

        if (!password) {

            validationErrors.password = "Password is required.";

        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const login = async () => {

        if (!validateForm()) {

            return;

        }

        try {

            setLoading(true);

            const response = await AuthService.login(

                username,

                password

            );

            saveLoginDetails(response, username);
            /*
------------------------------------------
Check if user came from Seat Booking
------------------------------------------
*/

            const pendingBooking = sessionStorage.getItem("pendingBooking");

            if (pendingBooking && response.data.role === "PASSENGER") {

                const booking = JSON.parse(pendingBooking);

                sessionStorage.removeItem("pendingBooking");

                close?.();

                navigate("/passenger-details", {

                    state: booking

                });

                return;

            }

            close?.();

            switch (response.data.role) {

                case "ADMIN":

                    navigate("/admin-dashboard");

                    break;

                case "EXECUTIVE":

                    navigate("/executive-dashboard");

                    break;

                case "BUS_OPERATOR":

                    navigate("/bus-operator-dashboard");

                    break;

                case "PASSENGER":

                    navigate("/");

                    break;

                default:

                    navigate("/");

            }

        }

        catch (err) {

            console.log(err);

            setErrors({

                login: "Invalid Username or Password."

            });

        }

        finally {

            setLoading(false);

        }

    };

   return (
    <>
        <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-modal="true"
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg border-0 rounded-4">

                    <div className="modal-header border-0 pb-0">

                        <div className="w-100 text-center">

                            <div className="login-icon mx-auto mb-3">

                                <i className="bi bi-bus-front-fill fs-2 text-white"></i>

                            </div>

                            <h3 className="fw-bold mb-1">

                                Welcome Back!

                            </h3>

                            <p className="text-muted mb-0">

                                Continue your journey with

                                <span className="fw-bold text-primary">

                                    {" "}FastX

                                </span>

                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={() => close?.()}
                        ></button>

                    </div>

                    <div className="modal-body px-4 pb-4">

                        <form>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">

                                    Username

                                </label>

                                <input

                                    type="text"

                                    className={`form-control ${errors.username ? "is-invalid" : ""}`}

                                    placeholder="Enter Username"

                                    value={username}

                                    onChange={(e) => {

                                        setUsername(e.target.value);

                                        setErrors({

                                            ...errors,

                                            username: "",

                                            login: ""

                                        });

                                    }}

                                />

                                {

                                    errors.username &&

                                    <div className="invalid-feedback">

                                        {errors.username}

                                    </div>

                                }

                            </div>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">

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

                                            setErrors({

                                                ...errors,

                                                password: "",

                                                login: ""

                                            });

                                        }}

                                    />

                                    <button

                                        type="button"

                                        className="btn btn-outline-secondary"

                                        onClick={() =>

                                            setShowPassword(!showPassword)

                                        }

                                    >

                                        <i

                                            className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}

                                        ></i>

                                    </button>

                                </div>

                                {

                                    errors.password &&

                                    <div className="invalid-feedback d-block">

                                        {errors.password}

                                    </div>

                                }

                            </div>

                            {

                                errors.login &&

                                <div className="alert alert-danger">

                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>

                                    {errors.login}

                                </div>

                            }

                            <div className="text-end mb-3">

                                <a

                                    href="#"

                                    className="text-decoration-none"

                                >

                                    Forgot Password?

                                </a>

                            </div>

                            <button

                                type="button"

                                className="btn btn-primary w-100 py-2"

                                onClick={login}

                                disabled={loading}

                            >

                                {

                                    loading ?

                                        <>

                                            <span className="spinner-border spinner-border-sm me-2"></span>

                                            Logging In...

                                        </>

                                        :

                                        <>

                                            <i className="bi bi-box-arrow-in-right me-2"></i>

                                            Login

                                        </>

                                }

                            </button>

                        </form>

                        <div className="d-flex align-items-center my-4">

                            <hr className="flex-grow-1" />

                            <span className="mx-3 text-muted">

                                OR

                            </span>

                            <hr className="flex-grow-1" />

                        </div>

                        <div className="text-center">

                            <span className="text-muted">

                                Don't have an account?

                            </span>

                            <button

                                type="button"

                                className="btn btn-link text-decoration-none"

                                onClick={() => navigate("/register")}

                            >

                                Register

                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>

        <div className="modal-backdrop fade show"></div>
    </>
);
}
export default Login;