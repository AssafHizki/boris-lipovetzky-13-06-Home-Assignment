import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {fetchWeather} from '../actions/fetchWeather'

const WeatherDisplay = () => {
    
    const WeatherIconUrl = "https://developer.accuweather.com/sites/default/files/01-s.png"
    const haifaLocationKey = "213181"
    const jerusalemLocationKey = "215854"
    const tlvLocationKey = "213225"
    const apiKey = "TiaaTCbiq3YbQ26p5O0vlYGSMO9WXzqt"

    const [weatherData, setWeatherData] = useState("")
    const [cityInput, setCityInput] = useState("")
    const [newCity, setNewCity] = useState("")

    const weatherSelector  = useSelector((state) => state ) 
    const dispatch = useDispatch()
    const getWeatherInfoAction = (city) => dispatch(fetchWeather(city))
    

    const getWeatherInfo = (event) =>{
        event.preventDefault()
        if(cityInput === ""){
            alert("You must enter a city")
        } else{
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

    if(weatherSelector.weatherInfo){
        return(
            <div>
                <h4>{weatherSelector.weatherInfo.name}</h4>
                <Link target="_blank" to={`city/${weatherSelector.weatherInfo.name}`}><button className="btn btn-danger mb-2">5 Days</button></Link>
            </div>
        )
    }
    


    if (!weatherData) {
        return (
            <div>loading</div>
        )
    }


    return (
        <div>
            <div className="container d-flex justify-content-center mb-5 mt-5">
                <form onSubmit={getWeatherInfo}>
                    <input  type="text" placeholder="What city are you looking for?" onChange={event => setCityInput(event.target.value)} />
                    <button type="submit" className="btn btn-danger">Search</button>
                </form>
            </div>
            <div hidden={false} className="container">
                <div className="row justify-content-around">
                    <div className="d-flex justify-content-center flex-row col-3 border border-dark rounded">
                        <div className="text-center">
                            <h4>haifa</h4>
                            <p>{weatherData.haifadata.DailyForecasts[0].Date}</p>
                            <img src={WeatherIconUrl} alt="" />
                            <p>Temp min: {weatherData.haifadata.DailyForecasts[0].Temperature.Minimum.Value} </p>
                            <p>Temp max: {weatherData.haifadata.DailyForecasts[0].Temperature.Maximum.Value} </p>
                            <Link target="_blank" to={`city/haifa`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center col-3 border border-dark rounded">
                        <div className="text-center">
                            <h4>tlv</h4>
                            <p>{weatherData.tlvdata.DailyForecasts[0].Date}</p>
                            <img src={WeatherIconUrl} alt="" />
                            <p>Temp min: {weatherData.tlvdata.DailyForecasts[0].Temperature.Minimum.Value} </p>
                            <p>Temp max: {weatherData.tlvdata.DailyForecasts[0].Temperature.Maximum.Value}</p>
                            <Link target="_blank" to={`city/tel aviv`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center col-3 border border-dark rounded">
                        <div className="text-center">
                            <h4>jeru</h4>
                            <p>{weatherData.jerudata.DailyForecasts[0].Date}</p>
                            <img src={WeatherIconUrl} alt="" />
                            <p>Temp min: {weatherData.jerudata.DailyForecasts[0].Temperature.Minimum.Value}</p>
                            <p>Temp max: {weatherData.jerudata.DailyForecasts[0].Temperature.Maximum.Value}</p>
                            <Link target="_blank" to={`city/jerusalem`}><button className="btn btn-danger mb-2">5 Days</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
