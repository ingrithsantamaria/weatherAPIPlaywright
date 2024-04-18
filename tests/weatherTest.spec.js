import { test } from '@playwright/test';
import { WeatherAPI } from '../pages/weather';
const weatherApi = new WeatherAPI();
test.describe('OpenWeatherMap API Tests', () => {
  let context;
  test.beforeAll(async () => {
    context = await weatherApi.createContext();
  });
  test.afterAll(async () => {
    await context.dispose();
  });
  test('Ensure the API returns the current weather data for a city', async () => {
    const response = await weatherApi.getWeatherByCityName(context, 'Republic of Guatemala');
    const responseBody = await response.json();
    test.expect(response.status()).toBe(200);
    test.expect(responseBody).toHaveProperty('weather');
    test.expect(responseBody).toHaveProperty('main');
  });
  test('Confirm the API retrieves weather data using a city ID', async () => {
    const response = await weatherApi.getWeatherByCityId(context, '3563856');
    const responseBody = await response.json();
    test.expect(response.status()).toBe(200);
    test.expect(responseBody).toHaveProperty('weather');
    test.expect(responseBody).toHaveProperty('main');
  });
  test('Test the APIs ability to return a 5-day forecast for a specified city', async () => {
    const response = await weatherApi.getForecastByCityName(context, 'España');
    const responseBody = await response.json();
    test.expect(response.status()).toBe(200);
    test.expect(responseBody).toHaveProperty('list');
    test.expect(responseBody.list.length).toBeGreaterThan(0);
  });
});
