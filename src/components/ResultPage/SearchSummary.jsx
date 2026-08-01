import "./ResultPageCss/SearchSummary.css";

function SearchSummary(props) {

    return (

        <div className="search-summary">

            <div className="summary-left">

                <div className="route-row">

                    <div className="summary-icon">

                        <i className="bi bi-geo-alt-fill"></i>

                    </div>

                    <h2>

                        <span>{props.source}</span>

                        <i className="bi bi-arrow-right route-arrow"></i>

                        <span>{props.destination}</span>

                    </h2>

                </div>

                <div className="date-row">

                    <div className="summary-icon">

                        <i className="bi bi-calendar-event-fill"></i>

                    </div>

                    <p>

                        Journey Date :

                        <strong>{props.journeyDate}</strong>

                    </p>

                </div>

            </div>

            <div className="summary-right">

                <div className="bus-count-card">

                    <div className="summary-icon">

                        <i className="bi bi-bus-front-fill"></i>

                    </div>

                    <div>

                        <h4>{props.busCount}</h4>

                        <span>Buses Found</span>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default SearchSummary;