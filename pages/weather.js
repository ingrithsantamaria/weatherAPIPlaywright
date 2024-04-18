import { request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
export class WeatherAPI {
  constructor() {
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY;
  }
  async createContext() {
    return await request.newContext();
  }
  async getWeatherByCityName(context, cityName) {
    return await context.get(`${this.baseUrl}/weather?q=${cityName}&appid=${this.apiKey}`);
  }
  async getWeatherByCityId(context, cityId) {
    return await context.get(`${this.baseUrl}/weather?id=${cityId}&appid=${this.apiKey}`);
  }
  async getForecastByCityName(context, cityName) {
    return await context.get(`${this.baseUrl}/forecast?q=${cityName}&appid=${this.apiKey}`);
  }
}