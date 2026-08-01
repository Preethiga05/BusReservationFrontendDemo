import BusCard from "./BusCard";

function BusList({ buses }) {

    return (

        <div>

            {

                buses.map((bus) => (

                    <BusCard

                        key={bus.busScheduleId}

                        bus={bus}

                    />

                ))

            }

        </div>

    )

}

export default BusList;