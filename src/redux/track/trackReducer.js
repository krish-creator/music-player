import { FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS } from "./trackTypes"

const initialState = {
    loading: false,
    tracks: [],
    error: ''
}

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_TRACKS_SUCCESS:
            return {
                loading: false,
                tracks: action.payload,
                error: ''
            }

        case FETCH_TRACKS_REQUEST:
            return {
                loading: false,
                tracks: [],
                error: action.payload
            }

        default:
            return state
    }
}

export default trackReducer