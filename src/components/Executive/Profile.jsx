import "./ExecutiveCss/Profile.css";

function ExecutiveProfile() {

    const executive = {

        name: "Preethiga R",

        employeeCode: "EXE001",

        jobTitle: "MANAGER",

        phoneNumber: "9876543210",

        gender: "FEMALE",

        status: "ACTIVE"

    };

    return (

        <div className="profile-page">

            <div className="page-header">

                <div>

                    <h2>

                        My Profile

                    </h2>

                    <p>

                        View your personal information.

                    </p>

                </div>

            </div>

            <div className="profile-card">

                <div className="profile-avatar">

                    <i className="bi bi-person-circle"></i>

                </div>

                <div className="profile-details">

                    <div className="profile-item">

                        <label>

                            Full Name

                        </label>

                        <span>

                            {executive.name}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Employee Code

                        </label>

                        <span>

                            {executive.employeeCode}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Job Title

                        </label>

                        <span>

                            {executive.jobTitle}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Phone Number

                        </label>

                        <span>

                            {executive.phoneNumber}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Gender

                        </label>

                        <span>

                            {executive.gender}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Status

                        </label>

                        <span>

                            {

                                executive.status === "ACTIVE"

                                ?

                                <span className="badge bg-success">

                                    Active

                                </span>

                                :

                                <span className="badge bg-danger">

                                    Inactive

                                </span>

                            }

                        </span>

                    </div>

                </div>

                <div className="profile-footer">

                    <button

                        className="btn btn-primary"

                    >

                        <i className="bi bi-pencil-square"></i>

                        {" "}Edit Profile

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ExecutiveProfile;