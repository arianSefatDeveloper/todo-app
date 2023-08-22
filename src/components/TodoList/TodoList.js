import React, { Component } from 'react'
import Header from './Header'
import Todo from './Todo'

export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)

    }
    todoTitleHandler(event){
        this.setState({
            todoTitle:event.target.value
        })

    }
    addTodo(event){
        event.preventDefault()
        let newTodoObj = {
            id: this.state.todos.length+1,
            title: this.state.todoTitle,
            completed: false

        }
        this.setState(prevState  =>{
            return{
                todos : [...prevState.todos , newTodoObj],
                todoTitle:''
            }
        })
       
    }
    removeTodo(todoId){
        console.log(todoId);
        let newTodos = this.state.todos.filter(todo =>{
            return todo.id !== todoId
        })
        console.log(newTodos);
        this.setState({
            todos:newTodos
        })
    }
    editTodo(todoId){
        let newtodo = [...this.state.todos]
        console.log(newtodo);
        newtodo.forEach(todo => {
            if(todo.id === todoId){
                todo.completed = !todo.completed 
            }
            this.setState({
                todos : newtodo
            })
            
        });
    }
    statusHandler(event){
        this.setState({
            status: event.target.value
        })

    }
   
    render() {
        return (
            <>
                <Header />
                <form onSubmit={this.addTodo}>
                    <input type="text" className="todo-input" maxLength="40" value={this.state.todoTitle} onChange={this.todoTitleHandler}/>
                    <button className="todo-button" type="submit" >
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={this.statusHandler}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        
                        { this.state.status === "completed" && this.state.todos.filter(todo=>todo.completed).map(todo =>(

                            <Todo {...todo}  onRemove={this.removeTodo} onEdit={this.editTodo} key={todo.id}   />
                        ))}
                        

                        { this.state.status === "all" && this.state.todos.map(todo =>(

                            <Todo {...todo}  onRemove={this.removeTodo} onEdit={this.editTodo} key={todo.id}   />
                        ))}
                        

                        { this.state.status === "uncompleted" && this.state.todos.filter(todo=>!todo.completed).map(todo =>(

                            <Todo {...todo}  onRemove={this.removeTodo} onEdit={this.editTodo} key={todo.id}   />
                        ))}
                        
                     
                    </ul>
                </div>
            </>
        )
    }
}
