function GetInfo() {
    // Get the city input value
    const cityInput = document.getElementById('cityInput').value;
 
    // Get the existing city names from local storage
    const cityNames = JSON.parse(localStorage.getItem('cityNames')) || [];
 
    // Add the new city name to the array
    cityNames.push(cityInput);
 
    // Save to local storage
    localStorage.setItem('cityNames', JSON.stringify(cityNames));
 
    // Create a new list item element
    const listItem = document.createElement('li');
    listItem.textContent = cityInput;
 
    // Append the new list item to the city list
    const cityName = document.getElementById('cityName');
    cityName.appendChild(listItem);
 
    // Fetch weather data
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid=76e07bf0b0df9f55250ca6bea769c110')
    .then(response => response.json())
    .then(data => {
        // Getting the min and max values for each day
        for(let i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp - 288.65).toFixed(1)+ "°F";
            document.getElementById("day" + (i+1) + "Wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed - 1.95).toFixed(2) + "MPH";
            document.getElementById("day" + (i+1) + "Humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity - 57).toFixed(2) + "%";
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +".png";
        }
        console.log(data)
    })
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"))
}
 
function loadCityNames() {
    // Get the city names from local storage
    const cityNames = JSON.parse(localStorage.getItem('cityNames')) || [];
 
    // Display each city name
    const cityName = document.getElementById('cityName');
    cityName.innerHTML = '';
    for(let i = 0; i < cityNames.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = cityNames[i];
        cityName.appendChild(listItem);
    }
}
 
// Call the function when the page loads
window.onload = loadCityNames;
 
function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}
 
// Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
 
// Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}
 
for(let i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}

