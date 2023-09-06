import axios from "axios"
import { FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS } from "./trackTypes"

export const fetchTracksRequest = () => {
    return {
        type: FETCH_TRACKS_REQUEST
    }
}

export const fetchTracksSuccess = tracks => {
    return {
        type: FETCH_TRACKS_SUCCESS,
        payload: tracks
    }
}

export const fetchTracksFailure = error => {
    return {
        type: FETCH_TRACKS_FAILURE,
        payload: error
    }
}

export const fetchTracks = () => {
    return (dispatch) => {
        dispatch(fetchTracksRequest)
        axios.get()
            .then(response => {
                const tracks = response.data
                dispatch(fetchTracksSuccess(tracks))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchTracksFailure(errorMsg))
            })
    }
}