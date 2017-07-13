// const healthObj = {
// 	name: '달리기',
// 	lastTime: 'PM10:13',
// 	showHealth: function () {
// 		console.log(this.name + '님, 오늘은')
// 	},
// 	showHealth2: () => {
// 		console.log(this.name+'님, 오늘은')
// 	}
// }

// healthObj.showHealth({name: '준범'})

// function someMethod() {
// 	return this;
// }

// const someArrow = () => {
// 	return this
// }

// console.log(someMethod())
// console.log(someArrow())

function todoList() {
	this.data = []
}

const todoPrototype = {
	addTodo: function(task) {
		if (this.data.includes(task)) {
			console.log('이미 있는 일입니다!')
			return false
		}
		this.data.push(task)
	},
	completeTodo: function (task) {
		this.data = this.data.filter(function(str) {
			return str !== task
		})
	},
	getTodos: function () {
		return this.data
	}
}

todoList.prototype = todoPrototype

const todo = new todoList()
const todo2 = new todoList()

todo.addTodo('일하기')
todo.addTodo('프로그래밍하기')
todo.addTodo('빼기')
todo.addTodo('공부하기')
todo.addTodo('공부하기')

todo.completeTodo('일하기')

console.log(todo.getTodos())

console.log(todo.prototype === todo2.prototype)
console.log(todo.__proto__ === todo2.__proto__)


// function Health(name, age) {
// 		this.name = name
// 		this.age = age
// 	}	

// const me = new Health('jb', 23)

// var healthObj = {
// 	showHealth: function () {
// 		console.log(this.name+'님')
// 	}
// }

// function Health(name, lastTime) {
// 	this.name = name
// 	this.lastTime = lastTime
// }

// Health.prototype = healthObj

