class InputForm extends React.Component {
    inputs = (e) => {
        this.props.inputt(e.target.value);
    }
    enterned = (e) => {
        this.props._enterned(e.key);
    }
    render() {
        return (
            <div class="container">
                <div className="h4 btn-light">
                    <strong>Forecast</strong>
                </div>
                <div>
                    <input class="text-center form-control grey-200 btn-block btn-lg" onChange={this.inputs} onKeyPress={this.enterned} placeholder="Search" onChange={this.inputs} placeholder="Input City Name" type="text" />
                    <span>
                        <button class="form-control btn btn-warning" onClick={this.clickz}><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 16 16">
                            <g>
                                <path id="path1" transform="rotate(0,8,8) translate(1.6,1.6) scale(0.4,0.4)  " fill="#FFFFFF" d="M14.580002,23.394012L14.580002,26.235001 17.18399,26.235001 17.18399,23.394012z M16.117996,5.7660065C14.539993,5.7660065 13.278992,6.2390137 12.332993,7.1880035 10.991989,8.5250092 10.320999,10.223007 10.320999,12.27301L13.043991,12.27301C13.043991,10.695007 13.437988,9.5130005 14.22699,8.7230072 14.697998,8.25 15.289001,8.0130005 16,8.0130005 16.867996,8.0130005 17.537003,8.25 18.009995,8.7230072 18.561996,9.2750092 18.838989,10.106003 18.838989,11.207001 18.838989,12.077011 18.522995,12.827011 17.89299,13.455002 16.789001,14.561005 16.039001,15.429001 15.644989,16.061005 15.090988,16.92601 14.817001,18.228012 14.817001,19.964005L16.947998,19.964005C16.947998,18.545013 17.302002,17.478012 18.009995,16.767014 18.955994,15.824005 19.705994,15.074005 20.259995,14.522003 21.205002,13.574005 21.679001,12.432007 21.679001,11.090012 21.679001,9.5130005 21.166,8.2109985 20.14299,7.1880035 19.194992,6.2390137 17.853989,5.7660065 16.117996,5.7660065z M16,0C24.819992,0 32,7.178009 32,16.001007 32,24.822006 24.819992,32 16,32 7.1759949,32 0,24.822006 0,16.001007 0,7.178009 7.1759949,0 16,0z" />
                            </g>
                        </svg>
                            <span>Search</span>
                        </button>
                    </span>
                    <br />
                </div>
            </div>
        );
    }
}

class GetInput extends React.Component {
    getCity = (value) => {
        this.props._getCity(value)
    }
    render() {
        var searchDetail = this.props._citySearch.map(e => {
            return (<div className="CityItem" onClick={this.getCity}>{this.props.city},&nbsp;{this.props.country}
                key={e.key} _getCity={this.getCity} city={e.LocalizedName} country={e.Country.ID}</div>);
        })
        return (<div className="  dropdown-content">
            {searchDetail}
        </div>);

    }
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({ isClick: false })
    }
    onClickNoEvent = () => {
        this.setState({
            isClick: !this.state.isClick
        });
        this.props.buttonz(this.state.isClick);
    }
    inputed = (value) => {
        this.props.getInput(value);
    }
    onEnterned = (value) => {
        this.props.confirmSearch(value);
    }
    getCity = (value) => {
        this.props._getCity(value);
    }
    render() {
        const _isClick = this.state.isClick;
        const styleInput = _isClick ? { visibility: "visible" } : { visibility: "hidden" };
        return (
            <div>
                <div className="form-inline my-2 my-lg-0 searchz mr-3">
                    <InputForm styleInput={styleInput} inputt={this.inputed} _enterned={this.onEnterned} />
                </div>
                <GetInput _citySearch={this.props.citySearch} _getCity={this.getCity} enter={this.onEnterned} />
            </div>
        );
    };
}

