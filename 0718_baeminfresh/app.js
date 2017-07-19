const slidesPagination = document.querySelector('.slides_pagination')
const slidesPrev = document.querySelector('.slides_prev')
const slidesNext = document.querySelector('.slides_next')


slidesPagination.addEventListener('click', function (e) {
    const targetId = Number(e.target.textContent) + 1
    const oldLI = document.querySelector(".selected")
    const newLI = document.querySelector(`.s${targetId}`)

    if (oldLI === newLI) return false
    fadeInOutWrapper(newLI, oldLI)
})

slidesPrev.addEventListener('click', function () {
    const oldLI = document.querySelector(".selected")
    const childElementCount = oldLI.parentElement.children
    let newLI
    if (oldLI.className.replace('s', '').replace('selected', '') <= 1) {
        newLI = childElementCount[childElementCount.length - 1]
    } else {
        newLI = oldLI.previousElementSibling
    }
    fadeInOutWrapper(newLI, oldLI)
})

slidesNext.addEventListener('click', arrowNext);

function arrowNext() {
    const oldLI = document.querySelector(".selected")
    const siblingElements = oldLI.parentElement.children
    const childElementCountIndex = siblingElements.length
    let newLI
    if (oldLI.className.replace('s', '').replace('selected', '') >= childElementCountIndex) {
        newLI = siblingElements[0]
    } else {
        newLI = oldLI.nextElementSibling
    }
    fadeInOutWrapper(newLI, oldLI)
}

function fadeInOut(newLI, oldLI) {
    (function fade() {
        if (parseFloat(newLI.style.opacity) <= 1) {
            newLI.style.opacity = parseFloat(newLI.style.opacity) + 0.05
        }
        if (parseFloat(oldLI.style.opacity) >= 0) {
            oldLI.style.opacity = parseFloat(oldLI.style.opacity) - 0.05
        }
        requestAnimationFrame(fade)
    })()
}

function fadeInOutWrapper(newLI, oldLI) {
    newLI.style.display = ''
    oldLI.style.display = ''
    oldLI.style.zIndex = 0
    newLI.style.opacity = 0
    fadeInOut(newLI, oldLI)
    oldLI.style.opacity = 0
    newLI.style.zIndex = 50
    oldLI.classList.remove('selected')
    newLI.classList.add('selected')
}

function autoPlay(a) {
    if (slidesNext.click()){
        return;
    }
        setInterval(arrowNext(), 2900);
        setTimeout(() => {
            autoPlay();
        }, 3000);
}

// autoPlay();


// Baemin Menus
function transePosition(element, pixel) {
    const currentPosition = element.style.transform.replace('translateX(','').replace('px)','')
    const menuUnits = element.children.length
    const lastPosition = -(860 * (menuUnits/4-1))
    let newPosition = (pixel + Number(currentPosition)) % Number(860 * menuUnits/4)
    if (newPosition > 0) {
        newPosition = lastPosition
    }
    element.style.transform = `translateX(${newPosition}px)`
}

function nextMenu() {
    const carouselInnerWrapper = document.querySelector('.carousel-inner-wrapper')
    transePosition(carouselInnerWrapper, -860)
}

function beforeMenu () {
    const carouselInnerWrapper = document.querySelector('.carousel-inner-wrapper')
    transePosition(carouselInnerWrapper, 860)
}

document.querySelector('.carousel-left-btn').addEventListener(
    'click', beforeMenu
)
document.querySelector('.carousel-right-btn').addEventListener(
    'click', nextMenu
)
