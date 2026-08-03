import "./AuthCss/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { saveLoginDetails } from "../../utils/Auth";

function Login({ close, openRegister }) {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const login = async () => {

        try {

            const response = await AuthService.login(

                username,

                password

            );

            console.log(response.data);

            saveLoginDetails(response, username);

            close();

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

            alert("Invalid Username or Password");

        }

    };

    return (

        <div className="login-overlay">

            <div className="login-container">

                <button
                    className="close-btn"
                    onClick={close}
                >
                    <i className="bi bi-x-lg"></i>
                </button>

                <div className="login-header">

                    <div className="login-icon">

                        <i className="bi bi-bus-front-fill"></i>

                    </div>

                    <h2>Welcome Back!</h2>

                    <p>
                        Continue your journey with <strong>FastX</strong>
                    </p>

                </div>

                <form>

                    <div className="mb-3">

                        <label className="form-label">

                            Username

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <div className="forgot-password">

                        <a href="#">

                            Forgot Password?

                        </a>

                    </div>

                    <button
                        type="button"
                        className="btn login-btn"
                        onClick={login}
                    >

                        Login

                    </button>

                </form>

                <div className="divider">

                    <span>OR</span>

                </div>

                <div className="register-text">

                    Don't have an account?

                    <span onClick={openRegister}>

                        Register

                    </span>

                </div>

            </div>

        </div>

    );

}

export default Login;