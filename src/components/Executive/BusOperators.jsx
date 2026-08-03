import "./ExecutiveCss/BusOperators.css";

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

        <div className="bus-operators-page">

            <div className="page-header">

                <div>

                    <h2>

                        Bus Operators

                    </h2>

                    <p>

                        Manage approved bus operators registered with FastX.

                    </p>

                </div>

                <input

                    type="text"

                    className="form-control search-box"

                    placeholder="Search Company..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

            </div>

            <div className="table-card">

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

                                                <span className="active-status">

                                                    Active

                                                </span>

                                                :

                                                <span className="inactive-status">

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

                                                    setSelectedOperator(response.data);

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