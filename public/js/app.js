
const fetchWeather = (location) =>
{
    fetch(`/weather?address=${location}`).then((reponse)=>{
        reponse.json().then((data)=>{
            if(data.error)
                messaheOne.textContent =  data.error
            else
            {
                messaheOne.textContent = data.location
                messaheTwo.textContent = data.forecast
                messaheThree.textContent = data.temp
                messaheFour.textContent = data.humidity
            }

        })
    })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messaheOne = document.querySelector('#message-1')
const messaheTwo = document.querySelector('#message-2')
const messaheThree = document.querySelector('#message-3')
const messaheFour = document.querySelector('#message-4')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messaheOne.textContent = 'Loading.....'
    messaheTwo.textContent = ''
    messaheThree.textContent = ''
    messaheFour.textContent = ''
    const location = search.value
    fetchWeather(location)


})