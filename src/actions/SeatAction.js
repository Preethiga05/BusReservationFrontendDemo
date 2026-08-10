export const addSeat = (seat) => ({
    type: "ADD_SEAT",
    payload: seat
})

export const removeSeat = (seatId) => ({
    type: "REMOVE_SEAT",
    payload: seatId
})

export const clearSeats = () => ({
    type: "CLEAR_SEATS"
})