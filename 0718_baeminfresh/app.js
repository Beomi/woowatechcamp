const slidesPagination = document.querySelector('.slides_pagination')
const slidesPrev = document.querySelector('.slides_prev')
const slidesNext = document.querySelector('.slides_next')

slidesPagination.addEventListener('click', function (e) {
    const targetId = Number(e.target.textContent) + 1
    const oldLI = document.querySelector(".selected")
    const newLI = document.querySelector(`.s${targetId}`)

    if (oldLI === newLI) return false
    newLI.style.display = ''
    oldLI.style.display = ''

    oldLI.style.zIndex = 0
    newLI.style.opacity = 0
    oldLI.style.opacity = 1
    fadeInOut(newLI, oldLI)
    newLI.style.zIndex = 50
    oldLI.classList.remove('selected')
    newLI.classList.add('selected')

})

slidesPrev.addEventListener('click', function () {
    const oldLI = document.querySelector(".selected")
    const childElementCount = oldLI.parentElement.children
    let newLI
    if (oldLI.className.replace('s', '').replace('selected', '') <= 1) {
        newLI = childElementCount[childElementCount.length - 1]
        console.log(newLI)
    } else {
        newLI = oldLI.previousElementSibling
    }
    newLI.style.display = ''
    oldLI.style.display = ''

    oldLI.style.zIndex = 0
    newLI.style.opacity = 0
    oldLI.style.opacity = 1
    fadeInOut(newLI, oldLI)
    newLI.style.zIndex = 50
    oldLI.classList.remove('selected')
    newLI.classList.add('selected')
})

slidesNext.addEventListener('click', function () {
    const oldLI = document.querySelector(".selected")
    const siblingElements = oldLI.parentElement.children
    const childElementCountIndex = siblingElements.length
    let newLI
    if (oldLI.className.replace('s', '').replace('selected', '') >= childElementCountIndex) {
        newLI = siblingElements[0]
    } else {
        newLI = oldLI.nextElementSibling
    }
    newLI.style.display = ''
    oldLI.style.display = ''

    oldLI.style.zIndex = 0
    newLI.style.opacity = 0
    oldLI.style.opacity = 1
    fadeInOut(newLI, oldLI)
    newLI.style.zIndex = 50
    oldLI.classList.remove('selected')
    newLI.classList.add('selected')
})

function fadeInOut(newLI, oldLI) {
    (function fade() {
        if (newLI.style.opacity < 1) {
            newLI.style.opacity = parseFloat(newLI.style.opacity) + 0.05
        }
        if (oldLI.style.opacity > 0.2) {
            oldLI.style.opacity = parseFloat(oldLI.style.opacity) - 0.05
        }
        requestAnimationFrame(fade)
    })()
}