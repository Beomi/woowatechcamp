// Good Because of This is to improve
// readability and greppability -
// it lets you use a short variable name,
// but a long, verbose, unique function name
// Debug console use function name!
// Look: https://github.com/airbnb/javascript/issues/794
const makeObject = function makeObjectFromClass(object, prototype) {
    const prototypeClone = Object.create(prototype)
    for (const i in object) {
        prototypeClone[i] = object[i]
    }
    return prototypeClone
}

const examplePrototype = {
    showMyName: function () {
        console.log(`my Name is ${this.name}`)
    },
    getSomething: function () {
        console.log(`There is ${this.something}`)
    }
}

const newObject = makeObject(
    {
        name: 'jb',
        something: 'someblablalba'
    },
    examplePrototype
)

console.log(newObject)
newObject.showMyName()
newObject.getSomething()