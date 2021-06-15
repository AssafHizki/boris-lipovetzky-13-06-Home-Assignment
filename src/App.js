import WeatherDisplay from './components/WeatherDisplay'
import FiveDaysDisplay from './components/FiveDaysDisplay'
import {fiveDaysInfoHaifa, fiveDaysInfoJerusalem, fiveDaysInfoTlv} from './mockData'
import { createStore } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const App = () => {


    //console.log(fiveDaysInfo.data.DailyForecasts)

    return (
        <div>
            <h1 className="text-center">Welcome to the Weather App</h1>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <WeatherDisplay/>
                    </Route>
                    <Route path="/city/:cityId">
                        <FiveDaysDisplay />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App