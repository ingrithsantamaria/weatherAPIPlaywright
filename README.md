# weatherAPIPlaywright
For the test, an APIKey is required that is generated through the URL https://openweathermap.org/api, first you must create an account and then log in, once we have the APIKey, we configure it in our project, in this case to To have control over the information and ensure confidentiality, the .env file is created that will contain the APIKey value, this file is added to the .gitignore file so that it is not tracked.

In this repository you will find the following tests:
1. Ensure that the API correctly returns the current weather data when queried with a city name.
2. Confirm that the API can retrieve current weather data using a city's unique ID.
3. Test the API's ability to return a 5-day weather forecast for a specified city by name.

# Recommendation:
Please note that to successfully run these tests, you must generate your APIKEY and configure it in the project.

# Dependencies:
To manage the environment variables, the dotenv library was installed. This can be installed with the following command:
npm install @playwright/test dotenv

# Notes

To verify specific aspects of the daily forecast. For example, count the number of entries to ensure there is 5 days' worth of data. Keep in mind that each day has 8 entries (every 3 hours), so we would expect 40 entries for 5 days.