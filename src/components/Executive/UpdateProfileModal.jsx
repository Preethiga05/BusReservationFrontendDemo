import { useEffect, useState } from "react";
import ExecutiveService from "../../services/ExecutiveService";

function UpdateProfileModal({
    executive,
    close,
    onProfileUpdated
}) {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [name, setName] =
        useState("");

    const [jobTitle, setJobTitle] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [gender, setGender] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    useEffect(() => {

        if (executive) {

            setUsername(
                executive.username || ""
            );

            setEmail(
                executive.email || ""
            );

            setName(
                executive.name || ""
            );

            setJobTitle(
                executive.jobTitle || ""
            );

            setPhoneNumber(
                executive.phoneNumber || ""
            );

            setGender(
                executive.gender || ""
            );

            setPassword("");

        }

    }, [executive]);


    const updateProfile = async () => {

        try {

            setLoading(true);

            const profileData = {

                username: username,

                password: password,

                email: email,

                name: name,

                jobTitle: jobTitle,

                phoneNumber: phoneNumber,

                gender: gender

            };


            console.log(
                "Updating Executive Profile:",
                profileData
            );


            const response =
                await ExecutiveService.updateProfile(
                    profileData
                );


            console.log(
                "Executive Profile Updated:",
                response.data
            );


            await onProfileUpdated();

            close();

        }
        catch (error) {

            console.error(
                "Failed to update executive profile:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div
                className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            >

                <div className="modal-content">


                    <div className="modal-header">

                        <div>

                            <h5 className="modal-title fw-bold">

                                Update Profile

                            </h5>

                            <p className="text-muted mb-0">

                                Update your account details.

                            </p>

                        </div>


                        <button
                            type="button"
                            className="btn-close"
                            onClick={close}
                        ></button>

                    </div>


                    <div className="modal-body">

                        <div className="row g-3">


                            {/* Username */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

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


                            {/* Password */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

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


                            {/* Email */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Email

                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* Name */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* Employee Code */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Employee Code

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        executive.employeeCode
                                    }
                                    disabled
                                />

                                <small className="text-muted">

                                    Employee code cannot be changed.

                                </small>

                            </div>



                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={executive.jobTitle || ""}
                                    disabled
                                />

                                <small className="text-muted">
                                    Job title cannot be changed.
                                </small>

                            </div>


                            {/* Phone */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

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

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

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

                                </select>

                            </div>

                        </div>

                    </div>


                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={close}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={updateProfile}
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Updating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Update Profile

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UpdateProfileModal;