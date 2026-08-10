const initialState = {
    selectedSeats: []
}

const SeatReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADD_SEAT":
            return {
                ...state,
                selectedSeats: [
                    ...state.selectedSeats,
                    action.payload
                ]
            }

        case "REMOVE_SEAT":
            return {
                ...state,
                selectedSeats: state.selectedSeats.filter(
                    (seat) => seat.seatId !== action.payload
                )
            }

        case "CLEAR_SEATS":
            return {
                ...state,
                selectedSeats: []
            }

        default:
            return state
    }
}

export default SeatReducer