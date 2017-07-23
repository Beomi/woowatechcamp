class Slide {
    constructor() {
        this.slidesPagination = document.querySelector('.slides_pagination')
        this.slidesPrev = document.querySelector('.slides_prev')
        this.slidesNext = document.querySelector('.slides_next')
    }

    arrowNext() {
        const oldLI = document.querySelector(".selected")
        const siblingElements = oldLI.parentElement.children
        const childElementCountIndex = siblingElements.length
        let newLI
        if (oldLI.className.replace('s', '').replace('selected', '') >= childElementCountIndex) {
            newLI = siblingElements[0]
        } else {
            newLI = oldLI.nextElementSibling
        }
        this.fadeInOutWrapper(newLI, oldLI)
    }

    fadeInOut(newLI, oldLI) {
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

    fadeInOutWrapper(newLI, oldLI) {
        newLI.style.display = ''
        oldLI.style.display = ''
        oldLI.style.zIndex = 0
        newLI.style.opacity = 0
        this.fadeInOut(newLI, oldLI)
        oldLI.style.opacity = 0
        newLI.style.zIndex = 50
        oldLI.classList.remove('selected')
        newLI.classList.add('selected')
    }

    autoPlay(a) {
        if (this.slidesNext.click()) {
            return;
        }
        setInterval(this.arrowNext(), 2900);
        setTimeout(() => {
            this.autoPlay();
        }, 3000);
    }

    registerEvent() {
        this.slidesPagination.addEventListener('click', function (e) {
            const targetId = Number(e.target.textContent) + 1
            const oldLI = document.querySelector(".selected")
            const newLI = document.querySelector(`.s${targetId}`)

            if (oldLI === newLI) return false
            this.fadeInOutWrapper(newLI, oldLI)
        })

        this.slidesPrev.addEventListener('click', () => {
            const oldLI = document.querySelector(".selected")
            const childElementCount = oldLI.parentElement.children
            let newLI
            if (oldLI.className.replace('s', '').replace('selected', '') <= 1) {
                newLI = childElementCount[childElementCount.length - 1]
            } else {
                newLI = oldLI.previousElementSibling
            }
            this.fadeInOutWrapper(newLI, oldLI)
        })

        this.slidesNext.addEventListener('click', this.arrowNext.bind(this))
    }

}


class Carousel {
    constructor(carouselCount) {
        this.carouselCount = carouselCount
        this.leftBtn = document.querySelector('.carousel-left-btn')
        this.rightBtn = document.querySelector('.carousel-right-btn')
    }

    transePosition(wrapper, direction, moveCount) {
        if (direction === 'next') {
            const animationPixel = 215 * moveCount
            const innerWrapper = wrapper.children[0]
            const wrapperClone = wrapper.cloneNode(true)
            const innerWrapperClone = wrapperClone.children[0]

            // animation
            innerWrapper.style.transform = `translateX(-${animationPixel}px)`
            // dom update
            innerWrapper.addEventListener('transitionend', function () {
                for (let i = 0; i < moveCount; i++) {
                    const firstCloneNode = innerWrapperClone.children[0]
                    innerWrapperClone.appendChild(firstCloneNode)
                }
                wrapper.innerHTML = wrapperClone.innerHTML
            })

        } else if (direction === 'before') {
            // TODO: Update before logic
        }
    }

    nextMenu() {
        const carouselWrapper = document.querySelector('.carousel-wrapper')
        this.transePosition(carouselWrapper, 'next', this.carouselCount)
    }

    beforeMenu() {
        const carouselWrapper = document.querySelector('.carousel-wrapper')
        this.transePosition(carouselWrapper, 'before', this.carouselCount)
    }

    registerEvent() {
        this.leftBtn.addEventListener(
            'click', this.beforeMenu.bind(this)
        )
        this.rightBtn.addEventListener(
            'click', this.nextMenu.bind(this)
        )
    }
}


class Tab {
    constructor() {
        this.template = function () {
            fetch('/templates/tabContent.html').then(function (response) {
                return response.querySelector('#tabContent').innerHTML
            })
        }
        this.apiBaseUrl = 'http://52.78.212.27:8080'
    }

    getData(type, hash) {
        if (hash) {
            fetch(this.apiBaseUrl + `/woowa/${type}/${hash}`)
        } else {
            fetch(this.apiBaseUrl + `/woowa/${type}`)
        }
    }

    renderTemplate(data) {

    }

    updateDocument() {

    }

    registerEvent() {

    }
}


document.addEventListener('DOMContentLoaded', function () {
    const slide = new Slide()
    const carousel = new Carousel(3)
    const tab = new Tab()

    slide.registerEvent()
    slide.autoPlay()

    carousel.registerEvent()

    tab.registerEvent()
})
