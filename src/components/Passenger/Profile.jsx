import { useEffect, useState } from "react";
import PassengerService from "../../services/PassengerService";
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

        <div className="container-fluid">

            <div className="card border-0 rounded-4 shadow-sm p-4">


                {/* Profile Header */}

                <div className="d-flex align-items-center gap-4 mb-3 flex-column flex-md-row text-center text-md-start">

                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow"
                        style={{
                            width: "110px",
                            height: "110px",
                            fontSize: "48px",
                            flexShrink: 0
                        }}
                    >

                        <i className="bi bi-person-fill"></i>

                    </div>


                    <div>

                        <h2 className="text-primary fw-bold mb-1">

                            {passenger.name}

                        </h2>

                        <p className="text-secondary mb-2">

                            Passenger ID : P-FastX{passenger.passengerId}

                        </p>

                        <span className="badge bg-success">

                            {passenger.status}

                        </span>

                    </div>

                </div>


                <hr className="my-4" />


                {/* Personal Information */}

                <h5 className="text-primary fw-bold mb-3">

                    Personal Information

                </h5>


                <div className="row g-3">


                    {/* Full Name */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Full Name

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.name}

                            </span>

                        </div>

                    </div>


                    {/* Username */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Username

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.username}

                            </span>

                        </div>

                    </div>


                    {/* Phone Number */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Phone Number

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.phoneNumber}

                            </span>

                        </div>

                    </div>


                    {/* Gender */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Gender

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.gender}

                            </span>

                        </div>

                    </div>


                    {/* Date of Birth */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Date of Birth

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.dob}

                            </span>

                        </div>

                    </div>


                    {/* Address */}

                    <div className="col-md-6">

                        <div className="bg-light border rounded-3 p-3 h-100">

                            <label className="d-block text-secondary small fw-semibold mb-1">

                                Address

                            </label>

                            <span className="text-primary fw-semibold">

                                {passenger.address}

                            </span>

                        </div>

                    </div>

                </div>


                {/* Update Button */}

                <div className="text-end mt-4">

                    <button

                        className="btn btn-primary fw-semibold px-4 py-2"

                        onClick={() => setShowUpdate(true)}

                    >

                        <i className="bi bi-pencil-square me-2"></i>

                        Update Profile

                    </button>

                </div>


            </div>


            {/* Update Profile Modal */}

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