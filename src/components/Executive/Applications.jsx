import "./ExecutiveCss/Application.css";
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

        <div className="applications-page">

            <div className="page-header">

                <div>

                    <h2>Bus Operator Applications</h2>

                    <p>
                        Review and approve new bus operator registrations.
                    </p>

                </div>
                <input
                    type="text"
                    className="form-control search-box"
                    placeholder="Search Application..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="applications-card">

                <table className="table table-hover align-middle">

                    <thead>

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

                                    <td>{index + 1}</td>

                                    <td>{application.companyName}</td>

                                    <td>{application.ownerName}</td>

                                    <td>{application.phoneNumber}</td>

                                    <td>

                                        <span
                                            className={
                                                application.applicationStatus === "APPROVED"
                                                    ? "approved-status"
                                                    : application.applicationStatus === "REJECTED"
                                                        ? "rejected-status"
                                                        : "pending-status"
                                            }
                                        >

                                            {application.applicationStatus}

                                        </span>

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

                                                    setSelectedApplication(response.data);

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
                    close={() => setSelectedApplication(null)}
                    refreshApplications={getAllApplications}
                />

            </div>

        </div>

    );

}

export default Applications;