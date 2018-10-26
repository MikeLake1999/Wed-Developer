
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
            url: "https://api.weatherbit.io/v2.0/forecast/daily?city=Hanoi&key=fe19e1593aee4c65afac6ad9d387df29",
            cityWeatherDaily: [],

            urls: "https://api.weatherbit.io/v2.0/forecast/3hourly?city=Hanoi&key=fe19e1593aee4c65afac6ad9d387df29",
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

    componentDidMount = () => {

        fetch(this.state.url)
            .then(result => {
                if (result.status == 200) {
                    return result.json();
                }
                else {
                    alert("Error 4000!" + result.statusText);
                }
            })
            .then(weatherObject => {
                //console.log(arrayWeather.city_name);
                let dailyWeathers = weatherObject.data.map(e => {
                    var image = "/image/" + e.weather.icon + ".png";
                    return (
                        <div class="container" key={e.datetime}>
                            <div class="h3">{e.datetime}</div>
                            <h2 class="display-3"><img alt="Responsive image" src={image} width="50" height="50" /></h2>
                            <div>
                                <h5>{e.max_temp}°</h5>
                                {e.min_temp}°
                            </div>
                            <div><h5>{e.weather.description}</h5></div>
                        </div>

                    )
                })

                this.setState({
                    cityWeatherDaily: dailyWeathers,

                });
                console.log("state", this.state.cityWeatherDaily);
            })
    }

    componentWillMount = () => {
        fetch(this.state.urls)
            .then(result => {
                if (result.status == 200) {
                    return result.json();
                }
                else {
                    alert("Error 4000!" + result.statusText);
                }
            })
            .then(weatherObject => {
                //console.log(arrayWeather.city_name);
                let dailyWeathers = weatherObject.data.map(e => {
                    var image = "/image/" + e.weather.icon + ".png";
                    return (
                        <div class="container" key={e.datetime}>
                            {/* <div class="h3">{e.datetime}</div> */}
                            <h2 class="display-3"><img alt="Responsive image" src={image} width="50" height="50" /></h2>
                            <div>
                                <h5>{e.temp}°</h5>
                            </div>
                            <div><h5>{e.weather.description}</h5></div>
                            <div>💧{e.rh}%</div>
                            <div>⇖{e.wind_spd} m/s</div>
                        </div>

                    )
                })

                this.setState({
                    cityWeatherHourly: dailyWeathers,

                });
                console.log("state", this.state.cityWeatherDaily);
            })
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
                        <p class=" text-center text-secondary">Barometer: {barometer}.00 mb 　 Humidity: {humidity} 　Dew Point: {temp - 6}°</p>
                    </strong>
                    <div class="container">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Daily</th>
                                    <th>Hourly</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[1]}</p></div></td>
                                    <td><div>{hour + 3}:00<p class="pb-5">{this.state.cityWeatherHourly[2]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[2]}</p></div></td>
                                    <td><div>{hour + 6}:00<p class="pb-5">{this.state.cityWeatherHourly[3]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[3]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[4]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[4]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[5]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[5]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[6]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[6]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[7]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[7]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[8]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[8]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[9]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[9]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[10]}</p></div></td>
                                </tr>
                                <tr>
                                    <td><div><p class="pb-5">{this.state.cityWeatherDaily[10]}</p></div></td>
                                    <td><div><p class="pb-5">{this.state.cityWeatherHourly[2]}</p></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Weather />,
    document.getElementById('root')
);