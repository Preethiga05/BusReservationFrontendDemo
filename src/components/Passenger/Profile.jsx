import { useEffect, useState } from "react";
import PassengerService from "../../services/PassengerService";
import "./PassengerCss/Profile.css";
import UpdateProfileModal from "./UpdateProfileModal";


function Profile() {

    const [showUpdate, setShowUpdate] = useState(false);

    const [passenger, setPassenger] = useState(null);
    

useEffect(() => {

     loadPassengerProfile();

}, []);
async function loadPassengerProfile() {

    try {

        const response =
            await PassengerService.getPassengerProfile();

        setPassenger(response.data);

    }

    catch (error) {

        console.log(error);

    }

}
if (!passenger) {

    return (

        <div className="text-center mt-5">

            <div className="spinner-border text-primary"></div>

        </div>

    );

}


    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">

                        <i className="bi bi-person-fill"></i>

                    </div>

                    <div>

                        <h2>

                            {passenger.name}

                        </h2>

                        <p>

                            Passenger ID : P-FastX{passenger.passengerId}

                        </p>

                        <span className="badge bg-success">

                            {passenger.status}

                        </span>

                    </div>

                </div>

                <hr />

                <h5 className="section-title">

                    Personal Information

                </h5>

                <div className="profile-grid">

                    <div className="profile-item">

                        <label>

                            Full Name

                        </label>

                        <span>

                            {passenger.name}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Username

                        </label>

                        <span>

                            {passenger.username}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Phone Number

                        </label>

                        <span>

                            {passenger.phoneNumber}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Gender

                        </label>

                        <span>

                            {passenger.gender}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Date of Birth

                        </label>

                        <span>

                            {passenger.dob}

                        </span>

                    </div>

                    <div className="profile-item">

                        <label>

                            Address

                        </label>

                        <span>

                            {passenger.address}

                        </span>

                    </div>

                </div>


                <div className="text-end mt-4">

                    <button

                        className="btn btn-primary"

                        onClick={() => setShowUpdate(true)}

                    >

                        <i className="bi bi-pencil-square me-2"></i>

                        Update Profile

                    </button>

                </div>

            </div>

            {

                showUpdate &&

                <UpdateProfileModal

                    close={() => setShowUpdate(false)}

                    passenger={passenger}

                />

            }

        </div>

    );

}

export default Profile;