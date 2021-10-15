const resultsDiv = document.getElementById('rest_results');
const template = resultsDiv.firstElementChild;

const createNewCard = (title, text, image) =>{
    let card = template.cloneNode(true)
    if (title) card.innerHTML = card.innerHTML.replace('$title', title)
    if (text) card.innerHTML = card.innerHTML.replace('$text', text)
    if (image) card.innerHTML = card.innerHTML.replace('$image', image)
    return card
}   

const results = JSON.parse(window.localStorage.getItem('restaurants_crab'));

results.forEach((restaurant, index) =>
{    
    resultsDiv.appendChild(createNewCard(restaurant.name, restaurant.description + restaurant.body)) 
})

// remove the template

template.remove()
