
import React from 'react';
import { ForecastData } from '../types/weather';
import { Card } from '@/components/ui/card';

interface ForecastProps {
  data: ForecastData;
}

const Forecast = ({ data }: ForecastProps) => {
  const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <Card className="bg-white/30 backdrop-blur-lg border-none shadow-xl">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dailyData.map((day) => {
            const date = new Date(day.dt * 1000);
            const temp = Math.round(day.main.temp);
            const weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

            return (
              <div 
                key={day.dt} 
                className="bg-white/50 p-4 text-center rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <p className="font-medium text-gray-600">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <img 
                  src={weatherIcon} 
                  alt={day.weather[0].main} 
                  className="w-12 h-12 mx-auto animate-pulse-slow" 
                />
                <p className="text-lg font-semibold text-sky-600">{temp}°C</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default Forecast;
