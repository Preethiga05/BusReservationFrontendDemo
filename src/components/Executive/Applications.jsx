import ApplicationDetailsModal from "./ApplicationDetailsModal";
import { useEffect, useState } from "react";
import BusOperatorApplicationService from "../../services/BusOperatorApplicationService";

function Applications() {

    const [selectedApplication, setSelectedApplication] = useState(null);

    const [applications, setApplications] = useState([]);

    const [filteredApplications, setFilteredApplications] = useState([]);

    const [search, setSearch] = useState("");


    useEffect(() => {

        getAllApplications();

    }, []);


    const getAllApplications = async () => {

        try {

            const response =
                await BusOperatorApplicationService
                    .getAllApplications();

            setApplications(response.data);

            setFilteredApplications(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };


    useEffect(() => {

        const filtered = applications.filter(application =>

            application.companyName
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            application.ownerName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredApplications(filtered);

    }, [search, applications]);


    return (

        <div className="p-4">

            {/* Page Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-dark mb-1">
                        Bus Operator Applications
                    </h2>

                    <p className="text-secondary mb-0">
                        Review and approve new bus operator registrations.
                    </p>

                </div>


                <input
                    type="text"
                    className="form-control"
                    style={{ width: "260px" }}
                    placeholder="Search Application..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* Applications Table */}

            <div className="bg-white rounded-4 shadow-sm p-4">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>

                            <th>#</th>

                            <th>Company</th>

                            <th>Owner</th>

                            <th>Phone</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {

                            filteredApplications.map((application, index) => (

                                <tr key={application.applicationId}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {application.companyName}
                                    </td>

                                    <td>
                                        {application.ownerName}
                                    </td>

                                    <td>
                                        {application.phoneNumber}
                                    </td>

                                    <td>

                                        {

                                            application.applicationStatus === "APPROVED"

                                                ?

                                                <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">

                                                    {application.applicationStatus}

                                                </span>

                                                :

                                            application.applicationStatus === "REJECTED"

                                                ?

                                                <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill px-3 py-2">

                                                    {application.applicationStatus}

                                                </span>

                                                :

                                                <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2">

                                                    {application.applicationStatus}

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={async () => {

                                                try {

                                                    const response =
                                                        await BusOperatorApplicationService
                                                            .getApplicationById(
                                                                application.applicationId
                                                            );

                                                    setSelectedApplication(
                                                        response.data
                                                    );

                                                }

                                                catch (err) {

                                                    console.log(err);

                                                }

                                            }}
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>


                <ApplicationDetailsModal

                    application={selectedApplication}

                    close={() =>
                        setSelectedApplication(null)
                    }

                    refreshApplications={getAllApplications}

                />

            </div>

        </div>

    );
}

export default Applications;