class TopWed extends React.Component {
    inputed = (value) => {
        this.props.searchz(value);
    }
    onEnterned = (value) => {
        this.props.enter(value);
    }
    getCity = (value) => {
        this.props._getCity(value)
    }
    _button = (value) => {
        this.props.buttonz(value);
    }
    render() {
        return (<div className="navbar topbarz ">
            <Search getInput={this.inputed} _getCity={this.getCity} buttonz={this._button} confirmSearch={this.onEnterned} citySearch={this.props._citySearch} />
        </div>);
    }
}

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            searchcity: "",
            city: "hanoi",
            weather: [],
            weathermain: {},
            noti: "",
            currentid: "",
            preid: "",
            cities: [],
            CF: ""
        })
    }


    componentDidMount() {

        var url = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.city + "&key=4aa70bd602ba4d12842da8391046399f";

        fetch(url).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                this.setState({ noti: "Eror 4400!" })
            }
        }).then(weatherres => {
            this.setState({
                weather: weatherres,
                weathermain: weatherres.data[0],
                currentid: weatherres.data[0].valid_date
            });

            document.getElementById(this.state.currentid).className = "scroll_Ngang align-self-baseline daychoose";

        })
    }

    
    componentDidUpdate(prevProps, prevState) {

        if (this.state.city !== prevState.city) {
            var url = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.city + "&key=4aa70bd602ba4d12842da8391046399f";

            fetch(url).then(response => {
                if (response.status == 200) {
                    this.setState({ noti: "" });
                    return response.json()
                }
                else {
                    this.setState({ noti: "The System Can't Find Your Country Side!" })
                }
            }).then(weatherres => {
                this.setState({
                    weather: weatherres,
                    weathermain: weatherres.data[0],
                    currentid: weatherres.data[0].valid_date,
                    searchcity: ""
                });

                try {
                } catch (error) {

                }
                this.setState({ preid: this.state.currentid });
            })
        }

        


        if (this.state.weathermain != prevState.weathermain) {
            document.getElementById(this.state.currentid).className = "scroll_Ngang align-self-baseline daychoose";
            try {
                document.getElementById(this.state.preid).className = "scroll_Ngang align-self-baseline";
            } catch (error) { }
        }
    }
    

    searchz = (value) => {
        this.setState({ presearchcity: this.state.searchcity });
        this.setState({ searchcity: value });
    }


    enter = (value) => {
        if (value === "Enter") {
            this.setState({ city: this.state.searchcity });
            document.getElementById('Search').value = "";
        }
    }


    selectItem = (value) => {
        this.setState({ preid: this.state.currentid });
        this.setState({ currentid: value.valid_date.toString() });
        this.setState({
            weathermain: value,
            searchcity: ""
        });

    }


    onClickHandle = (value) => {
        var t = value ? "F" : "C";
        this.setState({
            CF: t,
            searchcity: ""
        });
    }


    getCity = (value) => {
        this.setState({
            city: value.city + ", " + value.country,
            searchcity: ""
        });
        document.getElementById('Search').value = ""
    }

    _button = (value) => {
        if (value == true) {
            this.setState({ searchcity: "" });
            document.getElementById('Search').value = ""
        }
    }

    render() {
        return (
            <div>
                <TopWed searchz={this.searchz} buttonz={this._button} _getCity={this.getCity} HomePage={this.HomePage} enter={this.enter} _citySearch={this.state.cities} _onClickHandle={this.onClickHandle} />
                <ShowDaily CF={this.state.CF} noti={this.state.noti} weather={this.state.weather} _country={this.state.weather.country_code} _city={this.state.weather.city_name} weatherm={this.state.weathermain} _onClickHandle={this.onClickHandle} _selectItem={this.selectItem} />
                <ShowHourly CF={this.state.CF} noti={this.state.noti} weather={this.state.weather} _country={this.state.weather.country_code} _city={this.state.weather.city_name} weatherm={this.state.weathermain} _onClickHandle={this.onClickHandle} _selectWeather={this.selectWeather} />
            </div>
        );
    }
}


class ShowDaily extends React.Component {
    selectItem = (value) => {
        this.props._selectItem(value);
    }
    onClickHandle = (value) => {
        this.props._onClickHandle(value);
    }
    render() {
        if (this.props.weather.length == 0) {
            return <div></div>;
        }
        var weatherm = this.props.weatherm;
        var _city = this.props._city;
        var _country = this.props._country;
        var noti = this.props.noti;
        var _daily = this.props.weather;
        return (<div>
            <OneDay value={weatherm} country={_country} noti={noti} city={_city} _onClickHandle={this.onClickHandle} />
            <Daily dailyData={_daily} _noti={noti} _selectItem={this.selectItem} />
        </div>);
    }

}



