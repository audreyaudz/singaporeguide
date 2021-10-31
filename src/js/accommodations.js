const getAccommodations = function(keywords, id = null)
{
    console.log("Getting accommodations from backend");
    return new Promise((resolve, reject) =>
    {
        fetch("/api/thi/accommodations_search?keyword="+encodeURIComponent(keywords))
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

const loadAccommodationsFromAPI = async function(keywords, id = null){
    if (!keywords || keywords.length === 0)
    {
        location.href='/index.html'
        return Promise.resolve()
    }
    return await getAccommodations(keywords, id)
}


export default await loadAccommodationsFromAPI
