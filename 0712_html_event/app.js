document.addEventListener('DOMContentLoaded', function() {
	const el = document.getElementById('toggler')
	el.addEventListener('click', function(e) {
		const openMe = document.querySelectorAll('span')
		const box = document.querySelector('.box')
		for (const span of openMe) {
			span.classList.toggle('hidden')
		}
		box.classList.toggle('hidden')
	})
})