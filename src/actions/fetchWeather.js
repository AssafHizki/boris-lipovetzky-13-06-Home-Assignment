const apiKeyOpenWeather = "b967cd469e1a146da7fc22d9d2957efd"

export function fetchWeather(city) {

    return function (dispatch) {
        fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyOpenWeather}`)
            .then(res => {
                return res.json()
            })
            .then(jsonRes => {
                dispatch({
                    type: "fetch_weather",
                    payload: jsonRes
                })
            }).catch(err =>{
                console.error(err)
            })

    }
}