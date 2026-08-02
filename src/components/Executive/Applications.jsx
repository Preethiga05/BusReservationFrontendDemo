import "./ExecutiveCss/Application.css";
import { useState } from "react";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

function Applications() {
    const [selectedApplication, setSelectedApplication] = useState(null);

    const applications = [

        {
            id: 1,
            companyName: "ABC Travels",
            ownerName: "Ramesh",
            phoneNumber: "9876543210",
            status: "Pending"
        },

        {
            id: 2,
            companyName: "KPN Travels",
            ownerName: "Suresh",
            phoneNumber: "9876543211",
            status: "Pending"
        },

        {
            id: 3,
            companyName: "GreenLine",
            ownerName: "Arun",
            phoneNumber: "9876543212",
            status: "Pending"
        }

    ];

    return (

        <div className="applications-page">

            <div className="page-header">

                <div>

                    <h2>Bus Operator Applications</h2>

                    <p>
                        Review and approve new bus operator registrations.
                    </p>

                </div>

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

                            applications.map((application, index) => (

                                <tr key={application.id}>

                                    <td>{index + 1}</td>

                                    <td>{application.companyName}</td>

                                    <td>{application.ownerName}</td>

                                    <td>{application.phoneNumber}</td>

                                    <td>

                                        <span className="status-badge">

                                            {application.status}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => setSelectedApplication(application)}
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
                />

            </div>

        </div>

    );

}

export default Applications;