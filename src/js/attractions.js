const getAttractions = function(keywords, id = null)
{
    console.log("Getting attractions from backend");
    return new Promise((resolve, reject) =>
    {
        fetch("/api/thi/attractions_search?keyword="+encodeURIComponent(keywords))
        .then( response => response.json())
        .then ( json => {
            if (id != null)
            {
              json = json[id]
            }

            console.log(json)
            resolve(json)
            }
        )
        .catch (error => reject(error))
    });
}

const loadAttractionsFromAPI = async function(keywords, id = null){
    if (!keywords || keywords.length === 0)
    {
        location.href='/index.html'
        return Promise.resolve()
    }
    return await getAttractions(keywords, id)
}


export default await loadAttractionsFromAPI
