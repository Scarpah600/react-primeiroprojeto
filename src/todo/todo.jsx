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
        .then(resp => this.refresh())
    }

    refresh(){
        //ele vai pegar 
        axios.get(`${URL}?sort=-createdAt`)
        .then(resp => this.setState({...this.state, description: '', list: resp.data}))
    }

    render(){
        return (
            <div>
               <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
               <TodoForm description={this.state.description} 
               handleAdd={this.handleAdd}
               handleChange={this.handleChange}
               />
               <TodoList list={this.state.list}
               handrleRemove={this.handrleRemove}/>
            </div>
        )
    }
}