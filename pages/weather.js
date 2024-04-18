import { WeatherAPI } from '../tests/weatherTest.spec';
import { test, expect } from '@playwright/test';
test.describe('Weather API Tests', () => {
  const weatherApi = new WeatherAPI();
  test('Test 1: Ensure the API returns the current weather data for a city', async () => {
    const response = await weatherApi.getWeatherByCityName('London');
    expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    expect(body).toHaveProperty('weather');
    expect(body).toHaveProperty('main');
  });
  test('Test 2: Confirm the API retrieves weather data using a city ID', async () => {
    const response = await weatherApi.getWeatherByCityId('2172797');
    expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    expect(body).toHaveProperty('weather');
    expect(body).toHaveProperty('main');
  });
  test('Test 3: Test the API’s ability to return a 5-day forecast for a specified city', async () => {
    const response = await weatherApi.getForecastByCityName('Paris');
    expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    expect(body).toHaveProperty('list');
    expect(body.list.length).toBeGreaterThan(0);
  });
});