const assert = chai.assert

describe('이 두개는 같은가', function () {
    it('같음 ㅇㅇ', function () {
        assert.equal(true, true)
    })
})

describe('setFirstXPosition Test', function () {
    it('firstXPosition be arg: xPosition', function () {
        const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
        const newXPosition = 500

        slider.setFirstXPosition(newXPosition)
        const slider_firstXPosition = slider.firstXPosition

        assert.equal(500, slider_firstXPosition)
    })
})

describe('getDistance Test', function () {
    it('getDistance be arg: xPosition', function () {
        const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
        const newXPosition = 300
        const result = newXPosition - slider.firstXPosition

        const distance = slider.getDistance(newXPosition)

        assert.equal(result, distance)
    })
})

describe('moveSliderWrapper', function () {
    it('moveSliderWrapper arg: movingPixel', function () {
        const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
        const newMovingPixel = 100

        slider.moveSliderWrapper(newMovingPixel);
        const sliderWrapper_position = slider.sliderWrapper.style.transform

        assert.equal('translateX(100px)', sliderWrapper_position)
    })
})

describe('touchstart Test', function () {
    it('touchstart', function () {
        const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
        const touchstartEvent = new Event("touchstart")
        touchstartEvent.changedTouches = []
        touchstartEvent.changedTouches.push({
            screenX: 10
        })
        slider.viewPort.dispatchEvent(touchstartEvent)

        assert.equal(10, slider.firstXPosition)
    })
})

describe('touchMove Test', function () {
    it('touchmove', function () {
        const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
        const touchmoveEvent = new Event("touchmove")
        touchmoveEvent.changedTouches = []
        touchmoveEvent.changedTouches.push({
            screenX: 200
        })
        slider.viewPort.dispatchEvent(touchmoveEvent)

        assert.equal('translateX(200px)', slider.sliderWrapper.style.transform)
    })
})
//
// describe('touchend Test', function () {
//     it('touchend e...test....', function () {
//         const slider = new Slider(document.querySelector('#viewPort'), document.querySelector('#sliderWrapper'))
//         const touchendEvent = new Event("touch")
//         touch
//     })
// })