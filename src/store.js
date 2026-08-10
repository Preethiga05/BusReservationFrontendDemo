import { configureStore } from "@reduxjs/toolkit"
import SeatReducer from "./components/reducer/SeatReducer"

export default configureStore({
    reducer: {
        seat: SeatReducer
    }
})