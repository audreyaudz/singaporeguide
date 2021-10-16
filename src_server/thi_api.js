
const bent = require('bent')
const getJSON = bent('json')

const cache = {}


const KNOWN_APIS = 
{    
    restaurants_search:
    {
        name: 'search for restaurant',
        endpoint:  "https://tih-api.stb.gov.sg/content/v1/food-beverages/search?apikey=$API_KEY&keyword=$KEYWORD",
    },

    attractions_search: 
    {
        name:  'search for attractions',
        endpoint:  "https://tih-api.stb.gov.sg/content/v1/attractions/search?apikey=$API_KEY&keyword=$KEYWORD"
    }
}

const getAPI = async function(api, args)
{     
    api = KNOWN_APIS[api];
    cacheKey = api.name + JSON.stringify(args)
    if (!args) args = {} ;
    console.log (api);

    if(cache[cacheKey])
    {
        console.log("Getting "+ api+ " from CACHE" + cacheKey);  
        return Promise.resolve(cache[cacheKey])
    }

    console.log("Getting "+ api+ " from THI" + api.name + " api");   
    let endpoint = api.endpoint;
    endpoint = endpoint.replace('$API_KEY', process.env.THI_APIKEY);
    for (const arg in args)
    {   
        endpoint = endpoint.replace('$' + arg.toUpperCase(), args[arg]);
    }
    console.log(endpoint);
    let json = await getJSON(endpoint);
    cache[cacheKey] = json
    value = json    
    if (api.filter && typeof api.filter === 'function')
    {
        value = api.filter(json)
    }   
    console.log(value)
    return value
}


module.exports.getTHIAPI = getAPI

