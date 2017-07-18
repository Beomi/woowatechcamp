const slidesPagination = document.querySelector('.slides_pagination')
const slidesPrev = document.querySelector('.slides_prev')
const slidesNext = document.querySelector('.slides_next')

slidesPagination.addEventListener('click', function (e) {
    const targetId = Number(e.target.textContent) + 1
    const oldLI = document.querySelector('.main_slides_lst > li:not([style*="display: none"])')
    const newLI = document.querySelector(`.s${targetId}`)

    if (oldLI === newLI) return false

    fadeOut(oldLI)
    fadeIn(newLI)
    newLI.style.display = ''
    newLI.style.zIndex = 50
    oldLI.style.zIndex = 0
    oldLI.style.display = 'none'
})

slidesPrev.addEventListener('click', function () {
    const oldLI = document.querySelector('.main_slides_lst > li:not([style*="display: none"])')
    let newLI
    if (oldLI.className.replace('s', '') <= 1) {
        const childElementCount = oldLI.parentElement.children
        newLI = childElementCount[childElementCount.length - 1]
    } else {
        newLI = oldLI.previousElementSibling
    }

    fadeOut(oldLI)
    fadeIn(newLI)
    newLI.style.display = ''
    newLI.style.zIndex = 50
    oldLI.style.zIndex = 0
    oldLI.style.display = 'none'
})

slidesNext.addEventListener('click', function () {
    const oldLI = document.querySelector('.main_slides_lst > li:not([style*="display: none"])')
    const childElementCount = oldLI.parentElement.children
    let newLI
    if (oldLI.className.replace('s', '') >= oldLI.parentElement.children.length) {
        newLI = childElementCount[0]
    } else {
        newLI = oldLI.nextElementSibling
    }

    fadeOut(oldLI)
    fadeIn(newLI)
    newLI.style.display = ''
    newLI.style.zIndex = 50

    oldLI.style.zIndex = 0
    oldLI.style.display = 'none'
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none"
        } else {
            requestAnimationFrame(fade)
        }
    })();
}

function fadeIn(el) {
    el.style.opacity = 0;
    (function fade() {
        let val = parseFloat(el.style.opacity)
        if (!((val += .1) > 1)) {
            el.style.opacity = val
            requestAnimationFrame(fade)
        }
    })()
}