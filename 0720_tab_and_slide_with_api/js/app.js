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
            return false
        }
        setInterval(this.arrowNext(), 2900);
        setTimeout(() => {
            this.autoPlay()
        }, 3000)
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
        this.hiddenModal = document.querySelector('#hiddenModal')
        this.apiBaseUrl = 'http://52.78.212.27:8080'
        this.title = ''
        this.getTemplate = fetch('/templates/carouselContent.html').then(resp => {
            return resp.text()
        })
        this.getModalTemplate = fetch('/templates/menuDetail.html').then(resp => {
            return resp.text()
        })
        this.renderTemplate = (el, data) => {
            this.getTemplate.then(template => {
                const rendered = Mustache.render(template, data)
                el.innerHTML = rendered
            })
        }
        this.renderModal = (el, data) => {
            this.getModalTemplate.then(template => {
                data['title'] = this.title

                const hash = data.hash
                const rendered = Mustache.render(template, data)
                el.innerHTML = rendered

                const modal = document.getElementById(`modal_${hash}`)
                const closeBtn = document.querySelector('span.close')
                modal.style.display = 'block'
                closeBtn.addEventListener('click', function () {
                    modal.style.display = 'none'
                })
                window.onclick = function (e) {
                    if (e.target === modal) {
                        modal.style.display = 'none'
                    }
                }
            })
        }
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

    // Modal for each menu
    getData(type, hash, el, func) {
        if (hash) {
            fetch(this.apiBaseUrl + `/woowa/${type}/${hash}`).then(function (res) {
                return res.json()
            }).then(json => {
                func(el, json)
            })
        } else {
            fetch(this.apiBaseUrl + `/woowa/${type}`)
        }
    }

    registerEvent() {
        this.leftBtn.addEventListener(
            'click', _.throttle(this.beforeMenu.bind(this), 1200)
        )
        this.rightBtn.addEventListener(
            'click', _.throttle(this.nextMenu.bind(this), 1200)
        )
    }
}


class Tab {
    constructor() {
        this.title = ''
        this.apiBaseUrl = 'http://52.78.212.27:8080'
        this.getTemplate = fetch('/templates/tabContent.html').then(resp => {
            return resp.text()
        })
        this.getModalTemplate = fetch('/templates/menuDetail.html').then(resp => {
            return resp.text()
        })
        this.hiddenModal = document.querySelector('#hiddenModal')
        this.renderTemplate = (el, data) => {
            this.getTemplate.then(template => {
                const rendered = Mustache.render(template, data)
                el.innerHTML = rendered
            })
        }
        this.renderModal = (el, data) => {
            this.getModalTemplate.then(template => {
                data['title'] = this.title

                const hash = data.hash
                const rendered = Mustache.render(template, data)
                el.innerHTML = rendered

                const modal = document.getElementById(`modal_${hash}`)
                const closeBtn = document.querySelector('span.close')
                modal.style.display = 'block'
                closeBtn.addEventListener('click', function () {
                    modal.style.display = 'none'
                })
                window.onclick = function (e) {
                    if (e.target === modal) {
                        modal.style.display = 'none'
                    }
                }
            })
        }
    }

    getData(type, hash, el, func) {
        if (hash) {
            fetch(this.apiBaseUrl + `/woowa/${type}/${hash}`).then(function (res) {
                return res.json()
            }).then(json => {
                func(el, json)
            })
        } else {
            fetch(this.apiBaseUrl + `/woowa/${type}`)
        }
    }

    clickTabListener(e, target) {
        if (!target) target = e.target
        if (!target.matches('li')) {
            return false
        }
        const tabVisible = document.querySelector('.tab-visible')
        const tabGoodsWrapper = document.querySelector('#tabGoodsWrapper')
        const categoryId = target.dataset.categoryid

        tabVisible.classList.remove('tab-visible')
        target.classList.add('tab-visible')

        this.getData('best', categoryId, tabGoodsWrapper, this.renderTemplate)
    }

    clickModalListener (e) {
        const target = e.target.closest('div.tab-goods')
        const hash = target.dataset.hash

        this.title = target.querySelector('.menu__title').innerText

        this.getData('detail', hash, this.hiddenModal, this.renderModal)
    }

    registerEvent() {
        const tabNav = document.querySelector('.tab-nav')
        const tabGoodsWrapper = document.querySelector('#tabGoodsWrapper')

        tabNav.addEventListener('click', e => {
            this.clickTabListener(e)
        })
        tabGoodsWrapper.addEventListener('click', e => {
            this.clickModalListener(e)
        })
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const slide = new Slide()
    const carousel = new Carousel(3)
    const tab = new Tab()

    slide.registerEvent()
    //slide.autoPlay()

    carousel.registerEvent()

    tab.registerEvent()
    const tabVisible = document.querySelector('.tab-visible')
    tab.clickTabListener(null, tabVisible)
})
