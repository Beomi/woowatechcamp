const assert = chai.assert

describe('이 두개는 같은가', function () {
    it('같음 ㅇㅇ', function () {
        assert.equal(true, true)
    })
})

describe('Array 테슷흐', function () {
    it('Array의 길이는 같은가?', function () {
        const arr = []
        arr.push(1, 2, '3')
        assert.equal(arr.length, 3)
    })
})

describe('타입 체킹 Str', function () {
    it('should return string type...', function () {
        const input = 'helloWorld'
        const resultType = checkType(input)
        assert.equal('string', resultType)
    })
})

describe('타입 체킹 NOT Str', function () {
    it('should not return string type...', function () {
        const input = 1234
        const resultType = checkType(input)
        assert.notEqual('string', resultType)
    })
})

describe('AddClass Test', function () {
    it('added class', function () {
        // give
        const div = document.createElement('div')
        // when
        addClass(div, 'someClassName')
        // then
        const isExist = div.className.includes('someClassName')
        assert.equal(true, isExist)
    })
})

describe('clickClearClassHandler Event Dispatch test', function () {
    it('clear', function () {
        //give
        const element = document.querySelector('a')
        const clickEvent = new Event('click')
        //when
        element.classList.add('someClass')
        element.dispatchEvent(clickEvent)
        //then
        const isClassExist = element.classList.contains('someClass')
        assert.equal(false, isClassExist)
    })
})

describe('clickClearClassHandler Functional Test', function () {
    it('clear', function () {
        //give
        const virtualElement = document.createElement('div')
        virtualElement.classList.add('someClass')
        const clickEvent = {
            target: virtualElement,
            preventDefault() {
                return true
            }
        }
        //when
        clickClearClassHandler(clickEvent)
        //then
        const isClassExist = virtualElement.classList.contains('someClass')
        assert.equal(false, isClassExist)
    })
})

describe('Asyncno ajax test', function () {
    it('should be 1', function (done) {
        const url = 'https://jsonplaceholder.typicode.com/posts/1'
        const fn = function (result) {
            const userId = result.userId
            assert.equal(userId, 1)
            console.log(1)
            done()
        }
        xhr(url, fn)
    })
})

describe('is it 1?', function () {
    it('shoule be true', function () {
        assert.equal(1, 1)
        console.log(2)
    })
})