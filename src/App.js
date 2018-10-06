import React, {Component} from 'react';
import './App.css';
import {DegreeToggle} from '../src/components/degree-toggle'
import {FooterItem} from "./components/footer-item/footer-item";
import {windDegConvert, convertPressure} from './utils'
import _ from 'lodash'

class App extends Component {

    state = {
        metricSystem: 'metric',
        position: {},
        city: '',
        temp: '',
        description: '',
        footerItems: []
    }

    componentWillMount() {
        this.getMyPosition()
    }

    setMetricSystem(system) {
        this.setState({metricSystem: system}, this.getWeather)
    }

    handleToggleOnChange = (system) => {
        this.setMetricSystem(system)
    }

    setWeather = (weather) => {
        this.setState(this.parseWeather(weather))
    }

    parseWeather = (weather) => {
        const wind = _.get(weather, 'wind', {speed: '', deg: ''})
        const pressure = _.get(weather, 'main.pressure', '')
        const humidity = _.get(weather, 'main.humidity', '')
        const clouds = _.get(weather, 'clouds.all', '')
        return {
            city: _.get(weather, 'name', ''),
            temp: _.get(weather, 'main.temp', ''),
            description: _.get(weather, 'weather[0].description', ''),
            footerItems:
                [
                    {
                        header: 'Ветер',
                        content: `${wind.speed}${this.state.metricSystem == 'metric' ? 'м/с' : 'mph'}, ${wind.speed > 0 ? (wind.deg !== '' ? windDegConvert(wind.deg) : '') : ''}`
                    },
                    {
                        header: 'Давление',
                        content: `${pressure !== '' ? convertPressure(pressure) : ''}мм рт.ст.`
                    },
                    {
                        header: 'Влажность',
                        content: `${humidity}%`
                    },
                    {
                        header: 'Вероятность дождя',
                        content: `${clouds}%`
                    }
                ],
        }
    }

    getWeather = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.position.latitude}&lon=${this.state.position.longitude}&lang=ru&units=${this.state.metricSystem}&appid=2eff68c1e9b3a193b73332489cc0aa8e`
        fetch(url, {method: 'GET'}).then((response) => response.json()).then((json) => {
            this.setWeather(json)
        })
    }

    getMyPosition = () => {
        const _this = this
        window.navigator.geolocation.getCurrentPosition(function (pos) {
            const latitude = pos.coords.latitude
            const longitude = pos.coords.longitude
            _this.setState({
                position: {latitude, longitude},
            }, _this.getWeather)
        })
    }

    render() {
        const {temp, city, description, footerItems} = this.state

        return (
            <div className="app">
                <header className="app-header">
                    <div className="location">
                        <div className="first-line-wrapper">
                            <div className="location_City">
                                <span className="city">{city}</span>
                            </div>
                            <DegreeToggle onChange={this.handleToggleOnChange}/>
                        </div>
                        <div className="location-change">
                            <div className="change-city"><span>Сменить город</span></div>
                            <div className="my-position"><img src="images/arrow.svg" width="20" height="20"
                                                              alt="image description"/><span>Мое местоположение</span>
                            </div>
                        </div>
                    </div>
                </header>
                <article>
                    <div className="main-content-wrapper">
                        <div className="main-content">
                            <span><img src="images/sun.svg" width="160" height="160" alt="image description"/></span>
                            <span className="main-content-degree">{temp}&deg;</span>
                        </div>
                        <div><span className="main-content-description">{description}</span></div>
                    </div>
                </article>
                <footer>
                    {_.map(footerItems, (item, index) => (
                        <FooterItem key={index} header={item.header} content={item.content}/>))}
                </footer>
            </div>
        );
    }
}

export default App;
