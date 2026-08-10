function SearchSummary(props) {

    return (

        <div className="d-flex justify-content-between align-items-center p-4 mb-4 bg-primary rounded-4 border shadow-sm">

            {/* Left Section */}

            <div>

                {/* Route */}

                <div className="d-flex align-items-center gap-3 mb-3">

                    <div className="bg-white bg-opacity-25 text-white rounded-3 d-flex justify-content-center align-items-center p-2">

                        <i className="bi bi-geo-alt-fill fs-4"></i>

                    </div>

                    <h2 className="mb-0 fw-bold text-white">

                        <span>

                            {props.source}

                        </span>

                        <i className="bi bi-arrow-right mx-3"></i>

                        <span>

                            {props.destination}

                        </span>

                    </h2>

                </div>


                {/* Journey Date */}

                <div className="d-flex align-items-center gap-3">

                    <div className="bg-white bg-opacity-25 text-white rounded-3 d-flex justify-content-center align-items-center p-2">

                        <i className="bi bi-calendar-event-fill fs-5"></i>

                    </div>

                    <p className="mb-0 text-white">

                        Journey Date :

                        <strong className="ms-2">

                            {props.journeyDate}

                        </strong>

                    </p>

                </div>

            </div>


            {/* Right Section */}

            <div>

                <div className="d-flex align-items-center gap-3 bg-white rounded-3 px-4 py-3 shadow-sm">

                    <div className="bg-primary-subtle text-primary rounded-3 d-flex justify-content-center align-items-center p-2">

                        <i className="bi bi-bus-front-fill fs-4"></i>

                    </div>

                    <div>

                        <h4 className="mb-0 text-primary fw-bold">

                            {props.busCount}

                        </h4>

                        <span className="text-secondary">

                            Buses Found

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SearchSummary;