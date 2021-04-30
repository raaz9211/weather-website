
const fetchWeather = (location) =>
{
    fetch(`http://localhost:3000/weather?address=${location}`).then((reponse)=>{
        reponse.json().then((data)=>{
            if(data.error)
                messaheOne.textContent =  data.error
            else
            {
                messaheOne.textContent = data.location
                messaheTwo.textContent = data.forecast
            }

        })
    })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messaheOne = document.querySelector('#message-1')
const messaheTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messaheOne.textContent = 'Loading.....'
    messaheTwo.textContent = ''
    const location = search.value
    fetchWeather(location)


})