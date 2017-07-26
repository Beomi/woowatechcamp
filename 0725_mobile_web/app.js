class Slider {
    constructor (viewPort, sliderWrapper) {
        this.viewPort = viewPort
        this.sliderWrapper = sliderWrapper
        this.firstXPosition = 0
        this.currentWrapperPosition = 0
        this.setEventListener()
    }

    setFirstXPosition (xPosition) {
        this.firstXPosition = xPosition
    }

    getDistance(xPosition) {
        return xPosition - this.firstXPosition
    }

    moveSliderWrapper(movingPixel) {
        if (movingPixel > 0) {
            return false
        }
        this.sliderWrapper.style.transform = `translateX(${movingPixel}px)`
    }

    setEventListener() {
        this.viewPort.addEventListener('touchstart', e => {
            e.preventDefault()
            this.sliderWrapper.style.transition = null
            this.currentWrapperPosition = 0 || Number(this.sliderWrapper.style.transform.replace('translateX(', '').replace('px)', ''))
            const newPosition = e.changedTouches[0].screenX
            this.setFirstXPosition(newPosition)
        })
        this.viewPort.addEventListener('touchmove', e => {
            e.preventDefault()
            const newPixel = e.changedTouches[0].screenX
            console.log(this.currentWrapperPosition + this.getDistance(newPixel))
            this.moveSliderWrapper(
                this.currentWrapperPosition + this.getDistance(newPixel)
            )
        })
        this.viewPort.addEventListener('touchend', e => {
            const windowWidth = parseInt(window.innerWidth)
            const distance = this.getDistance(e.changedTouches[0].screenX)
            this.sliderWrapper.style.transition = 'ease 1s'

            if ((Math.abs(distance)) > (windowWidth / 5)) {
                if (distance < 0) {
                    this.currentWrapperPosition = this.currentWrapperPosition - windowWidth
                } else if (distance > 0) {
                    this.currentWrapperPosition = this.currentWrapperPosition + windowWidth
                } else {
                    return;
                }
                this.sliderWrapper.style.transform = `translateX(${this.currentWrapperPosition}px)`
            } else {
                this.sliderWrapper.style.transform = `translateX(${this.currentWrapperPosition}px)`
            }
        })
    }
}

const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))