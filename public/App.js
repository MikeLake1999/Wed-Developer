class App extends React.Component {
    state = {
        temperature: "",
        city: "",
        country: "",
        pressure: "",
        humidity: "",
        description: "",
        rain: "",
        main: "Drizzle",
        icon: "09d",
        error: ""
    }




    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.city.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65a82dc59f6b5b57febb7baeff01fc60&units=metric`);
        const data = await api_call.json();


        if (city) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                main: data.main,
                rain: data.rain,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                pressure: undefined,
                rain: undefined,
                error: "Please enter the values."
            });
        }
    }




    render() {
        return (

            <div>

                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container d-flex justify-content-between">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                            <strong>Forecast</strong>
                        </a>
                        <form onSubmit={this.getWeather} >
                            <input className=" form-control grey-200 pr-5 pb-2" type="text" name="city" onChange={this.handlenum1Change} placeholder="Search City......" />
                            
                        </form>
                    </div>


                </div>

                <p> Weather in {this.state.city}</p>

                <p className="container"> {this.state.temperature} ºC</p>
            </div>

            // <div>

            //     <div className="overlay-panel">
            //         <span className="font-size-40 white">City</span>
            //         <div className="weather-location input-search float-right mt-10">

            //             <form onSubmit={this.getWeather} >
            //                 <input className="form-control form-control-sm grey-200" type="text" name="city" onChange={this.handlenum1Change} placeholder="City......" />

            //                 <button type="submit" class="input-search-btn">
            //                     <i class="icon wb-search grey-400" aria-hidden="true"></i>
            //                 </button>
            //             </form>
            //         </div>
            //     </div>

            // </div>


        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
