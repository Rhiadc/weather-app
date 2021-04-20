console.log('Client side javascript file is loaded')

const urlAPI = '/weather?address='
const btnSubmit = document.querySelector('form')
const inputValue = document.querySelector('input')
//par partemp weat wind prec humi time
const allP = document.querySelectorAll('p')

btnSubmit.addEventListener('submit', e =>{
    e.preventDefault()
    allP[0].innerText = 'Loading...'
    for(let i = 1; i<allP.length-1; i++){
        allP[i].innerHTML = ''
    }
    locationValue = inputValue.value
    inputValue.value = ''
    
        fetch(urlAPI + locationValue)
        .then(response =>{
            response.json()
            .then(data=>{
                if(data.error){
                    cidadeEstado.innerText = 'Sorry,'
                    temperatura.innerText =  data.error
                }else{
                    allP[0].innerHTML = `<strong>Local</strong>: ${data.location}`
                    allP[1].innerHTML = `<strong>Temperatura</strong>: ${data.temperature}°c`
                    allP[2].innerHTML = `<strong>Descrição do tempo: </strong>${data.weather_descriptions}`
                    allP[3].innerHTML = `<strong>Hora de observação: </strong>${data.observation_time}`
                    allP[4].innerHTML = `<strong>Velocidade do vento: </strong>${data.wind_speed}m/s`
                    allP[5].innerHTML = `<strong>Precipitação: </strong>${data.precip}mm`
                    allP[6].innerHTML = `<strong>Humidade: </strong>${data.humidity}%`
                    
                }
            })
        })
        .catch(err => console.log(`Caught by .catch ${err}`))
})