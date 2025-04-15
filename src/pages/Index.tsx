
import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Cloud } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import { WEATHER_API_KEY, WEATHER_API_BASE_URL } from '../config/weatherConfig';
import type { WeatherData, ForecastData } from '../types/weather';

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    console.log("API KEY:", WEATHER_API_KEY);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${WEATHER_API_BASE_URL}/weather`, {
          params: {
            q: city,
            appid: WEATHER_API_KEY,
            units: 'metric',
          },
        }),
        axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: WEATHER_API_KEY,
            units: 'metric',
          },
        }),
      ]);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 p-6 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Cloud className="text-white w-12 h-12" strokeWidth={1.5} />
          <h1 className="text-5xl font-bold text-white tracking-tight text-center drop-shadow-md">
            Weather Whisperer
          </h1>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <SearchBar onSearch={handleSearch} />
        </div>
        {weather && (
          <div className="grid md:grid-cols-2 gap-6">
            <CurrentWeather data={weather} />
            <Forecast data={forecast!} />
          </div>
        )}
        {!weather && !forecast && (
          <div className="text-center text-white mt-12 animate-pulse">
            <p className="text-xl font-light">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
