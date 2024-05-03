import { useState, useEffect } from "react";
//
import { TiLocation } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
//
import "../styles/weather.css";
export default function Home() {
  const [data, setData] = useState<Object>({});
  const searchLocation = () => {
    console.log("hola mundo");
  };

  const NoLocation = () => {
    return (
      <div>
        <div>
          <img src="/src/assets/findLocation.webp" alt="" />
        </div>
        <div>
          <span>Find your location</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="box">Weather-App</h1>
      <div className="form box">
        <div>
          <input type="text" placeholder="Enter Your Location"></input>
          <TiLocation color="white" className="icon icon__left" size={20} />
          <FaSearch
            onClick={searchLocation}
            color="white"
            className="icon icon__right"
          />
        </div>
        <div className="info__weather">
          {Object.keys(data).length == 0 ? <NoLocation /> : ""}

          {/* WEATHER */}
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
}
