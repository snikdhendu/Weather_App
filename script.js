const temp_sec=document.querySelector('.subdiv1 span')
const city_sec=document.querySelector('.subdiv1 p')
const state_sec=document.querySelector('.subdiv1 .region .state')
const country_sec=document.querySelector('.subdiv1 .region .country')
const date_sec=document.querySelector('.subdiv2 span')
const weather_sec=document.querySelector('.subdiv3 span')
const img_sec=document.querySelector('.subdiv3 img')
const humidity_sec=document.querySelector('.subdiv3 .weather .humidity span')
const wind_sec=document.querySelector('.subdiv3 .weather .windspeed span')
const search_field = document.querySelector('.search-city');
const search_button = document.querySelector('.search');

let target="Kolkata"
const fetchData= async () =>{
    const url=`https://api.weatherapi.com/v1/current.json?key=8d5eeaf7ea504e88aa7185807232111&q=${target}`
    const response= await fetch(url);
    const data=await response.json();
    console.log(data)


    // so here we use destructuring method so here we first access current from the data and then after that we access the temp_c from the current
    const {
        current: {
          temp_c,
          condition: { text, icon },
          wind_kph,
          humidity
        },
        location :{
            name,
            region,
            country,
            localtime 
        }
    }=data
    // update_DOM(data.current.temp_c,data.location.name) we can write also we can write by using destructuring 
    // now we can pass the actual name directly as we access the temp_c separately from the data
    update_DOM(temp_c,name,icon,text,region,country,humidity,wind_kph, localtime )
};
function update_DOM(temp,city,img,text,state,country,humidity,wind,time){
    temp_sec.innerText=temp+"°C"
    city_sec.innerText=city
    img_sec.src=img
    weather_sec.innerText=text
    state_sec.innerText=state
    country_sec.innerText=country
    humidity_sec.innerText="Humidity:"+humidity+"%"
    wind_sec.innerText="wind speed:"+wind+ "km/h"

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    date_sec.innerText =`${exactTime} - ${exactDay}  ${exactDate}`
}
fetchData(target);

// Event listener for search button
search_button.addEventListener('click', function () {
    const userInput = search_field.value;
    if (userInput.trim() !== "") {
        // Update the target city and fetch new data
        target = userInput;
        fetchData(target);
    } else {
        alert("Please enter a city name");
    }
});

function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturday";
  
      default:
        return "Don't Know";
    }
  }



  