const axios = require('axios').default;

const haifaLocationKey = "213181"
const jerusalemLocationKey = "215854"
const tlvLocationKey = "213225"
const apiKey = "BGT8WOcdgAWCE2GppFXFPE99oiLsszAO"



export async function getFiveDaysForecasts(){
    const haifaForeCasts = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${haifaLocationKey}?apikey=${apiKey}&metric=true`)
    const tlvForeCasts = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${tlvLocationKey}?apikey=${apiKey}&metric=true`)
    const jerusalemForeCasts = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${jerusalemLocationKey}?apikey=${apiKey}&metric=true`)

    return {
        haifa: haifaForeCasts.data.DailyForecasts[0],
        tlv: tlvForeCasts.data.DailyForecasts[0],
        jerusalem: jerusalemForeCasts.data.DailyForecasts[0]
    }
}