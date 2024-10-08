const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = ''
  messageTwo.textContent = ''
  const location = search.value


  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageTwo.textContent = data.location + "." + " " + data.forecast
      }
    })
  })
})