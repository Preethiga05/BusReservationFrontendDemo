import "./ExecutiveCss/BusOperators.css";
import { useState } from "react";
import BusOperatorDetailsModal from "./BusOperatorDetailsModal";

function BusOperators() {

    const [selectedOperator, setSelectedOperator] = useState(null);

    const operators = [

        {
    id:1,

    companyName:"KPN Travels",

    ownerName:"Suresh",

    email:"kpn@gmail.com",

    phoneNumber:"9876543210",

    licenceNumber:"TN20261234",

    companyAddress:"Anna Nagar, Chennai",

    executiveName:"Preethiga",

    status:"ACTIVE"

},
{
    id:2,

    companyName:"GreenLine",

    ownerName:"Arun",

    email:"greenline@gmail.com",

    phoneNumber:"9876543211",

    licenceNumber:"TN20262345",

    companyAddress:"Coimbatore",

    executiveName:"Preethiga",

    status:"ACTIVE"

},
{
    id:3,

    companyName:"ABC Travels",

    ownerName:"Ramesh",

    email:"abc@gmail.com",

    phoneNumber:"9876543212",

    licenceNumber:"TN20263456",

    companyAddress:"Madurai",

    executiveName:"Preethiga",

    status:"INACTIVE"

}

    ];

    return(

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

                            operators.map((operator,index)=>(

                                <tr key={operator.id}>

                                    <td>

                                        {index+1}

                                    </td>

                                    <td>

                                        {operator.companyName}

                                    </td>

                                    <td>

                                        {operator.ownerName}

                                    </td>

                                    <td>

                                        {operator.phoneNumber}

                                    </td>

                                    <td>

                                        {

                                            operator.status==="ACTIVE"

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

                                            onClick={()=>setSelectedOperator(operator)}

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

                close={()=>setSelectedOperator(null)}

            />

        </div>

    );

}

export default BusOperators;