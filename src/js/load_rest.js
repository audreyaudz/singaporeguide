import renderRestaurants from './restaurants.js';
const resultsDiv = document.getElementById('rest_results');
const template = resultsDiv.firstElementChild;
const apikey = window.localStorage.getItem('api_key')

const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get('query');

const execSearch = async function()
{

    const results = await renderRestaurants(keyword)

    const createNewCard = (title, text, image) =>{
        let card = template.cloneNode(true)
        if (title) card.innerHTML = card.innerHTML.replace('$title', title)
        if (text) card.innerHTML = card.innerHTML.replace('$text', text)    
        if (image) 
            card.innerHTML = card.innerHTML.replace('$image', "https://tih-api.stb.gov.sg/media/v1/download/uuid/"+image+"?apikey="+apikey)    
        else
            card.innerHTML = card.innerHTML.replace('$image', './images/no_image.jpg')
        return card
    }   


    results.forEach((restaurant, index) =>
    {    
        let image = null
        if (restaurant.images && Array.isArray(restaurant.images) && restaurant.images.length > 0)
        {
            let thumb = Math.floor(Math.random()*restaurant.images.length)
            image = restaurant.images[thumb].uuid
        }


        if (!image && restaurant.thumbnails && Array.isArray(restaurant.thumbnails) && restaurant.thumbnails.length > 0)
        {
            let thumb = Math.floor(Math.random()*restaurant.thumbnails.length)
            image = restaurant.thumbnails[thumb].uuid
        }

        resultsDiv.appendChild(createNewCard(restaurant.name, restaurant.body, image)) 
    })

    // remove the template

    template.remove()
}
execSearch()

window.doSearch = ()  =>
{
    let keyword = document.getElementById('searchInput').value    
    window.location = './restaurants.html?query='+encodeURIComponent(keyword)    
  
}