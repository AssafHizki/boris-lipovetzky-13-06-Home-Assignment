import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import FiveDaysElement from './FiveDaysElement'
const axios = require('axios').default;


const FiveDaysDisplay = () => {
    const { cityId } = useParams()
    const apiKey = "9ZVaRSSBpddowwsOykv8SAvPAtTo8Hex"
    const [fiveDaysInfo, setFiveDaysInfo] = useState("")
    const [cityName, setCityName] = useState('')
    const [isCelsius, setIsCelsius] = useState(true)
    const [isFahrenheit, setIsFahrenheit] = useState(false)

    const toggleCelsiusToFahrenheit = () => {
        setIsCelsius(false)
        setIsFahrenheit(true)
    }

    const toggleFahrenheitToCelsius = () => {
        setIsCelsius(true)
        setIsFahrenheit(false)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const responseLocationKey = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityId}`)
                const locationKey = responseLocationKey.data[0].Key
                const responseFiveDaysForecast = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`)
                setFiveDaysInfo(responseFiveDaysForecast.data.DailyForecasts)
                setCityName(responseLocationKey.data[0].LocalizedName)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [cityId])

    if (!fiveDaysInfo) {
        return (
            <div className="container mt-5">
                <div className="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className="container">
                <div className="container d-flex justify-content-center mb-5 mt-5">
                    <div className="d-flex flex-row">
                        <button hidden={isFahrenheit} onClick={toggleCelsiusToFahrenheit} className="btn btn-danger">To Fahrenheit</button>
                        <button hidden={isCelsius} onClick={toggleFahrenheitToCelsius} className="btn btn-danger">To Celsius</button>
                    </div>
                </div>
                <div className="row justify-content-around">
                    {
                        fiveDaysInfo.map((element) => {
                            return (
                                <FiveDaysElement
                                    isCelsius={isCelsius}
                                    isFahrenheit={isFahrenheit}
                                    key={uuidv4()}
                                    cityName={cityName}
                                    data={element}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FiveDaysDisplay