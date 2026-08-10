import BusCard from "./BusCard";

function BusList({ buses }) {

    return (

        <div className="d-flex flex-column gap-4">

            {

                buses.map((bus) => (

                    <BusCard
                        key={bus.busScheduleId}
                        bus={bus}
                    />

                ))

            }

        </div>

    );

}

export default BusList;