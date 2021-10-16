const bent = require('bent')
const getJSON = bent('json')

KNOWN_APIS = 
{    
    temperature:
    {
        name: 'air temperature',
        endpoint:  "https://api.data.gov.sg/v1/environment/air-temperature",
        filter: (json) => json.items[0].readings[0].value            
    },

    forecast2h:
    {
        name: "2 hour forecast",
        endpoint: "https://api.data.gov.sg/v1//environment/2-hour-weather-forecast",
        filter: (json) => (json.items[0].forecasts.find((f) => f.area === 'City')['forecast'])
    },
    
    rainfall:
    {
        name: '5 minutes rainfall reading',
        endpoint: 'https://api.data.gov.sg/v1//environment/rainfall',
        filter: (json) => (json.items[0].readings.find((f) => f.station_id === 'S111')['value'])
    }
}

const getAPI = async function(api)
{     
    api = KNOWN_APIS[api]    
    console.log("Getting temperature from NEA " + api.name + " api");   
    let json = await getJSON(api.endpoint)    
    value = json    
    if (api.filter && typeof api.filter === 'function')
    {
        value = api.filter(json)
    }   
    console.log(value)
    return value
}


module.exports.getNEAAPI = getAPI
