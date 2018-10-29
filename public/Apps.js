class Weather extends React.Component {

    constructor(props) {
        super(props);
        var httpRequest = new XMLHttpRequest();
        var url = "https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=150615f207013e110cca89fd6e23157b";
        httpRequest.open("GET", url, false);
        httpRequest.send(null);
        var cityWeather = JSON.parse(httpRequest.responseText);
        var ctweather;
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day = this.pad2(d.getHours()) + ":" + this.pad2(d.getMinutes());
        var days = months[d.getMonth()];
        var dayss = d.getDate();
        var hour = d.getHours();

        if ((cityWeather.main.temp - 273.15) % 1 >= 5) {
            ctweather = parseInt((cityWeather.main.temp - 273.15) + 1);
        }
        else {
            ctweather = parseInt(cityWeather.main.temp - 273.15);
        }

        this.state = {
            url: "https://api.weatherbit.io/v2.0/forecast/daily?city=Hanoi&key=fc7c2563e1da4c36b42e2b3ee478f6b4",
            cityWeatherDaily: [],

            urls: "https://api.weatherbit.io/v2.0/forecast/3hourly?city=Hanoi&key=fc7c2563e1da4c36b42e2b3ee478f6b4",
            cityWeatherHourly: [],
            hours: hour,
            date: day,
            dates: days,
            datess: dayss,
            image: cityWeather.weather[0].icon,
            temper: ctweather,
            country: cityWeather.name,
            countrytrue: cityWeather.name,
            winds: {
                speed: cityWeather.wind.speed,
                degree: cityWeather.wind.deg,
            },
            barometer: cityWeather.main.pressure,
            cloudiness: cityWeather.weather[0].description,
            humidity: cityWeather.main.humidity,
            countryname: cityWeather.sys.country,
        };

        // console.log(cityWeather.weather.icon)
    }

    inputz = (e) => {
        this.setState({ country: e.target.value })
    }
    pad2 = (number) => {
        number = "0" + number;
        return number.substr(number.length - 2);
    }
    timetick = (tick) => {
        var ticks = tick;
        // Assume milliseconds for now
        var seconds = Math.floor(ticks / 1000);
        // console.log(seconds);
        var hour = Math.floor((seconds / 3600) % 24);
        var minute = Math.floor((seconds / 60) % 60);
        var second = seconds % 60;

        var result = this.pad2(hour) + ":" + this.pad2(minute) + ":" + this.pad2(second)
        return result;

    }


    clickz = () => {
        var httpRequest = new XMLHttpRequest();

        // this.state.country[0].toUpperCase();
        var namevar = "";
        for (var i = 0; i < this.state.country.length; i++) {
            if (i == 0) {
                namevar = namevar + this.state.country[i].toUpperCase();
            }
            else {
                namevar = namevar + this.state.country[i].toLowerCase();
            }
        }
        console.log(namevar);

        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + namevar + "&appid=150615f207013e110cca89fd6e23157b";
        httpRequest.open("GET", url, false);
        httpRequest.send(null);
        var cityWeather = JSON.parse(httpRequest.responseText);
        var ctweather;
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day = this.pad2(d.getHours()) + ":" + this.pad2(d.getMinutes());
        var days = months[d.getMonth()];
        var dayss = d.getDate();




        if (Math.floor((cityWeather.main.temp - 273.15) % 1) >= 5) {
            ctweather = parseInt((cityWeather.main.temp - 273.15) + 1);
        }
        else {
            ctweather = parseInt(cityWeather.main.temp - 273.15);
        }
        if (namevar == cityWeather.name) {

            this.setState({
                date: day,
                dates: days,
                datess: dayss,
                image: cityWeather.weather[0].icon,
                temper: ctweather,
                country: cityWeather.name,
                countrytrue: cityWeather.name,
                winds: {
                    speed: cityWeather.wind.speed,
                    degree: cityWeather.wind.deg,
                },
                cloudiness: cityWeather.weather[0].description,
                humidity: cityWeather.main.humidity,
                barometer: cityWeather.main.pressure,
                countryname: cityWeather.sys.country,

            })
            this.setState({ countrytrue: this.state.country })

        }

    }
    render() {
        var imagez = "https://openweathermap.org/img/w/" + this.state.image + ".png";
        var wind = this.state.winds.speed;
        var cloudiness = this.state.cloudiness;
        var humidity = this.state.humidity + " %";
        var countryname = this.state.country;
        var temp = this.state.temper;
        var datet = this.state.date;
        var datett = this.state.dates;
        var datettt = this.state.datess;
        var barometer = this.state.barometer;
        var hour = this.state.hours;
        return (
            <div className="">
                <div className="h4 btn-light text-mute">
                    <strong>Forecast</strong>
                </div>
                <div className="">

                    <input class="form-control grey-200 btn-block btn-lg " type="text" onChange={this.inputz} placeholder="Input City Name................." />
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
                    <h2 className="text-center text-secondary">{this.state.countrytrue}, {this.state.countryname}</h2>
                    <div class="text-center">
                        <h2 class="display-3"><img alt="Responsive image" src={imagez} width="100" height="100" />{temp}°C</h2>


                    </div>
                    <strong>
                        <p class="mb-1 text-center text-secondary">{cloudiness.toUpperCase()}</p>
                    </strong>
                    <p class=" text-center">Update as of {datet}</p>
                    <strong>
                        <p class=" text-center text-secondary">Feels like: {temp + 3}°　 Wind: ⇖{wind} m/s　 Visibility: 10 km</p>
                        <p class=" text-center text-secondary">Barometer: {barometer}.00 mb　　Humidity: {humidity}　　Dew Point: {temp - 6}°</p>
                    </strong>

                </div>
            </div>
        );
    }
}

