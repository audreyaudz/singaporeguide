/*
    Weather related functions.

*/


// maps a weather response string from the NEA API into a classname from weather.css

const getClassFromWeather = function(weather) 
{
    switch (weather)
    {
        case 'Cloudy':
            return 'cloudy'
        case 'Partly Cloudy':
        case 'Partly Cloudy (Night)':
            return 'partly_cloudy'               
        case 'Sun' :
        case 'Sunny':
            return 'sunny'
        
        case 'Light Rain':             
        case 'Rain':                 
        case 'Heavy Rain':
            return 'rainy'
        case 'Thunderstorm':
        case 'Thunderstorms':
            return 'thunderstorm'

        default:
            console.warn("Unknown weather type:", weather)
            return 'unknown'
    }

}


// Set the weather panel on the website
const setWeather = function(weather, temperature)
{

    // find the weather element
    const ele = document.getElementById("weather");            
    // find which CSS class to use for the weather
    let cssClass = getClassFromWeather(weather);
    // add the weather calss to the weather element
    ele.classList.add(cssClass);    
    ele.innerHTML = "<h1>" + temperature + "°C </h1>"

}

const getWeather = async function()
{
    console.log("Getting weather  from NEA API");
    return new Promise((resolve, reject) =>
    {
        fetch("https://api.data.gov.sg/v1//environment/2-hour-weather-forecast")
        .then( response => response.json())
        .then ( data => {
            console.log(data)
            // in the API response, find the weather for the city
            let weather =  (data.items[0].forecasts.find((f) => f.area === 'City')['forecast'])
            sessionStorage.setItem('weather', weather);
            // let's store the weather in the browser so we can reuse it and not ask NEA on every page load            
            resolve(weather)
            }
        )
        .catch (error => reject(error))
    });
}


const getTemperature = async function()
{
    console.log("Getting temperature from NEA API");
    return new Promise((resolve, reject) =>
    {
        fetch("https://api.data.gov.sg/v1/environment/air-temperature")
        .then( response => response.json())
        .then ( data => {
            console.log(data)
            // in the API response, find the weather for the city
            let temperature =  (data.items[0].readings[0].value)
            sessionStorage.setItem('temperature', temperature);
            resolve(temperature)
            }
        )
        .catch (error => reject(error))
    });


}


const updateWeatherPanel = async function()
{
    let weather = sessionStorage.getItem('weather');
    let temperature = sessionStorage.getItem('temperature');

    if (weather && weather.length > 0 && temperature && temperature.length > 0)
    {
        setWeather(weather, temperature);
    }
    else /* We found no weather in the browser's session storage */
    {
        weather = await getWeather();
        temperature = await getTemperature();

        setWeather(weather, temperature);        
    }
}


export default updateWeatherPanel
