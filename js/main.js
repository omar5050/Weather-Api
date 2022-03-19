// select elements
let btnSearch = document.getElementById('btn-search');
let days = document.getElementById('days');
let monthcurrent= document.getElementById('month')
let dateCurrent = document.getElementById('date') 
// cuurent select
let locationCurrent = document.getElementById('location-current')
let tempCurrent = document.getElementById('temp-current');
let iconCurrent = document.getElementById('icon-current')
let climate = document.getElementById('climate-current')

// forecast one select
let daysForecastOne = document.getElementById('days-forecast1');
let iconForecastOne = document.getElementById('icon-forecast-one');
let tempForecastOne = document.getElementById('temp-forecast-one')
let climateForecastOne = document.getElementById('climate-forecast-one');

// forecast two select
let daysForecastTwo = document.getElementById('days-forecast-two');
let iconForecastTwo = document.getElementById('icon-forecast-two');
let tempForecastTwo = document.getElementById('temp-forecast-two')
let climateForecastTwo = document.getElementById('climate-forecast-two');

// Get weeK Day
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Get Months
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


 


let error = document.getElementById('error')





// Api object
let api = {
    baseUrl: "http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London&days=3",
    key: '4b8af80da7ed453aaa0204013221301',
};

    
// getWeather
   async function getWeather(query){
       
        let myWeather =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api.key}&q=${query}&days=3&lang=ar`)
        let finalWeather = await myWeather.json()
        console.log(finalWeather)
       return finalWeather
     }
            

   


// display Current
async function displayCurrent(location)
{
    
        let weatherCurrent = await getWeather(location);
        if(weatherCurrent.error!=null)
        {
            alert(weatherCurrent.error.message);
        }
        else{
            let d= new Date();
            let m = new Date()
            let getDate = new Date()
            let getDay = weekday[d.getDay()];
            let getMonth = month[m.getMonth()]
            
            days.innerHTML = getDay;
            monthcurrent.innerHTML = getMonth;
            dateCurrent.innerHTML = getDate.getDate()
            locationCurrent.innerHTML = weatherCurrent.location.name;
            tempCurrent.innerHTML = weatherCurrent.current.temp_c + `<sup>o</sup>c`;
            iconCurrent.setAttribute('src', weatherCurrent.current.condition.icon); 
            climate.innerHTML = weatherCurrent.current.condition.text;
            
            await displayForecastOne(location);
            await displayForecastTwo(location);
        }
        
    
}


// display forecast one
async function displayForecastOne(location)
{
    let weatherCurrent = await getWeather(location);
    let d= new Date(weatherCurrent.forecast.forecastday[1].date);
    let getDay = weekday[d.getDay()];
    daysForecastOne.innerHTML = getDay;
    iconForecastOne.setAttribute('src', weatherCurrent.forecast.forecastday[1].day.condition.icon);
    tempForecastOne.innerHTML =  weatherCurrent.forecast.forecastday[1].day.maxtemp_c;
    climateForecastOne.innerHTML = weatherCurrent.forecast.forecastday[1].day.condition.text;
}


// display forecast two
async function displayForecastTwo(location)
{
    let weatherCurrent = await getWeather(location);
    let d= new Date(weatherCurrent.forecast.forecastday[2].date);
    let getDay = weekday[d.getDay()];
    daysForecastTwo.innerHTML = getDay;
    iconForecastTwo.setAttribute('src', weatherCurrent.forecast.forecastday[2].day.condition.icon);
    tempForecastTwo.innerHTML = weatherCurrent.forecast.forecastday[2].day.maxtemp_c;
    climateForecastTwo.innerHTML = weatherCurrent.forecast.forecastday[2].day.condition.text;
}




if(btnSearch.value == ''){
    displayCurrent('cairo')
}

// Start program by search
btnSearch.addEventListener('keyup', function(){
    if(this.value.length > 2)
    {
        displayCurrent(this.value)
    }
    
   
  
})