class Weather1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
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


    HomePage = () => {
        this.setState({ city: "hanoi" });
    }


    componentDidMount() {

        var url = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.city + "&key=fc7c2563e1da4c36b42e2b3ee478f6b4";

        fetch(url).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                this.setState({ noti: "Something went wrong, sorry about that!" })
            }
        }).then(weatherres => {
            this.setState({
                weather: weatherres,
                weathermain: weatherres.data[0],
                currentid: weatherres.data[0].valid_date
            });

        })
    }
    // componentDidUpdate(prevProps, prevState) {

    //     if (this.state.city !== prevState.city) {
    //         var url = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.city + "&key=fc7c2563e1da4c36b42e2b3ee478f6b4";

    //         fetch(url).then(response => {
    //             if (response.status == 200) {
    //                 this.setState({ noti: "" });
    //                 return response.json()
    //             }
    //             else {
    //                 this.setState({ noti: "Can not find country" })
    //             }
    //         }).then(weatherres => {
    //             this.setState({
    //                 weather: weatherres,
    //                 weathermain: weatherres.data[0],
    //                 currentid: weatherres.data[0].valid_date,
    //                 searchcity: ""
    //             });

    //         })
    //     }
    // }


    // searchz = (value) => {
    //     this.setState({ presearchcity: this.state.searchcity });
    //     this.setState({ searchcity: value });
    // }


    // enter = (value) => {
    //     if (value === "Enter") {
    //         this.setState({ city: this.state.searchcity });
    //         document.getElementById('Search').value = "";
    //     }
    // }


    // selectWeather = (value) => {
    //     this.setState({ preid: this.state.currentid });
    //     this.setState({ currentid: value.valid_date.toString() });
    //     this.setState({
    //         weathermain: value,
    //         searchcity: ""
    //     });

    // }


    // onClickHandle = (value) => {
    //     var t = value ? "F" : "C";
    //     this.setState({
    //         CF: t,
    //         searchcity: ""
    //     });
    // }


    // pickCity = (value) => {
    //     this.setState({
    //         city: value.city + ", " + value.country,
    //         searchcity: ""
    //     });
    //     document.getElementById('Search').value = ""
    // }

    // button = (value) => {
    //     if (value == true) {
    //         this.setState({ searchcity: "" });
    //         document.getElementById('Search').value = ""
    //     }
    // }

    render() {
        return (
            <div>
                {/* <NavBar searchz={this.searchz} buttonz={this._button}_pickCity={this.pickCity} HomePage={this.HomePage} enter={this.enter} _citySearch={this.state.cities} _onClickHandle={this.onClickHandle} /> */}
                <WeatherDetails CF={this.state.CF} noti={this.state.noti} weather={this.state.weather} _country={this.state.weather.country_code} _city={this.state.weather.city_name} weatherm={this.state.weathermain} _onClickHandle={this.onClickHandle} _selectWeather={this.selectWeather} />
            </div>
        );
    }
}


class WeatherDetails extends React.Component {
    selectWeather = (value) => {
        this.props._selectWeather(value);
    }
    onClickHandle = (value) => {
        this.props._onClickHandle(value);
    }
    render() {
        if (this.props.weather.length == 0) {
            return <div></div>;
        }
        var noti = this.props.noti;
        var _daily = this.props.weather;
        return (<div>
            <Daily dailyData={_daily} _noti={noti} _selectWeather={this.selectWeather} />
        </div>);
    }

}



