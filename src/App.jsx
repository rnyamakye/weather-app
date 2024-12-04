import React, { useState, useRef } from "react";
import "./App.css";
import { Axios } from "axios";
import { IoMdSearch } from "react-icons/io";
import { FaThermometerHalf } from "react-icons/fa";

const Api_key = "84c9b8ddeaebea529f6f4b26233fbe48";
export default function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const weatherTypes = [
    {
      type: "Mist",
      img: "/fog.png",
    },
    {
      type: "Rain",
      img: "/heavy-rain.png",
    },
    {
      type: "Snow",
      img: "/snow.png",
    },
    {
      type: "Clouds",
      img: "/cloudy.png",
    },
    {
      type: "Haze",
      img: "/haze.png",
    },
    {
      type: "Smoke",
      img: "/co2.png",
    },
    {
      type: "Drizzle",
      img: "/drizzle.png",
    },
    {
      type: "clear",
      img: "/weather-app/public/clear-sky.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    console.log(inputRef.current.value);
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "/browser.png",
            },
          ]);
        }

        setShowWeather(
          weatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-[100vh] relative flex flex-col items-center justify-center">
      <div className="text-center p-4 bg-white w-[300px] rounded-3xl flex items-center justify-between ">
        <input
          type="text"
          ref={inputRef}
          className=" text-gray-600 placeholder:text-gray-400 focus:outline-none uppercase flex-1 "
          placeholder="Enter location"
        />
        <button onClick={fetchWeather}>
          <IoMdSearch />
        </button>
      </div>
      <div
        className={`duration-300 delay-75 overflow-hidden ${
          showWeather ? "h-[28rem]" : "h-0"
        }`}
      >
        {loading ? (
          <div>
            <img
              src="/loading.png"
              alt=""
              className="animate-spin w-14 mx-auto mt-2"
            />
          </div>
        ) : (
          showWeather && (
            <div className="text-center flex flex-col gap-6 mt-10">
              {apiData && (
                <p className="text-xl font-semibold">
                  {" "}
                  {apiData?.name + "," + apiData?.sys?.country}
                </p>
              )}

              <img
                src={showWeather[0]?.img}
                alt="...."
                className="w-52 mx-auto"
              />
              <h3 className="text-2xl font-semibold">{showWeather[0].type}</h3>
              {apiData && (
                <>
                  <div className="flex justify-center items-center gap-2">
                    <FaThermometerHalf />
                    {apiData.main.temp}&#176;C
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
