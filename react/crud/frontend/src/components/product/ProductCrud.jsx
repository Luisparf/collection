import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'products',
    title: 'Produtos',
    subtitle: 'Crud de produtos: Incluir, Listar, Atualizar e Excluir'
}

export default class ProductCrud extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Cadastro de Produto
            </Main>
        )
    }
}