class DailyWeather extends React.Component {
    selectWeather = () => {
        this.props._selectWeather(this.props._data);
    }
    render() {
        return (
            <div id={this.props._data.valid_date} className="scrolls_block align-self-baseline" onClick={this.selectWeather}>
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
    selectWeather = (value) => {
        this.props._selectWeather(value);
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
                return (<DailyWeather key={e.date} _data={e} _date={_date} _src={_src} _selectWeather={this.selectWeather} maxtemp={e.max_temp} mintemp={e.min_temp} description={e.weather.description} />);
            });
            return (
                <div className=" text-dark row d-flex justify-content-center">
                    <svg className="d-none d-md-inline col-2 buttonscr px-0 py-0 mx-0 py-0" xmlns="http://www.w3.org/2000/svg" onClick={this._scrollLeft} height="24" width="24" viewBox="0 0 24 24">
                        <g>
                            <path id="path1" transform="rotate(0,12,12) translate(2.50499939918518,0) scale(0.75,0.75)  " fill="#FFFFFF" d="M25.320001,0L25.320001,32 0,16z" />
                        </g>
                    </svg>
                    <div className="col-8 my-4 col-xs-10 px-0 my-0 dailyz"><h5>Daily</h5>
                        <div className="scrolls no-gutters" id="horizon">
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



class Weather2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
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


    HomePage = () => {
        this.setState({ city: "hanoi" });
    }


    componentDidMount() {

        var url = "https://api.weatherbit.io/v2.0/forecast/3hourly?city=" + this.state.city + "&key=fc7c2563e1da4c36b42e2b3ee478f6b4";

        fetch(url).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                this.setState({ noti: "Something went wrong, sorry about that!" })
            }
        }).then(weatherres => {
            this.setState({
                weather: weatherres,
                weathermain: weatherres.data[0],
                currentid: weatherres.data[0].valid_date
            });


            document.getElementById(this.state.currentid).className = "scrolls_block align-self-baseline daychoose";

        })
    }
    // componentDidUpdate(prevProps, prevState) {

    //     if (this.state.city !== prevState.city) {
    //         var url = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.city + "&key=4aa70bd602ba4d12842da8391046399f";

    //         fetch(url).then(response => {
    //             if (response.status == 200) {
    //                 this.setState({ noti: "" });
    //                 return response.json()
    //             }
    //             else {
    //                 this.setState({ noti: "Can not find country" })
    //             }
    //         }).then(weatherres => {
    //             this.setState({
    //                 weather: weatherres,
    //                 weathermain: weatherres.data[0],
    //                 currentid: weatherres.data[0].valid_date,
    //                 searchcity: ""
    //             });

    //             var weathermain = this.state.weathermain;
    //             var weather = this.state.weather;

    //             if (this.state.CF == "F") {
    //                 for (var i = 0; i < 16; i++) {
    //                     weather.data[i].temp = parseFloat((weather.data[i].temp * 1.8) + 32).toFixed(1);
    //                     weather.data[i].min_temp = parseFloat((weather.data[i].min_temp * 1.8) + 32).toFixed(1);
    //                     weather.data[i].max_temp = parseFloat((weather.data[i].max_temp * 1.8) + 32).toFixed(1);
    //                 }
    //             }

    //             this.setState({
    //                 weather: weather,
    //                 weathermain: weathermain
    //             });

    //             document.getElementById(this.state.currentid.toString()).className = "scrolls_block align-self-baseline daychoose";

    //             try {
    //             } catch (error) {

    //             }
    //             this.setState({ preid: this.state.currentid });
    //         })
    //     }


    //     if (this.state.weathermain != prevState.weathermain) {
    //         document.getElementById(this.state.currentid).className = "scrolls_block align-self-baseline daychoose";
    //         try {
    //             document.getElementById(this.state.preid).className = "scrolls_block align-self-baseline";
    //         } catch (error) {

    //         }


    //         this.setState({ preid: this.state.currentid })

    //     }
    // }


    // searchz = (value) => {
    //     this.setState({ presearchcity: this.state.searchcity });
    //     this.setState({ searchcity: value });
    // }


    // enter = (value) => {
    //     if (value === "Enter") {
    //         this.setState({ city: this.state.searchcity });
    //         document.getElementById('Search').value = "";
    //     }
    // }


    // selectWeather = (value) => {
    //     this.setState({ preid: this.state.currentid });
    //     this.setState({ currentid: value.valid_date.toString() });
    //     this.setState({
    //         weathermain: value,
    //         searchcity: ""
    //     });

    // }


    // onClickHandle = (value) => {
    //     var t = value ? "F" : "C";
    //     this.setState({
    //         CF: t,
    //         searchcity: ""
    //     });
    // }


    // pickCity = (value) => {
    //     this.setState({
    //         city: value.city + ", " + value.country,
    //         searchcity: ""
    //     });
    //     document.getElementById('Search').value = ""
    // }

    // _button = (value) => {
    //     if (value == true) {
    //         this.setState({ searchcity: "" });
    //         document.getElementById('Search').value = ""
    //     }
    // }

    render() {
        return (
            <div>
                {/* <NavBar searchz={this.searchz} buttonz={this._button}_pickCity={this.pickCity} HomePage={this.HomePage} enter={this.enter} _citySearch={this.state.cities} _onClickHandle={this.onClickHandle} /> */}
                <ShowHourly CF={this.state.CF} noti={this.state.noti} weather={this.state.weather} _country={this.state.weather.country_code} _city={this.state.weather.city_name} weatherm={this.state.weathermain} _onClickHandle={this.onClickHandle} _selectWeather={this.selectWeather} />
            </div>
        );
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
            <div id={this.props._data.valid_date} className="scrolls_block align-self-baseline" onClick={this.selectWeather}>
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
                        <div className="scrolls no-gutters" id="horizon">
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
    <div>
        <Weather />
        <Weather1 />
        <Weather2 />
    </div>,
    document.getElementById("root")
)