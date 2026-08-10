import { useEffect, useState } from "react";
import ExecutiveService from "../../services/ExecutiveService";
import AddExecutiveModal from "./AddExecutiveModal";

function Executives() {

    const [executives, setExecutives] =
        useState([]);

    const [showAddModal, setShowAddModal] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ============================================
    // LOAD EXECUTIVES
    // ============================================

    useEffect(() => {

        loadExecutives();

    }, []);


    async function loadExecutives() {

        try {

            setLoading(true);

            setError("");


            const response =
                await ExecutiveService.getAllExecutives();


            console.log(
                "Executives:",
                response.data
            );


            setExecutives(
                response.data
            );

        }
        catch (error) {

            console.error(
                "Failed to load executives:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load executives."
            );

        }
        finally {

            setLoading(false);

        }

    }


    // ============================================
    // SEARCH
    // ============================================

    const searchValue =
        search
            .toLowerCase()
            .trim();


    const filteredExecutives =
        executives.filter(
            (executive) =>

                executive.name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                executive.employeeCode
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                executive.jobTitle
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                executive.phoneNumber
                    ?.includes(searchValue)

        );


    return (

        <div className="container-fluid py-4 px-4">


            {/* =========================================
                HEADER
            ========================================== */}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>

                    <h2 className="fw-bold text-primary mb-1">

                        Executives

                    </h2>

                    <p className="text-muted mb-0">

                        Manage FastX executive accounts.

                    </p>

                </div>


                <div className="d-flex gap-2">


                    {/* SEARCH */}

                    <input
                        type="text"
                        className="form-control"
                        style={{
                            width: "260px"
                        }}
                        placeholder="Search Executive..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />


                    {/* ADD */}

                    <button
                        className="btn btn-primary text-nowrap"
                        onClick={() =>
                            setShowAddModal(true)
                        }
                    >

                        <i className="bi bi-person-plus me-2"></i>

                        Add Executive

                    </button>

                </div>

            </div>


            {/* =========================================
                ERROR
            ========================================== */}

            {error && (

                <div className="alert alert-danger">

                    <i className="bi bi-exclamation-triangle me-2"></i>

                    {error}

                </div>

            )}


            {/* =========================================
                TABLE
            ========================================== */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-3 p-md-4">


                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                            <p className="text-muted mt-3 mb-0">

                                Loading executives...

                            </p>

                        </div>

                    ) : filteredExecutives.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-person-badge text-muted"
                                style={{
                                    fontSize: "3rem"
                                }}
                            ></i>

                            <h5 className="mt-3">

                                No executives found

                            </h5>

                            <p className="text-muted">

                                {search
                                    ? "No executives match your search."
                                    : "No executives have been added yet."
                                }

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th>#</th>

                                        <th>Employee Code</th>

                                        <th>Name</th>

                                        <th>Job Title</th>

                                        <th>Phone</th>

                                        <th>Gender</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredExecutives.map(
                                        (executive, index) => (

                                            <tr
                                                key={
                                                    executive.executiveId
                                                }
                                            >

                                                <td>

                                                    {index + 1}

                                                </td>


                                                <td className="fw-semibold">

                                                    {
                                                        executive.employeeCode
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        executive.name
                                                    }

                                                </td>


                                                <td>

                                                    <span className="badge bg-primary-subtle text-primary">

                                                        {
                                                            executive.jobTitle
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        executive.phoneNumber
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        executive.gender
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* =========================================
                ADD EXECUTIVE MODAL
            ========================================== */}

            <AddExecutiveModal

                show={showAddModal}

                close={() =>
                    setShowAddModal(false)
                }

                onExecutiveAdded={
                    loadExecutives
                }

            />

        </div>

    );

}

export default Executives;