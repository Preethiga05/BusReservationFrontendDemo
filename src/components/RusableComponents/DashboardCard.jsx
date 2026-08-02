import "./ReusableComponentsCss/DashboardCard.css";


function DashboardCard({

    title,
    count,
    icon,
    color,
    onClick

}) {

    return (

        <div
            className="dashboard-card"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >

            <div className="card-top">

                <div>

                    <h6>{title}</h6>

                    <h2>{count}</h2>

                </div>

                <i
                    className={`bi ${icon}`}
                    style={{
                        color: color
                    }}
                ></i>

            </div>

            <div className="card-bottom">

                <span>

                   View

                </span>

                <button

                    className="card-arrow"

                    onClick={onClick}

                >

                    <i className="bi bi-arrow-right"></i>

                </button>

            </div>

        </div>

    );

}

export default DashboardCard;