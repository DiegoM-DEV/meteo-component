export function fetchWeather(latitude, longitude, setState){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5690ef99910e086b7e82a1a40073aeae&units=metric`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { main, weather } = data;
          const { humidity, temp } = main;
          const weath = weather[0].main;

          const weatherObject = {
            humidity: humidity,
            temp: temp,
            weather: weath,
          };
  
          setState({
            weather: weatherObject,
            loading: true,
          });
        });
}