//  ---Function---

//weather function
let weather = {
    
    //my api key
    apiKey: "690d0147973fa3d314f9a29de2840d58",
    
    //gets weather data
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ 
            city + 
            "&units=imperial&appid=" + 
            this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
    },

    //displays weather data
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector("#city").innerText = "Weather  in " + name;
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector("#description").innerText = description;
        document.querySelector("#temp").innerText = temp + "° F"
        document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector("#wind").innerText = "Wind Speed: " + speed + "mph";
        
    },

    //gets search bar value
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//  ---Event Listeners---

//search button
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

//search enter key
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

//  ---Default City to Display Weather---

weather.fetchWeather("Detroit");
