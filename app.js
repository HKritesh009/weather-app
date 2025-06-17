let inp = document.querySelector("#city");
let btn = document.querySelector("button");
let api_key = "CREATE YOUR OWN KEY"; // ✅ Correct key

btn.addEventListener("click", async () => {
    let city = inp.value.trim();
    if (!city) {
        alert('Please enter a city');
        return;
    }

    let currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        let response = await fetch(currentWeatherUrl);

        if (!response.ok) {
            throw new Error("API error");
        }

        let data = await response.json();
        let Temperature = data.current.temp_c;
        let imgScaleUp =  data.current.condition.icon.replace("64x64","128x128");
        let imgiconn = "https:" + imgScaleUp;
        console.log(imgiconn);
        let cityname = data.location.name;
        let condi = data.current.condition.text;
        let state= data.location.region;
        let country = data.location.country;
        showImg(imgiconn)
        display(Temperature,cityname,state,country,condi);

    } catch (error) {
        console.log("Error occurred while fetching response", error);
        alert("Please try again, an unknown error occurred");
    }

    inp.value = "";
});

function display(tempo,cityname,state,country,cityinfo) {
    let temp = document.querySelector("#temp");
    let weatherinfo = document.querySelector("#weatherInfo");
    if (temp) {
        temp.innerHTML = `<p id="tempcolor">${tempo} °C</p>`;
    }
    const weatherHTML = `<p>${cityname}, ${state}, ${country}</p>
                         <p> <b>Lattest Condition : </b>${cityinfo}</p>`
        ;
    if (weatherinfo) {
        weatherinfo.innerHTML = weatherHTML;
    }
}


function showImg(imgurl) {
    let icon = document.querySelector("#weatherIcon");
    icon.style.display = 'block';
    icon.src=imgurl;

}
