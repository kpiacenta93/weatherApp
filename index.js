
    function updateWeatherDetails(data) {
        const temperature = data.main.temp; 
        const description = data.weather[0].description;
    
       
        document.getElementById("temperature").textContent = `Temperature: ${celsiusToFahrenheit(temperature).toFixed(2)} °F`;
        document.getElementById("condition").textContent = `Condition: ${description}`;
    }
    

    document.addEventListener('DOMContentLoaded', () => {

        
        const localButton = document.getElementById('buttonOne');
        localButton.addEventListener('click', getUserLocation)

        
        const manualInputbutton = document.getElementById('buttonTwo');
        manualInputbutton.addEventListener('click', () => {
            // Example latitude and longitude values, replace with actual user input if needed
            let lat = document.getElementById('latitude').value;  
            let lon = document.getElementById('longitude').value; ;
            fetchWeather(lat, lon);


        });
    });
    
    function fetchWeather(lat, lon) {
        const API_KEY = '5e0933b5c53d710d7419bc9951ef63e9';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network is all jacked up');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherDetails(data);
            })
            .catch(error => {
                console.log('ya pal you are Fd ' + error);
            });
    }
    
    function getUserLocation() {
        // Check if Geolocation is supported
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
    
                // Now you have the user's location, you can use it to fetch weather data
                fetchWeather(lat, lon);
            }, function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    

    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    