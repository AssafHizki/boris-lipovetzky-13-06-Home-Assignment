const weatherReducer = (state = {weatherInfo : {}}, action) =>{
    if(action.type = "fetch_weather"){
        state = {...state, weatherInfo : action.payload}
    }
    return state
} 

export default weatherReducer