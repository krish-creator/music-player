import trackReducer from "./track/trackReducer";

const rootReducer = combineReducers({
    track: trackReducer
})

export default rootReducer; 