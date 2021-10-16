const getRestaurants = function(keywords)
{        
    console.log("Getting restaurants from backend");
    return new Promise((resolve, reject) =>
    {        
        fetch("/api/thi/restaurants_search?keyword="+encodeURIComponent(keywords))
        .then( response => response.json())
        .then ( json => {
            console.log(json)            
            resolve(json)
            }
        )
        .catch (error => reject(error))
    });
}

const loadRestaurantsFromAPI = async function(keywords){
    if (!keywords || keywords.length === 0)
    {
        location.href='/index.html'
        return Promise.resolve()
    }
    return await getRestaurants(keywords)    
}


export default await loadRestaurantsFromAPI