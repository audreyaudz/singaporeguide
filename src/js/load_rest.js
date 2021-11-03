import loadRestaurantsFromAPI from './restaurants.js';
import loadAttractionsFromAPI from './attractions.js';
import loadAccommodationsFromAPI from './accommodations.js';
import '@fortawesome/fontawesome-free/css/all.css';
import "winbox/dist/winbox.bundle.js";
import {default as getProp} from 'mout/object/get';


const restResultsDiv = document.getElementById('rest_results');
const accoResultsDiv = document.getElementById('acco_results');
const attrResultsDiv = document.getElementById('attr_results');

const detailDiv =  document.getElementById('rest_details');
const template = document.getElementById('template').firstElementChild;
const detailTemplate = detailDiv.firstElementChild;

// get the API key from the browser storage
const apikey = window.localStorage.getItem('api_key')

// extract the keywords we are searching for from the browser's url bar
const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get('query'); // specifically, we are looking at the ?query= part of the url, because that's the keyword
// const type = urlParams.get('type') ?? 'restaurant'

window.restCardWrap = function(type, index){    
    
    let json = window.cache[type+index]

    console.log(json)

    const detailCard = detailTemplate.cloneNode(true)

    const html = detailCard.innerHTML
    const regExp = /(\$[a-z\.]+)/gi        

    const matches = html.match(regExp)
    matches.forEach((m) => 
    {
        if (m == '$json')
        {
            detailCard.innerHTML =  detailCard.innerHTML.replace('$json', JSON.stringify(json, null, 2) )
        }
        else if (m == '$image')
        {
            if (json.images[0] != null && json.images[0].uuid != null && json.images[0].uuid.length > 0)
            {            
                detailCard.innerHTML = detailCard.innerHTML.replace('$image', "/images/thi/"+json.images[0].uuid)
            }
            else if (json.images[0] != null && json.images[0].url != null  && json.images[0].url.length > 0)
            {
                detailCard.innerHTML = detailCard.innerHTML.replace('$image', json.images[0].url)
            }
            else
            {
                detailCard.innerHTML = detailCard.innerHTML.replace('$image', './images/no_image.jpg')                
            }
        }
        else
        {
            detailCard.innerHTML = detailCard.innerHTML.replace(m, getProp(json, m.substring(1)) ?? '')
        }
    }
    );

    new WinBox({
            title: json.name,
            html: detailCard.innerHTML,
            //modal: true,
            class: "my-theme",
            border: 4,
            x: "center",
            y: 100,
            width: 800,
            height: 800,
        });
}

window.cache = {}
// We need to wrap this code into an async function, because we want to use await
const searchByType = async function(type, resultsDiv)
{

    let results = []
    if (type === 'restaurant')
    {
        results = await loadRestaurantsFromAPI(keyword)
    }
    else if ( type === 'accommodation')
    {
        results = await loadAccommodationsFromAPI(keyword)
    }
    else
    {
        results = await loadAttractionsFromAPI(keyword)
    }
        
    const createNewCard = (id, title, text, image, json, _type) =>{
        let card = template.cloneNode(true)
        card.innerHTML = card.innerHTML.replace('$index', id)
        if (title) card.innerHTML = card.innerHTML.replace('$title', title)
        if (text) card.innerHTML = card.innerHTML.replace('$text', text)
        if (_type) card.innerHTML = card.innerHTML.replace('$_type', _type)
        if (json && json.type) card.innerHTML = card.innerHTML.replace('$type', json.type)
        if (json) window.cache[type+id] = json        
        if (image) // image by uuid
        {
            card.innerHTML = card.innerHTML.replace('$image', "/images/thi/"+image)
        }
        else
            // image by url
            if (json.images.length > 0 && json.images[0].url.length > 0)
            {
                card.innerHTML = card.innerHTML.replace('$image', json.images[0].url)
            }
            else // no image
            {
                card.innerHTML = card.innerHTML.replace('$image', './images/no_image.jpg')
            }
            
        return card
    }


    // let resultsDiv = restResultsDiv
    //f (type === 'accommodation') { resultsDiv = accoResultsDiv }
    //if (type === 'attraction') { resultsDiv = attrResultsDiv }



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

        resultsDiv.appendChild(createNewCard(index, restaurant.name, restaurant.body, image, restaurant, type))
    })
}

const execSearch = async function()
{
    
    try{await searchByType("restaurant", restResultsDiv)} catch (ex) { console.warn(ex)}        
    try{await searchByType("attraction", attrResultsDiv)} catch (ex) { console.warn(ex)}        
    try{await searchByType("accommodation", accoResultsDiv)} catch (ex) { console.warn(ex)}        
    
    template.remove()
}


execSearch()


window.doSearch = ()  =>
{
    let keyword = document.getElementById('searchInput').value
    window.location = '/search.html?query='+encodeURIComponent(keyword)

}
