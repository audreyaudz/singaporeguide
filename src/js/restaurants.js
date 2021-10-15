const getRestaurants = async function(keywords)
{    
    let cache = window.localStorage.getItem('restaurants_'+keywords);
    if (cache && cache.length > 0)
    {
        console.log("Getting restaurants  from cache");
        return Promise.resolve(JSON.parse(cache))        
    }
    console.log("Getting restaurants  from TIH API");
    return new Promise((resolve, reject) =>
    {
        let api_key = window.localStorage.getItem('api_key')
        fetch("https://tih-api.stb.gov.sg/content/v1/food-beverages/search?apikey="+api_key+"&keyword="+encodeURIComponent(keywords))
        .then( response => response.json())
        .then ( json => {
            console.log(json.data)
            window.localStorage.setItem('restaurants_'+keywords, JSON.stringify(json.data))
            resolve(json)
            }
        )
        .catch (error => reject(error))
    });
}

const renderRestaurants = async function(keywords){
    if (!keywords || keywords.length === 0)
    {
        location.href='/index.html'
        return
    }
    return await getRestaurants(keywords)    
}


export default renderRestaurants