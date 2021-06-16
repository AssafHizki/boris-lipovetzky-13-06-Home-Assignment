import WeatherDisplay from './components/WeatherDisplay'
import FiveDaysDisplay from './components/FiveDaysDisplay'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const App = () => {
    return (
        <div>
            <h1 className="text-center text-white">Welcome to the Weather App</h1>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <WeatherDisplay />
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