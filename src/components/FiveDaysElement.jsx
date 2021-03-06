const FiveDaysElement = (props) => {
    const { cityName, data, isCelsius, isFahrenheit, cityImg } = props

    const celsiusToFahrenheit = (celsius) => {
        return (+celsius * 1.8) + 32
    }

    const weatherIcon = (icon) => {
        if (icon.toString().length < 2){
        return `https://developer.accuweather.com/sites/default/files/0${icon}-s.png`
        }
        else return `https://developer.accuweather.com/sites/default/files/${icon}-s.png`
    }

    return (
        <div className="d-flex justify-content-center flex-row col-2 border border-white rounded mt-5">
            <div className="text-center">
                <h4>{cityName}</h4>
                <img onError={(event) => { event.target.onerror = null; event.target.src = "https://picsum.photos/200/80"}} src={cityImg} alt="city picture" width="200" height="80" className="border rounded" />
                <p>{data.Date}</p>
                <img src={weatherIcon(data.Day.Icon)} alt="city Picture" />
                {isCelsius &&
                    <>
                        <p>Min temp : {data.Temperature.Minimum.Value} C°</p>
                        <p>Max temp : {data.Temperature.Maximum.Value} C°</p>
                    </>
                }
                {isFahrenheit &&
                    <>
                    <p>Min temp : {parseInt(celsiusToFahrenheit(data.Temperature.Minimum.Value))} F°</p>
                    <p>Max temp : {parseInt(celsiusToFahrenheit(data.Temperature.Maximum.Value))} F°</p>
                    </>

                }
            </div>
        </div>
    )
}

export default FiveDaysElement