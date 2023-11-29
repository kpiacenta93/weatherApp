
    function updateWeatherDetails(data) {
        const temperature = data.main.temp; 
        const description = data.weather[0].description;
        const wind = data.wind.speed
        const area = data.name
    
       
        document.getElementById("temperature").textContent = `Temperature: ${temperature} °F`;
        document.getElementById("condition").textContent = `Condition: ${description}`;
        document.getElementById("wind").textContent = `wind MPH:  ${wind}`;
        document.getElementById("area").textContent = `Your Location: ${area}`
    }
    

    document.addEventListener('DOMContentLoaded', () => {

        
        const localButton = document.getElementById('buttonOne');
        localButton.addEventListener('click', getUserLocation)

        
        const manualInputbutton = document.getElementById('buttonTwo');
        manualInputbutton.addEventListener('click', () => {
        
            let lat = document.getElementById('latitude').value;  
            let lon = document.getElementById('longitude').value; ;
            fetchWeather(lat, lon);


        });
    });
    
    function fetchWeather(lat, lon) {
        const API_KEY = '5e0933b5c53d710d7419bc9951ef63e9';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    
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
       
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
    
                
                fetchWeather(lat, lon);
            }, function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    


 
    