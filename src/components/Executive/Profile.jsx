import "./ExecutiveCss/Profile.css";
import { useEffect, useState } from "react";
import ExecutiveService from "../../services/ExecutiveService";

function ExecutiveProfile() {

    const [executive, setExecutive] = useState(null);

    useEffect(() => {

        getExecutiveProfile();

    }, []);

    const getExecutiveProfile = async () => {

        try {

            const response = await ExecutiveService.getProfile();

            console.log(response.data);

            setExecutive(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!executive) {

        return (

            <div className="text-center mt-5">

                <h5>Loading Profile...</h5>

            </div>

        );

    }

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