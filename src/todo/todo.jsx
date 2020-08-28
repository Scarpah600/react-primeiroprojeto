import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from '../todo/todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
     //estou amarrando essa classe vai ser oque estou chamando o proprio componente que estou
        //trabalhando
        //Bind******
    constructor(props){
        super(props)
        this.state = {description: '', list:[] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handrleRemove = this.handrleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkPending = this.handleMarkPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear(this)
        this.refresh()
    }

    handleAdd(){
        //verificar se o estado do componente esta passando corretamente o objeto
        //console.log(this.state.description)
        const description = this.state.description
        axios.post(URL, {description})
            .then(resp => this.refresh())
    }
    handleChange(e){
        //atualizar o objeto
        this.setState({...this.state, description: e.target.value})
    }
    handrleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh(this.state.description))
    }
    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}` , {...todo, done:true})
        .then(resp => this.refresh(this.state.description))
    }
    handleMarkPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
        .then(resp => this.refresh(this.state.description))
    }
    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){
        this.refresh()
    }

    refresh(description = ''){
        //ele vai pegar 
        const search = description ? `&description_regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    render(){
        return (
            <div>
               <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
               <TodoForm description={this.state.description} 
               handleAdd={this.handleAdd}
               handleChange={this.handleChange}
               handleSearch={this.han}/>
               <TodoList list={this.state.list}
               handleMarkAsDone={this.handleMarkAsDone}
               handleMarkPending={this.handleMarkPending}
               handrleRemove={this.handrleRemove}
               handleClear={this.handleClear}/>
            </div>
        )
    }
}