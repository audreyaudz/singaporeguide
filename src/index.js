import '@fortawesome/fontawesome-free/css/all.css';
import "winbox/dist/winbox.bundle.js";
import '/css/weather.css';
import updateWeatherPanel from './js/weather';
import renderRestaurants from './js/restaurants';
//#import "bootstrap/dist/js/bootstrap.esm.min.js"
//import "bootstrap/dist/css/bootstrap.min.css"

window.openContactForm = function(){
    new WinBox(
    {
        title: "Subscribe",
        mount: document.getElementById('contact'),
        modal: true,
        x: "center",
        y: 10,
        width: "50%",
        height: 850
    });
}
    
window.openWebsiteInWinbox = function(url)
{
    new WinBox(
        {        
            url: url,
            x: "center",
            y: 10,
            width: "50%",
            height: 850
        });
}



window.addEventListener('DOMContentLoaded', (event) => {
    updateWeatherPanel();

})

window.doSearch = ()  =>
{
    let keyword = document.getElementById('searchInput').value    
    renderRestaurants(keyword)
  
}