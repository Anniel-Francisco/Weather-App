import { useState } from "react";
//
import { TiLocation } from "react-icons/ti";
import { FaSearch, FaWind } from "react-icons/fa";
import { PiWavesBold } from "react-icons/pi";
//
import WeatherAPI from "../api/WeatherAPI";
import "../styles/weather.css";

interface CurrentWeather {
  temp_c: number;
  humidity: number;
  wind_kph: number;
}

interface Location {
  name: string;
  country: string;
}

interface WeatherData {
  current: CurrentWeather;
  location: Location;
}

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("");
  const searchLocation = async () => {
    try {
      const { data } = await WeatherAPI.getWeather(location);
      setData(data);
    } catch (error: any) {
      console.log(error.response.data);
      setData(error.response.data);
    }
  };

  const DefaultLocation = () => {
    return (
      <div className="info__weather">
        <div>
          <img src="findLocation.webp" alt="" />
        </div>
        <div>
          <span>Find your location</span>
        </div>
      </div>
    );
  };

  const LocationFound = () => {
    return (
      <div className="info__weather">
        <div>
          <img src="weather-image.png" alt="" className="cloud" />
        </div>
        <div>
          <h2>{data?.current.temp_c}°C</h2>
          <span>
            {data?.location.name} / {data?.location.country}
          </span>
        </div>

        <div className="current__weather">
          <div>
            <div>
              <PiWavesBold size={35} />
            </div>
            <div>
              <span>{data?.current.humidity} %</span>
              <span>Humidity</span>
            </div>
          </div>
          <div>
            <div>
              <FaWind size={35} />
            </div>
            <div>
              <span>{data?.current.wind_kph} km/h</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const NoLocationFound = () => {
    return (
      <div className="info__weather">
        <div>
          <img src="noLocation.webp" alt="" />
        </div>
        <div>
          <span>No location found</span>
        </div>
      </div>
    );
  };
  let renderedComponent;
  if (data === null) {
    renderedComponent = <DefaultLocation />;
  } else if (
    Object.keys(data).length !== 0 &&
    Object.keys(data)[0] !== "error"
  ) {
    renderedComponent = <LocationFound />;
  } else {
    renderedComponent = <NoLocationFound />;
  }
  return (
    <div className="container">
      <h1 className="box">Weather-App</h1>
      <div className="form box">
        <div>
          <TiLocation color="white" className="icon icon__left" size={25} />
          <input
            type="text"
            placeholder="Enter Your Location"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value)
            }
          ></input>
          <FaSearch
            onClick={searchLocation}
            color="white"
            className="icon icon__right"
          />
        </div>

        {renderedComponent}
      </div>
    </div>
  );
}
