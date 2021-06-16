const apiKeyOpenWeather = "70f253e58e0b17ccd9b9b26a5b2878fd"

export function fetchWeather(city) {

    return function (dispatch) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyOpenWeather}`)
            .then(res => {
                return res.json()
            })
            .then(jsonRes => {
                if(jsonRes.cod === "404"){
                    return alert('city not found')
                }
                dispatch({
                    type: "fetch_weather",
                    payload: jsonRes
                })
            }).catch(err =>{
                console.log(err)
            })

    }
}