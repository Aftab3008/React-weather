import Search from "./components/search/search";
import "./App.css"
import Current_weather from "./components/current/current";
import { useState } from "react";
import Forcast from "./components/forcast/forcast";

const apikey = import.meta.env.VITE_OPENWEATHER_APIKEY;
function App() {
    const URL = `https://api.openweathermap.org/data/2.5/weather`;
    const For_url = `https://api.openweathermap.org/data/2.5/forecast`;

    const API_key = apikey;
    const [current, setcurrent] = useState(null);
    const [forCast, setForcast] = useState(null);
    const hanndleonchange = (data) => {
        const [lat, long] = data.value.split(" ");
        const weather = fetch(`${URL}?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`)
        const forcast = fetch(`${For_url}?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`)
        Promise.all([weather, forcast])
            .then(async (responses) => {
                const result = await responses[0].json();
                const forcastRes = await responses[1].json();
                setcurrent({ city: data.label, ...result });
                setForcast({ city: data.label, ...forcastRes });
            })
            .catch((error) => console.log(error));

    }
    console.log(current);
    console.log(forCast);
    return (
        <div className="container">
            <Search onsearchChange={hanndleonchange} />
            {current ? <Current_weather data={current} /> : null}
            {forCast ? <Forcast data={forCast} /> : null}
        </div>
    );
}
export default App;