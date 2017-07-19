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
    if (slidesNext.click()) {
        return;
    }
    setInterval(arrowNext(), 2900);
    setTimeout(() => {
        autoPlay();
    }, 3000);
}

// autoPlay();


// Baemin Menus
function transePosition(wrapper, direction) {
    if (direction === 'next') {
        wrapper.style.transition = 'ease 1s'
        const firstNode = wrapper.children[0]
        console.log(wrapper.style.transform.value)
        let nowPosition = Number(wrapper.style.transform.replace(
            'translate(', '').replace('px)', '')
        )
        const newPosition = nowPosition - 215
        setTimeout(function () {
            const animate = () => {
                if (nowPosition===newPosition) return false
                wrapper.style.transform = `translate(${nowPosition}px)`
                nowPosition -= 1
                animate();
            }
            animate()
        }, 5)
        wrapper.appendChild(firstNode)

    } else if (direction === 'before') {
        const menuItems = document.getElementsByClassName('carousel-menu')
        const lastMenu = menuItems[menuItems.length - 1]
        const parentNode = lastMenu.parentNode
        parentNode.insertBefore(lastMenu, menuItems[0])
    }
}

function nextMenu() {
    const carouselInnerWrapper = document.querySelector('.carousel-inner-wrapper')
    transePosition(carouselInnerWrapper, 'next')
}

function beforeMenu() {
    const carouselInnerWrapper = document.querySelector('.carousel-inner-wrapper')
    transePosition(carouselInnerWrapper, 'before')
}

document.querySelector('.carousel-left-btn').addEventListener(
    'click', beforeMenu
)
document.querySelector('.carousel-right-btn').addEventListener(
    'click', nextMenu
)
