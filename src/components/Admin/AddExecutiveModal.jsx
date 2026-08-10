import { useState } from "react";
import ExecutiveService from "../../services/ExecutiveService";

function AddExecutiveModal({
    show,
    close,
    onExecutiveAdded
}) {

    const [formData, setFormData] = useState({

        username: "",
        password: "",
        email: "",
        name: "",
        employeeCode: "",
        jobTitle: "",
        phoneNumber: "",
        gender: ""

    });


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // ============================================
    // HANDLE INPUT
    // ============================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };


    // ============================================
    // RESET FORM
    // ============================================

    const resetForm = () => {

        setFormData({

            username: "",
            password: "",
            email: "",
            name: "",
            employeeCode: "",
            jobTitle: "",
            phoneNumber: "",
            gender: ""

        });

        setError("");

        setSuccess("");

    };


    // ============================================
    // CLOSE
    // ============================================

    const handleClose = () => {

        if (loading) {
            return;
        }

        resetForm();

        close();

    };


    // ============================================
    // SUBMIT
    // ============================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        // ----------------------------------------
        // BASIC VALIDATION
        // ----------------------------------------

        if (
            !formData.username ||
            !formData.password ||
            !formData.email ||
            !formData.name ||
            !formData.employeeCode ||
            !formData.jobTitle ||
            !formData.phoneNumber ||
            !formData.gender
        ) {

            setError(
                "Please fill in all required fields."
            );

            return;

        }


        try {

            setLoading(true);


            const response =
                await ExecutiveService.addExecutive(
                    formData
                );


            console.log(
                "Executive added:",
                response.data
            );


            setSuccess(
                "Executive added successfully."
            );


            if (onExecutiveAdded) {

                await onExecutiveAdded();

            }


            setTimeout(() => {

                resetForm();

                close();

            }, 1000);

        }
        catch (error) {

            console.error(
                "Failed to add executive:",
                error
            );


            console.error(
                "Response:",
                error.response?.data
            );


            setError(

                error.response?.data?.message ||

                "Unable to add executive. Please try again."

            );

        }
        finally {

            setLoading(false);

        }

    };


    if (!show) {

        return null;

    }


    return (

        <>

            {/* BACKDROP */}

            <div
                className="modal-backdrop fade show"
            ></div>


            {/* MODAL */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
            >

                <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                >

                    <div className="modal-content border-0 shadow">


                        {/* ==========================================
                            HEADER
                        =========================================== */}

                        <div className="modal-header">

                            <div>

                                <h5 className="modal-title fw-bold">

                                    <i className="bi bi-person-plus-fill text-primary me-2"></i>

                                    Add Executive

                                </h5>

                                <small className="text-muted">

                                    Create a new FastX executive account.

                                </small>

                            </div>


                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                                disabled={loading}
                            >
                            </button>

                        </div>


                        {/* ==========================================
                            FORM
                        =========================================== */}

                        <form onSubmit={handleSubmit}>

                            <div className="modal-body">


                                {/* ERROR */}

                                {error && (

                                    <div className="alert alert-danger">

                                        <i className="bi bi-exclamation-triangle me-2"></i>

                                        {error}

                                    </div>

                                )}


                                {/* SUCCESS */}

                                {success && (

                                    <div className="alert alert-success">

                                        <i className="bi bi-check-circle me-2"></i>

                                        {success}

                                    </div>

                                )}


                                {/* ==================================
                                    LOGIN INFORMATION
                                =================================== */}

                                <h6 className="fw-bold text-primary mb-3">

                                    Login Information

                                </h6>


                                <div className="row g-3 mb-4">


                                    {/* USERNAME */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Username
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            value={
                                                formData.username
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter username"
                                            required
                                        />

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Password
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={
                                                formData.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter password"
                                            required
                                        />

                                    </div>


                                    {/* EMAIL */}

                                    <div className="col-md-12">

                                        <label className="form-label">

                                            Email
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={
                                                formData.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter email address"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* ==================================
                                    EXECUTIVE INFORMATION
                                =================================== */}

                                <h6 className="fw-bold text-primary mb-3">

                                    Executive Information

                                </h6>


                                <div className="row g-3">


                                    {/* NAME */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Full Name
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={
                                                formData.name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter full name"
                                            required
                                        />

                                    </div>


                                    {/* EMPLOYEE CODE */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Employee Code
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="text"
                                            name="employeeCode"
                                            className="form-control"
                                            value={
                                                formData.employeeCode
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter employee code"
                                            required
                                        />

                                    </div>


                                    {/* JOB TITLE */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Job Title
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <select
                                            name="jobTitle"
                                            className="form-select"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">
                                                Select job title
                                            </option>

                                            <option value="OPERATIONS_MANAGER">
                                                Operations Manager
                                            </option>
                                        </select>

                                    </div>


                                    {/* PHONE */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Phone Number
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            className="form-control"
                                            value={
                                                formData.phoneNumber
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter phone number"
                                            maxLength="10"
                                            required
                                        />

                                    </div>


                                    {/* GENDER */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Gender
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>

                                        <select
                                            name="gender"
                                            className="form-select"
                                            value={
                                                formData.gender
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        >

                                            <option value="">
                                                Select gender
                                            </option>

                                            <option value="MALE">
                                                Male
                                            </option>

                                            <option value="FEMALE">
                                                Female
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>


                            {/* ==========================================
                                FOOTER
                            =========================================== */}

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleClose}
                                    disabled={loading}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Adding...

                                        </>

                                    ) : (

                                        <>

                                            <i className="bi bi-person-plus me-2"></i>

                                            Add Executive

                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddExecutiveModal;