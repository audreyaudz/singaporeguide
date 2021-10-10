import '@fortawesome/fontawesome-free/css/all.css';
import "winbox/dist/winbox.bundle.js"
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
    


window.addEventListener('DOMContentLoaded', (event) => {
    if (!window.forecastData)
    {
        fetch("https://api.data.gov.sg/v1//environment/2-hour-weather-forecast")
        .then( response => response.json())
        .then ( data => {
            const ele = document.getElementById("forecast");
            
            ele.innerHTML = (data.items[0].forecasts.find((f) => f.area === 'City')['forecast'])
            }
         )
    }
    
    
    
})