class DailyDetails extends React.Component {
    selectItem = () => {
        this.props._selectItem(this.props._data);
    }
    render() {
        return (
            <div id={this.props._data.valid_date} className="scroll_Ngang align-self-baseline">
                <div>{this.props._date}</div>
                <img className="d-inline" height="40" width="40" src={this.props._src} />
                <div>
                    <h5 className="d-inline">{this.props.maxtemp}<sup>o</sup></h5>
                    &nbsp;&nbsp;&nbsp; <span>{this.props.mintemp}<sup>o</sup></span>
                </div>
                <strong>{this.props.description}</strong>
            </div>
        );
    }
}

class Daily extends React.Component {
    selectItem = (value) => {
        this.props._selectItem(value);
    }
    _scrollLeft = () => {
        var elmnt = document.getElementById("horizon");
        elmnt.scrollLeft = elmnt.scrollLeft - 100;
    }
    _scrollRight = () => {
        var elmnt = document.getElementById("horizon");
        elmnt.scrollLeft = elmnt.scrollLeft + 100;
    }
    render() {
        if (this.props._noti == "") {
            var dailyWeathersz = this.props.dailyData.data.map(e => {
                var _src = "https://www.weatherbit.io/static/img/icons/" + e.weather.icon + ".png";
                var d = new Date(e.valid_date);
                var day = new Array();
                day[0] = "Sun";
                day[1] = "Mon";
                day[2] = "Tue";
                day[3] = "Wed";
                day[4] = "Thu";
                day[5] = "Fri";
                day[6] = "Sat";
                var _date = (day[d.getDay()] + " " + d.getDate()).toString();
                return (<DailyDetails key={e.valid_date} _data={e} _date={_date} _src={_src} _selectItem={this.selectItem} maxtemp={e.max_temp} mintemp={e.min_temp} description={e.weather.description} />);
            });
            return (
                <div className="row d-flex align-items-center d-flex justify-content-center mx-auto px-auto">
                    <svg className="d-none d-md-inline col-2 buttonscr px-0 py-0 mx-0 py-0" xmlns="http://www.w3.org/2000/svg" onClick={this._scrollLeft} height="24" width="24" viewBox="0 0 24 24">
                        <g>
                            <path id="path1" transform="rotate(0,12,12) translate(2.50499939918518,0) scale(0.75,0.75)  " fill="#FFFFFF" d="M25.320001,0L25.320001,32 0,16z" />
                        </g>
                    </svg>
                    <div className="col-8 my-4 col-xs-10 px-0 my-0 dailyz"><h5>Daily</h5>
                        <div className="scroll no-gutters" id="horizon">
                            <div className="row text-center justify-content-center no-gutters">
                                <div className="row">
                                    {dailyWeathersz}
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg className="d-none d-md-inline col-2 buttonscr px-0 py-0 mx-0 py-0" xmlns="http://www.w3.org/2000/svg" onClick={this._scrollRight} height="24" width="24" viewBox="0 0 24 24">
                        <g>
                            <path id="path1" transform="rotate(0,12,12) translate(2.55224990844727,0) scale(0.75,0.75)  " fill="#FFFFFF" d="M0,0L25.194,16 0,32z" />
                        </g>
                    </svg>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }
}

class OneDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            isClick: true
        })
    }
    onClickHandle = () => {
        this.setState({ isClick: !this.state.isClick })
        this.props._onClickHandle(this.state.isClick);
    }
    num2 = (number) => {
        number = "0" + number;
        return number.substr(number.length - 2);
    }
    render() {
        var speedw = parseFloat(this.props.value.wind_spd * 3600 / 1000).toFixed(1);
        var imgz = "https://www.weatherbit.io/static/img/icons/" + this.props.value.weather.icon + ".png";
        var d = new Date();
        var timez = this.num2(d.getHours()) + ":" + this.num2(d.getMinutes())
        if (this.props.noti == "") {
            return (
                <div className="container">
                    <div className="">
                        <h2 className="text-center text-secondary">{this.props.city}, {this.props.country}</h2>
                        <div className="text-center">
                            <h2 class="display-3"><img alt="Image" width="100" height="100" src={imgz} />{this.props.value.temp}°C</h2>
                        </div>
                        <strong>
                            <h4 class="mb-1 text-center text-secondary">{this.props.value.weather.description}</h4>
                        </strong>
                        <p class=" text-center">Update as of {timez}</p>
                        <strong>
                            <p class=" text-center text-secondary">Feels like: {this.props.value.temp}°　 Wind: ⇖{speedw} km/h　 Visibility: {parseFloat(this.props.value.vis).toFixed(1)} km</p>
                            <p class=" text-center text-secondary">Barometer: {this.props.value.pres} mb　Humidity: {this.props.value.rh}%　Dew Point: {this.props.value.dewpt}°</p>
                        </strong>
                    </div>

                </div>

            );
        }
        else {
            return (<div className="row px-auto mx-auto">
                <h1 className="mx-auto currentweatherz align-content-center justify-content-center">{this.props.noti}</h1>
            </div>);
        }
    }
}


