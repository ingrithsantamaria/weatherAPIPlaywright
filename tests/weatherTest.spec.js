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
  test('The API should return the current weather data for a city', async () => {
    const response = await weatherApi.getWeatherByCityName(context, 'Republic of Guatemala');
    const responseBody = await response.json();
    test.expect.soft(response.status()).toBe(200);
    test.expect.soft(responseBody).toHaveProperty('weather');
    test.expect.soft(responseBody).toHaveProperty('main');
  });
  test('The API should retrieve weather data using a city ID', async () => {
    const response = await weatherApi.getWeatherByCityId(context, '3563856');
    const responseBody = await response.json();
    test.expect.soft(response.status()).toBe(200);
    test.expect.soft(responseBody).toHaveProperty('weather');
    test.expect.soft(responseBody).toHaveProperty('main');
  });
  test('The API should be able to return a 5-day forecast for a specific city', async () => {
    const response = await weatherApi.getForecastByCityName(context, 'España');
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody))
    test.expect.soft(response.status()).toBe(200);
    test.expect.soft(responseBody).toHaveProperty('list');
    test.expect.soft(responseBody.list.length).toBeGreaterThan(0);
    test.expect.soft(response.body.list).to.have.length(40);
  });
  test('Should validate the structure of the weather response for a city', async () => {
    const response = await weatherApi.getForecastByCityName(context, 'Paris');
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody))
    test.expect.soft(response.status()).toBe(200);
    // console.log(JSON.stringify(response.status()))
    test.expect.soft(responseBody.list[0]).toHaveProperty('weather');
    test.expect.soft(responseBody.list[0]).toHaveProperty('main');
    test.expect.soft(responseBody.list[0]).toHaveProperty('wind');
    test.expect.soft(responseBody.name).not.toBeNull();
    test.expect.soft(responseBody.list[0].weather).toBeInstanceOf(Array);
    test.expect.soft(responseBody.list[0].weather.length).toBeGreaterThan(0);
    test.expect.soft(responseBody.list[0].main).not.toBeNull();
    test.expect.soft(responseBody.list[0].wind).not.toBeNull();
    // test.expect.soft(typeof responseBody.list[0].name).toBe('string')
  })
  test('Should handle 401 Unauthorized for invalid API key', async () => {
    const response = await weatherApi.getWeatherByCityNameInvalid(context, 'España');
    console.log(`Status Code: ${response.status()}`);
    test.expect.soft(response.status()).toBe(401);
  })
});
