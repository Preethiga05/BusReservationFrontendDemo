import "./SeatsCss/SeatGrid.css";
function SeatLegend() {

    return (

        <div className="legend">

            <div className="legend-item">

                <span className="legend-box available"></span>

                <span>Available</span>

            </div>

            <div className="legend-item">

                <span className="legend-box selected"></span>

                <span>Selected</span>

            </div>

            <div className="legend-item">

                <span className="legend-box booked"></span>

                <span>Booked</span>

            </div>

            <div className="legend-item">

                <span className="legend-box female"></span>

                <span>Female Reserved</span>

            </div>

            <div className="legend-item">

                <span className="legend-box window"></span>

                <span>Window Seat</span>

            </div>

        </div>

    );

}

export default SeatLegend;