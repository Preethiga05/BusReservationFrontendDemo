function NoBusFound({ source, destination, journeyDate }) {

    return (

        <div className="flex-grow-1 d-flex justify-content-center align-items-center py-5">

            <div className="text-center">

                <i className="bi bi-bus-front-fill text-primary display-3"></i>

                <h4 className="mt-4 fw-semibold">
                    No Buses Available
                </h4>

                <p className="text-muted mb-2">

                    No buses are currently available from{" "}

                    <strong>{source}</strong>

                    {" "}to{" "}

                    <strong>{destination}</strong>

                </p>

                <p className="text-muted">

                    for <strong>{journeyDate}</strong>.

                </p>

                <div className="alert alert-light border mt-4">

                    <i className="bi bi-info-circle me-2 text-primary"></i>

                    Please try another date or change your route.

                </div>

            </div>

        </div>

    );

}

export default NoBusFound;