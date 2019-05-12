console.log('Client side js file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //Prevent auto page refresh when form is submitted
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const query = search.value
    fetch ('/weather?address=' + query).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Forcast: ' + data.forcast    
            }
        })
    })

})