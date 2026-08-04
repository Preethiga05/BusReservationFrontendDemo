import "./BusOperatorCss/BusSchedules.css";
import { useEffect, useState } from "react";
import ScheduleDetailsModal from "./ScheduleDetailsModal";
import AddScheduleModal from "./AddScheduleModal";
import UpdateScheduleModal from "./UpdateScheduleModal";
import ConfirmationModal from "../RusableComponents/ConfirmationModal";

function BusSchedules() {

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);

    const [search, setSearch] = useState("");

    const [schedules] = useState([

        {
            scheduleId: 1,
            busName: "KPN Express",
            route: "Chennai → Madurai",
            journeyDate: "15 Aug 2026",
            departure: "09:30 PM",
            arrival: "05:30 AM",
            fare: 850,
            availableSeats: 18,
            status: "ACTIVE"
        },

        {
            scheduleId: 2,
            busName: "Sai Travels",
            route: "Salem → Bangalore",
            journeyDate: "16 Aug 2026",
            departure: "10:15 PM",
            arrival: "06:00 AM",
            fare: 700,
            availableSeats: 22,
            status: "ACTIVE"
        },

        {
            scheduleId: 3,
            busName: "GreenLine",
            route: "Coimbatore → Chennai",
            journeyDate: "17 Aug 2026",
            departure: "08:00 PM",
            arrival: "04:45 AM",
            fare: 900,
            availableSeats: 0,
            status: "CANCELLED"
        }

    ]);

    const [filteredSchedules, setFilteredSchedules] = useState(schedules);

    useEffect(() => {

        const filtered = schedules.filter(schedule =>

            schedule.busName
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            schedule.route
                .toLowerCase()
                .includes(search.toLowerCase())

        );

        setFilteredSchedules(filtered);

    }, [search, schedules]);

    return (

        <div className="schedules-page">

            <div className="page-header">

                <div>

                    <h2>

                        Bus Schedules

                    </h2>

                    <p>

                        Manage all schedules created for your buses.

                    </p>

                </div>

                <div className="header-actions">

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search Schedule..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={() => setShowAddModal(true)}

                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Create Schedule

                    </button>

                </div>

            </div>

            <div className="table-card">

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>Bus</th>
                            <th>Route</th>
                            <th>Date</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Fare</th>
                            <th>Seats</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredSchedules.map((schedule, index) => (

                                <tr key={schedule.scheduleId}>

                                    <td>{index + 1}</td>

                                    <td>{schedule.busName}</td>

                                    <td>{schedule.route}</td>

                                    <td>{schedule.journeyDate}</td>

                                    <td>{schedule.departure}</td>

                                    <td>{schedule.arrival}</td>

                                    <td>₹ {schedule.fare}</td>

                                    <td>{schedule.availableSeats}</td>

                                    <td>

                                        {

                                            schedule.status === "ACTIVE"

                                                ?

                                                <span className="active-status">

                                                    Active

                                                </span>

                                                :

                                                <span className="inactive-status">

                                                    Cancelled

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={() => setSelectedSchedule(schedule)}

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

            <ScheduleDetailsModal

                schedule={selectedSchedule}

                close={() => setSelectedSchedule(null)}

                openUpdate={() => {

                    setShowUpdateModal(true);

                }}

                openCancel={() => {

                    setShowCancelModal(true);

                }}

            />

            <AddScheduleModal

                show={showAddModal}

                close={() => setShowAddModal(false)}

            />

            <UpdateScheduleModal

                show={showUpdateModal}

                schedule={selectedSchedule}

                close={() => setShowUpdateModal(false)}

            />

            <ConfirmationModal

                show={showCancelModal}

                title="Cancel Schedule"

                message={`Are you sure you want to cancel this schedule?

Passengers who have already booked will not be affected.

This schedule will no longer be available for future bookings.`}

                confirmButtonText="Cancel Schedule"

                confirmButtonClass="btn-danger"

                onCancel={() => setShowCancelModal(false)}

                onConfirm={() => {

                    console.log("Cancel Schedule API");

                    setShowCancelModal(false);

                }}

            />

        </div>

    );

}

export default BusSchedules;