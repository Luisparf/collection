import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'cart-plus',
    title: ' Produtos',
    subtitle: 'Incluir, Listar, Atualizar e Excluir'
}


export default class ProductCrud extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Cadastro de produtos
            </Main>
        )
    }
}