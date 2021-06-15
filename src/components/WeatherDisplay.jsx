import { useState, useEffect } from 'react'
import {
    Link
} from 'react-router-dom';
/*setInitializer(response.haifa)
        setWeatherHaifaToday(response.haifa)
        setWeatherTlvToday(response.tlv)
        setWeatherJerusalemToday(response.jerusalem)*/


const WeatherDisplay = () => {

    const haifaLocationKey = "213181"
    const jerusalemLocationKey = "215854"
    const tlvLocationKey = "213225"
    const apiKey = "xJGCNsvIBqZZL2wpo1GqVrhK4oQ97f6o"


    const [weatherData, setWeatherData] = useState("")
    //const [weatherHaifaToday, setWeatherHaifaToday] = useState([])
    //const [weatherTlvToday, setWeatherTlvToday] = useState([])
    //const [weatherJerusalemToday, setWeatherJerusalemToday] = useState([])
    //const [haifaWeatherIcon, setHaifaWeatherIcon] = useState("")
    //const [tlvWeatherIcon, setTlvWeatherIcon] = useState("")
    //const [jerusalemWeatherIcon, setJerusalemWeatherIcon] = useState("")

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

    const WeatherIconUrl = "https://developer.accuweather.com/sites/default/files/01-s.png"

    if (!weatherData) {
        return (
            <div>loading</div>
        )
    }


    return (
        <div>
            <div className="container">
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
