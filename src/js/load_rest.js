import loadRestaurantsFromAPI from './restaurants.js';
import '@fortawesome/fontawesome-free/css/all.css';
import "winbox/dist/winbox.bundle.js";
const resultsDiv = document.getElementById('rest_results');
const template = resultsDiv.firstElementChild;

// get the API key from the browser storage
const apikey = window.localStorage.getItem('api_key')

// extract the keywords we are searching for from the browser's url bar
const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get('query'); // specifically, we are looking at the ?query= part of the url, because that's the keyword


window.restCardWrap = function(element){
    let json = window.cache[element]

  new WinBox({
        title: json.name,
        html: json.body + '<pre>' + JSON.stringify(json, null, 2) + '</pre>',
        // modal: true,
        border: 4,
        x: "center",
        y: "center",
        width: "50%",
        height: "50%",
    });
}

window.cache = {}
// We need to wrap this code into an async function, because we want to use await
const execSearch = async function()
{

    const results = await loadRestaurantsFromAPI(keyword)




    const createNewCard = (title, text, image, json) =>{
        let card = template.cloneNode(true)
        if (title) card.innerHTML = card.innerHTML.replace('$title', title)
        if (text) card.innerHTML = card.innerHTML.replace('$text', text)
        if (json) window.cache[card] = json
        if (image)
            card.innerHTML = card.innerHTML.replace('$image', "/images/thi/"+image)
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

        resultsDiv.appendChild(createNewCard(restaurant.name, restaurant.body, image, restaurant))
    })

    // remove the template

    template.remove()
}
execSearch()

window.doSearch = ()  =>
{
    let keyword = document.getElementById('searchInput').value
    window.location = '/restaurants.html?query='+encodeURIComponent(keyword)

}
