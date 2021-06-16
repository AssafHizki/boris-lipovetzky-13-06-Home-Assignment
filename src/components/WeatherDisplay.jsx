import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from '../actions/fetchWeather'

const WeatherDisplay = () => {

    const haifaLocationKey = "213181"
    const jerusalemLocationKey = "215854"
    const tlvLocationKey = "213225"
    const apiKey = "d1e2MAg7lafMIGrPZMhyA76DFd9NCHHn"
    const [weatherData, setWeatherData] = useState("")
    const [cityInput, setCityInput] = useState("")
    const [isCelsius, setIsCelsius] = useState(true)
    const [isFahrenheit, setIsFahrenheit] = useState(false)

    const weatherIcon = (icon) => {
        return `https://developer.accuweather.com/sites/default/files/0${icon}-s.png`
    }

    const celsiusToFahrenheit = (celsius) => {
        return (+celsius * 1.8) + 32
    }

    const toggleCelsiusToFahrenheit = () => {
        setIsCelsius(false)
        setIsFahrenheit(true)
    }

    const toggleFahrenheitToCelsius = () => {
        setIsCelsius(true)
        setIsFahrenheit(false)
    }

    const weatherSelector = useSelector((state) => state)
    const dispatch = useDispatch()
    const getWeatherInfoAction = (city) => dispatch(fetchWeather(city))

    const getWeatherInfo = (event) => {
        event.preventDefault()
        if (cityInput === "") {
            alert("You must enter a city")
        } else {
            getWeatherInfoAction(cityInput)
        }
    }

    useEffect(() => {
        Promise.all([fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${haifaLocationKey}?apikey=${apiKey}&metric=true`),
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${tlvLocationKey}?apikey=${apiKey}&metric=true`),
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${jerusalemLocationKey}?apikey=${apiKey}&metric=true`)
        ])
            .then(([haifaW, tlvW, jeruW]) => Promise.all([haifaW.json(), tlvW.json(), jeruW.json()]))
            .then(([haifadata, tlvdata, jerudata]) =>
                setWeatherData({ haifadata, tlvdata, jerudata }),
            )
    }, []);

    if (weatherSelector.weatherInfo) {
        return (
            <div className="container mt-5">
                <div className=" container w-50 mt-5">
                    <form onSubmit={getWeatherInfo} className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={event => setCityInput(event.target.value)} />
                        <button className="btn btn-danger" type="submit">Search</button>
                    </form>
                </div>
                <div className="container d-flex justify-content-center mb-5 mt-5">
                    <div className="d-flex flex-row">
                        <button hidden={isFahrenheit} onClick={toggleCelsiusToFahrenheit} className="btn btn-danger">To Fahrenheit</button>
                        <button hidden={isCelsius} onClick={toggleFahrenheitToCelsius} className="btn btn-danger">To Celsius</button>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="d-flex justify-content-center flex-row col-3 border border-white rounded">
                        <div className="text-center">
                            <p>{new Date().toDateString()}</p>
                            <h4>{weatherSelector.weatherInfo.name}</h4>
                            <img src={`http://openweathermap.org/img/w/${weatherSelector.weatherInfo.weather[0].icon}.png`} alt="" />
                            {
                                isCelsius &&
                                <>
                                    <p>Min temp : {weatherSelector.weatherInfo.main.temp_min} C°</p>
                                    <p>Max temp : {weatherSelector.weatherInfo.main.temp_max} C°</p>
                                </>
                            }
                            {
                                isFahrenheit &&
                                <>
                                    <p>Min temp : {parseInt(celsiusToFahrenheit(weatherSelector.weatherInfo.main.temp_min))} F°</p>
                                    <p>Max temp : {parseInt(celsiusToFahrenheit(weatherSelector.weatherInfo.main.temp_max))} F°</p>
                                </>
                            }
                            <Link target="_blank" to={`city/${weatherSelector.weatherInfo.name}`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!weatherData) {
        return (
            <div className="container mt-5">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className=" container w-50 mt-5">
                <form onSubmit={getWeatherInfo} className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={event => setCityInput(event.target.value)} />
                    <button className="btn btn-danger" type="submit">Search</button>
                </form>
            </div>
            <div className="container d-flex justify-content-center mb-5 mt-5">
                <div className="d-flex flex-row">
                    <button hidden={isFahrenheit} onClick={toggleCelsiusToFahrenheit} className="btn btn-danger">To Fahrenheit</button>
                    <button hidden={isCelsius} onClick={toggleFahrenheitToCelsius} className="btn btn-danger">To Celsius</button>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="d-flex justify-content-center flex-row col-3 border border-white rounded">
                        <div className="text-center">
                            <p>{new Date().toDateString()}</p>
                            <h4>Haifa</h4>
                            <img src={weatherIcon(weatherData.haifadata.DailyForecasts[0].Day.Icon)} alt="" />
                            {isCelsius &&
                                <>
                                    <p>Temp min: {weatherData.haifadata.DailyForecasts[0].Temperature.Minimum.Value} C° </p>
                                    <p>Temp max: {weatherData.haifadata.DailyForecasts[0].Temperature.Maximum.Value} C°</p>
                                </>}
                            {isFahrenheit &&
                                <>
                                    <p>Temp min: {parseInt(celsiusToFahrenheit(weatherData.haifadata.DailyForecasts[0].Temperature.Minimum.Value))} F°</p>
                                    <p>Temp max: {parseInt(celsiusToFahrenheit(weatherData.haifadata.DailyForecasts[0].Temperature.Maximum.Value))} F°</p>
                                </>}
                            <Link target="_blank" to={`city/haifa`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center col-3 border border-white rounded">
                        <div className="text-center">
                            <p>{new Date().toDateString()}</p>
                            <h4>Tel Aviv</h4>
                            <img src={weatherIcon(weatherData.tlvdata.DailyForecasts[0].Day.Icon)} alt="" />
                            {isCelsius &&
                                <>
                                    <p>Temp min: {weatherData.tlvdata.DailyForecasts[0].Temperature.Minimum.Value} C°</p>
                                    <p>Temp max: {weatherData.tlvdata.DailyForecasts[0].Temperature.Maximum.Value} C°</p>
                                </>}
                            {isFahrenheit &&
                                <>
                                    <p>Temp min: {parseInt(celsiusToFahrenheit(weatherData.tlvdata.DailyForecasts[0].Temperature.Minimum.Value))} F°</p>
                                    <p>Temp max: {parseInt(celsiusToFahrenheit(weatherData.tlvdata.DailyForecasts[0].Temperature.Maximum.Value))} F°</p>
                                </>}
                            <Link target="_blank" to={`city/tel aviv`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center col-3 border border-white rounded">
                        <div className="text-center">
                            <p>{new Date().toDateString()}</p>
                            <h4>Jerusalem</h4>
                            <img src={weatherIcon(weatherData.jerudata.DailyForecasts[0].Day.Icon)} alt="" />
                            {isCelsius &&
                                <>
                                    <p>Temp min: {weatherData.jerudata.DailyForecasts[0].Temperature.Minimum.Value} C°</p>
                                    <p>Temp max: {weatherData.jerudata.DailyForecasts[0].Temperature.Maximum.Value} C°</p>
                                </>}
                            {isFahrenheit &&
                                <>
                                    <p>Temp min: {parseInt(celsiusToFahrenheit(weatherData.jerudata.DailyForecasts[0].Temperature.Minimum.Value))} F°</p>
                                    <p>Temp max: {parseInt(celsiusToFahrenheit(weatherData.jerudata.DailyForecasts[0].Temperature.Maximum.Value))} F°</p>
                                </>}
                            <Link target="_blank" to={`city/jerusalem`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
