import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = { // argumentos para o header
    icon: 'cart-plus',
    title: ' Produtos',
    subtitle: 'Incluir, Listar, Atualizar e Excluir'
}

const baseUrl = 'http://localhost:3001/products'

const initialState = { // estado inicial padrão para o produto
    product: { thumb: '', description: '', brand: '', active: false, inactivation_data: ''},
    list: []
}

export default class ProductCrud extends Component {

    state = {...initialState} // 

    clear(){ // limpar o estado é seta-lo como inicial
        this.setState({ product: initialState.product})
    }

    save(){
        const product = this.state.product // armazena estado do produto
        const method = product.id ? 'put' : 'post' // se possui cadastro, o id é diferente de 0, então será chamado o metodo put, caso contrário o método post
        const url = product.id ? `${baseUrl}/${product.id}`: baseUrl // se possui cadastro, usara a baseUrl/id, baseUrl caso contrário
        axios[method] (url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) // resp.data são os dados retornados pelo Json-server
                this.setState({ user: initialState.user, list}) // depois de incluir ou atualizar usuario o formulário é limpo
            })
    }
    
    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id) // gera uma nova lista filtrando a partir de usuarios que tem o id diferente daquele recebido por parâmetro, ou seja remove 'user' de 'list'
        list.unshift(user) // coloca user na primeira posição da lista
        return list
    }

    render(){
        return (
            <Main {...headerProps}>
                Cadastro de produtos
            </Main>
        )
    }
}