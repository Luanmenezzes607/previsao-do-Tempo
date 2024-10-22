document.querySelector('.btn-search').addEventListener('click', async (event)=>{
    event.preventDefault();

    const cityName = document.querySelector('#city').value;

    if(!cityName){
        return showAlert('<i class="fa-solid fa-triangle-exclamation"></i> Digite o nome da cidade!')

    }

    const apiKey = '18cc3d38f562e4e26f02b7a6a20cca52'
    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const response = await fetch(urlAPI)
    const json = await response.json()

    console.log(json)

    if(json.cod == 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            humidity: json.main.humidity,
            wind: json.wind.speed,
            description: json.weather[0].description,
            icon: json.weather[0].icon
        })
    }else{
        showAlert(`<i class="fa-solid fa-triangle-exclamation"></i> Não foi possivel localizar!
            <img src="img/erro.svg"/>`)
    }

})

function showInfo(json){
    showAlert('')

    document.querySelector('.info').classList.add('show')
    document.querySelector('.title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#img').setAttribute('src', `https:/openweathermap.org/img/wn/${json.icon}@2x.png`)
    document.querySelector('#temperature').innerHTML = `${Math.floor(json.temp)}ºC`
    document.querySelector('#description').innerHTML = json.description
    document.querySelector('#temp-max').innerHTML = `${Math.floor(json.tempMax)}ºC`
    document.querySelector('#temp-min').innerHTML = `${Math.floor(json.tempMin)}ºC`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#wind').innerHTML = `${json.wind}km/h`
}

function showAlert(mensagem){

    document.querySelector('.alert').innerHTML = mensagem
    document.querySelector('.info').classList.remove('show')
}

