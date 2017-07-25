class Slider {
    constructor (sliderWrapper) {
        this.sliderWrapper = sliderWrapper
        this.firstXPosition = 0
        this.currentWrapperPosition = 0
        this.setEventListener()
    }

    setFirstXPosition (xPosition) {
        this.firstXPosition = xPosition
        this.startTime = new Date().getTime()
    }

    getDistance(xPosition) {
        return xPosition - this.firstXPosition
    }

    getUptime() {
        return (new Date().getTime() - this.startTime) / 1000
    }

    getVelocity(xPosition) {
        const uptime = this.getUptime()
        const movingPosition = this.getDistance(xPosition)
        return movingPosition / uptime
    }

    moveSliderWrapper(movingPixel) {
        this.sliderWrapper.style.transform = `translateX(${movingPixel}px)`
    }

    setEventListener() {
        this.sliderWrapper.addEventListener('touchstart', e => {
            this.sliderWrapper.style.transition = null
            const newPosition = this.currentWrapperPosition + this.getDistance(e.changedTouches[0].pageX)
            this.setFirstXPosition(newPosition)
        })
        this.sliderWrapper.addEventListener('touchmove', e => {
            const newPixel = e.changedTouches[0].pageX
            this.moveSliderWrapper(this.getDistance(newPixel))
        })
        this.sliderWrapper.addEventListener('touchend', e => {
            // TODO: Velocity ease time
            const windowWidth = parseInt(window.innerWidth)
            const distance = this.getDistance(e.changedTouches[0].pageX)
            this.sliderWrapper.style.transition = 'ease 1s'

            console.log(distance)
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

const slider = new Slider(document.querySelector('#sliderWrapper'))