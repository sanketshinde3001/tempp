import React, { useState } from 'react';
import axios from 'axios';
// import only required properties
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  // used for store data in it 
  const [date, setdate] = useState([]);
  const [temp, settemp] = useState([]);
  const [city, setCity] = useState('');


  const fetchWeather = async () => {
    // fetch weather data from API means backend
    const response = await axios.get(`http://localhost:5000/fetchWeather/${city}`);
    // this will give me data of  days of weather in array format
    const data = response.data;
  
    const names =await data.map(obj => obj.date);
    // it will map all dates in each index of array
    const temp =await data.map(obj => obj.day.avgtemp_c);
    // same as above
    setdate(names);
    settemp(temp);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFetchWeather = () => {
    fetchWeather();
  };

  // this is used to find min-1 and max+1 temp so that we can used it to plot in graph
  // measn temp lies between 35-38 so no visible grapth so we take min-1 and max+1 temp as endings to look graph neat
  const minTemp = Math.floor(Math.min(...temp));
  const maxTemp = Math.ceil(Math.max(...temp));
  const yMin = minTemp - 1;
  const yMax = maxTemp + 1;

  const chartData = {
    labels: date,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: temp,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // plot graph
  const chartData1 = {
    labels: date,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: temp,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  //define graph style
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        // here set   min and max values
        min: yMin,
        max: yMax,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Weather Data</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mr-4"
        />
        <button
          onClick={handleFetchWeather}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Fetch Weather
        </button>
      </div>
      <div className='flex gap-5 items-center justify-between'>
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <Bar data={chartData1} options={chartOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <Line data={chartData}  />
      </div>
    </div>
    </div>
  );
}

export default App;
