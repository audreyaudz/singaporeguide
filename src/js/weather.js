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
        case 'Partly Cloudy (Day)':
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
        fetch("/api/nea/forecast2h")        
        .then (response => response.text())                
        .then ( data => {
            console.log(data)
            // in the API response, find the weather for the city            
            // let's store the weather in the browser so we can reuse it and not ask NEA on every page load            
            resolve(data)
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
        fetch("/api/nea/temperature")
        .then (response => response.text())                
        .then ( data => {
            console.log(data)
            // in the API response, find the weather for the city
            resolve(data)
            }
        )
        .catch (error => reject(error))
    });


}


const updateWeatherPanel = async function()
{
    let weather = sessionStorage.getItem('weather');
    let temperature = sessionStorage.getItem('temperature');

    weather = await getWeather();
    temperature = await getTemperature();

    setWeather(weather, temperature);        

}


export default updateWeatherPanel
