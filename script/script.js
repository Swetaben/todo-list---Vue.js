
// visibility filters
var filters = {
    all: function (todos) {
        return todos
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed
        })
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed
        })
    }
}

// todoApp Vue instance
var todoApp = new Vue({
    // todoApp initial state
    data: {
        todos: [],
        newTodo: '',
        editedTodo: null,
        visibility: 'all'
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos)
        },
        remaining: function () {
            return filters.active(this.todos).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0
            },
            set: function (value) {
                this.todos.forEach(function (todo) {
                    todo.completed = value
                })
            }
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        addTodo: function () {
            var value = this.newTodo && this.newTodo.trim();
            var length =JSON.parse(this.todos.length);
            if (!value) {
                return
            }
            this.todos.push({
                id:(length) + 1,
                title: value,
                completed: false
            })
            this.newTodo = ''
        },

        removeTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
        },

        removeCompleted: function () {
            this.todos = filters.active(this.todos)
        }
    }

})
// mount
todoApp.$mount('.todoapp')
