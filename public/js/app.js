const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading screen'
    messageTwo.textContent = ''

    fetch("/weatherpage?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                // console.log("error: No data found, please provide a correct address")
            } else{
                messageOne.textContent = data.place
                messageTwo.textContent = "Current Temperature is " + data.forecast.currentTemperature + " Degrees C. It feels like " + data.forecast.feelsLike + " Degrees C."
                // console.log(data)
            }
        })
    })
    

})