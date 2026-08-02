import "./AuthCss/Login.css";

function Login({ close, openRegister }) {

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

                            Username / Email

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username or email"
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
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