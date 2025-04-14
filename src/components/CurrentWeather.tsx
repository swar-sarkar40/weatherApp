
import React from 'react';
import { WeatherData } from '../types/weather';
import { Cloud, Droplets, Wind, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const temp = Math.round(data.main.temp);
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <Card className="bg-white/30 backdrop-blur-lg border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h2>
          <div className="flex items-center justify-center gap-4">
            <img 
              src={weatherIcon} 
              alt={data.weather[0].description} 
              className="w-24 h-24 animate-bounce-slow" 
            />
            <div>
              <p className="text-6xl font-bold text-sky-600">{temp}°C</p>
              <p className="text-lg text-gray-600 capitalize">{data.weather[0].description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { icon: Droplets, label: "Humidity", value: `${data.main.humidity}%` },
            { icon: Wind, label: "Wind Speed", value: `${data.wind.speed} m/s` },
            { icon: Gauge, label: "Pressure", value: `${data.main.pressure} hPa` },
            { icon: Cloud, label: "Feels Like", value: `${Math.round(data.main.feels_like)}°C` }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
              <Icon className="text-sky-500 w-6 h-6" />
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-semibold text-gray-700">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
