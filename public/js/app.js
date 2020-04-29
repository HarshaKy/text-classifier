


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault()

	const predict = search.value

	fetch(`/api/sentiment?predict=${predict}`)
})