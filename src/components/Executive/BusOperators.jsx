import BusOperatorDetailsModal from "./BusOperatorDetailsModal";
import { useEffect, useState } from "react";
import BusOperatorService from "../../services/BusOperatorService";

function BusOperators() {

    const [selectedOperator, setSelectedOperator] = useState(null);

    const [operators, setOperators] = useState([]);

    const [filteredOperators, setFilteredOperators] = useState([]);

    const [search, setSearch] = useState("");


    useEffect(() => {

        getAllBusOperators();

    }, []);


    const getAllBusOperators = async () => {

        try {

            const response =
                await BusOperatorService.getAllBusOperators();

            setOperators(response.data);

            setFilteredOperators(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };


    useEffect(() => {

        const filtered = operators.filter(operator =>

            operator.companyName
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            operator.busOperatorName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredOperators(filtered);

    }, [search, operators]);


    console.log(filteredOperators);


    return (

        <div className="p-4">

            {/* Page Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-dark mb-1">

                        Bus Operators

                    </h2>

                    <p className="text-secondary mb-0">

                        Manage approved bus operators registered with FastX.

                    </p>

                </div>


                <input
                    type="text"
                    className="form-control"
                    style={{ width: "280px" }}
                    placeholder="Search Company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* Table Card */}

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

                            filteredOperators.map((operator, index) => (

                                <tr key={operator.busOperatorId}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {operator.companyName}
                                    </td>

                                    <td>
                                        {operator.busOperatorName}
                                    </td>

                                    <td>
                                        {operator.phoneNumber}
                                    </td>

                                    <td>

                                        {

                                            operator.status === "ACTIVE"

                                                ?

                                                <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">

                                                    Active

                                                </span>

                                                :

                                                <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill px-3 py-2">

                                                    Inactive

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={async () => {

                                                try {

                                                    const response =
                                                        await BusOperatorService
                                                            .getBusOperatorById(
                                                                operator.busOperatorId
                                                            );

                                                    setSelectedOperator(
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

            </div>


            <BusOperatorDetailsModal

                operator={selectedOperator}

                close={() => setSelectedOperator(null)}

                refreshBusOperators={getAllBusOperators}

            />

        </div>

    );

}

export default BusOperators;