class ShowHourly extends React.Component {
    selectWeather = (value) => {
        this.props._selectWeather(value);
    }
    render() {
        if (this.props.weather.length == 0) {
            return <div></div>;
        }
        var weatherm = this.props.weatherm;
        var _city = this.props._city;
        var _country = this.props._country;
        var noti = this.props.noti;
        var _daily = this.props.weather;
        return (<div>

            <Hourly dailyData={_daily} _noti={noti} _selectWeather={this.selectWeather} />
        </div>);
    }

}


class HourlyDetails extends React.Component {
    selectWeather = () => {
        this.props._selectWeather(this.props._data);
    }
    render() {
        return (
            <div id={this.props._data.valid_date} className="scroll_Ngang align-self-baseline" onClick={this.selectWeather}>
                <img className="d-inline" height="40" width="40" src={this.props._src} />
                <div>
                    <h5 className="d-inline">{this.props.maxtemp + 2}<sup>o</sup></h5>
                </div>
                <strong>{this.props.description}</strong>
                <div>
                    <span>💧{this.props.humidity}%</span>
                </div>
                <div>
                    <span>⇖{this.props.winds}m/s</span>
                </div>
                ___________________________________________________________________________________
                <div>{this.props.date}:00h</div>
            </div>
        );
    }
}

class Hourly extends React.Component {
    selectWeather = (value) => {
        this.props._selectWeather(value);
    }
    render() {
        if (this.props._noti == "") {
            var dailyWeathersz = this.props.dailyData.data.map(e => {
                var _src = "https://www.weatherbit.io/static/img/icons/" + e.weather.icon + ".png";

                return (<HourlyDetails key={e.valid_date} _data={e} date={e.datetime} _src={_src} _selectWeather={this.selectWeather} maxtemp={e.temp} description={e.weather.description} humidity={e.rh} winds={e.wind_spd} />);
            });
            return (
                <div className=" text-dark row d-flex justify-content-center">
                    <svg className="d-none d-md-inline col-2 buttonscr px-0 py-0 mx-0 py-0" xmlns="http://www.w3.org/2000/svg" onClick={this._scrollLeft} height="24" width="24" viewBox="0 0 24 24">
                        <g>
                            <path id="path1" transform="rotate(0,12,12) translate(2.50499939918518,0) scale(0.75,0.75)  " fill="#FFFFFF" d="M25.320001,0L25.320001,32 0,16z" />
                        </g>
                    </svg>
                    <div className="col-8 my-4 col-xs-10 px-0 my-0 dailyz"><h5>Hourly</h5>
                        <div className="scroll no-gutters" id="horizon">
                            <div className="row text-center justify-content-center no-gutters">
                                <div className="row">
                                    {dailyWeathersz}
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg className="d-none d-md-inline col-2 buttonscr px-0 py-0 mx-0 py-0" xmlns="http://www.w3.org/2000/svg" onClick={this._scrollRight} height="24" width="24" viewBox="0 0 24 24">
                        <g>
                            <path id="path1" transform="rotate(0,12,12) translate(2.55224990844727,0) scale(0.75,0.75)  " fill="#FFFFFF" d="M0,0L25.194,16 0,32z" />
                        </g>
                    </svg>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }
}

ReactDOM.render(
    
    <Weather />,
    
    
    document.getElementById("root")
)