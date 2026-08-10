function DashboardCard({

    title,
    count,
    icon,
    color,
    onClick

}) {

    return (

        <div
            className="bg-white rounded-4 p-4 shadow-sm h-100"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >

            {/* Top */}

            <div className="d-flex justify-content-between align-items-start">

                <div>

                    <h6 className="text-secondary fw-semibold mb-2">

                        {title}

                    </h6>

                    <h2 className="fw-bold mb-0">

                        {count}

                    </h2>

                </div>

                <i
                    className={`bi ${icon}`}
                    style={{
                        color: color,
                        fontSize: "2.4rem"
                    }}
                ></i>

            </div>


            {/* Bottom */}

            <div className="d-flex justify-content-between align-items-center mt-4">

                <span className="text-secondary small">

                    View

                </span>

                <button

                    type="button"

                    className="btn btn-light rounded-circle d-flex justify-content-center align-items-center"

                    style={{
                        width: "40px",
                        height: "40px"
                    }}

                    onClick={onClick}

                >

                    <i className="bi bi-arrow-right"></i>

                </button>

            </div>

        </div>

    );

}

export default DashboardCard;