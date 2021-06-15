import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import FiveDaysElement from './FiveDaysElement'
const axios = require('axios').default;

let newArr = ["boludes 1", "otra cosa x aca", "y otracossea mas", "matanga dijo la changa", "jajajajajjajaja"]

const FiveDaysDisplay = () => {
    const { cityId } = useParams()
    const apiKey = "xJGCNsvIBqZZL2wpo1GqVrhK4oQ97f6o"
    const [fiveDaysInfo, setFiveDaysInfo] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const responseLocationKey = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityId}`)
                const locationKey = responseLocationKey.data[0].Key
                const responseFiveDaysForecast = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`)
                setFiveDaysInfo(responseFiveDaysForecast.data.DailyForecasts)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
        //console.log(responseFiveDaysForecast.data.DailyForecasts)
    }, [cityId])

    if (!fiveDaysInfo) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }


    return (
        <div>
            <div className="container">
                <div className="row justify-content-around">
                    {
                        fiveDaysInfo.map((element) => {
                            return (
                                <FiveDaysElement
                                    key={uuidv4()}
                                    texto={element.Date}
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