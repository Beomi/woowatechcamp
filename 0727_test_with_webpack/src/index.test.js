import Woowa from './lib/dummy'

mocha.setup('bdd')

const assert = chai.assert

console.log(Woowa);

describe('class call', function () {
    it('class get good', function () {
        const tempClass = new Woowa();
        const calledClass = console.log(tempClass.project)
        assert.equal(calledClass, "sample project")
    })
})

mocha.run()