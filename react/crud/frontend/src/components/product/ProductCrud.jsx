import React, {Component, useState} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = { // argumentos para o header
    icon: 'cart-plus', // fonts awesome
    title: ' Produtos',
    subtitle: 'Incluir, Listar, Atualizar e Excluir'
}

const baseUrl = 'http://localhost:3001/products'

const initialState = { // estado inicial padrão para o produto
    product: { description: '', brand: '', active: false, date: '', thumb:''},
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
                this.setState({ product: initialState.product, list}) // depois de incluir ou atualizar usuario o formulário é limpo
            })
    }

    getUpdatedList(product){
        const list = this.state.list.filter(u => u.id !== product.id) // gera uma nova lista filtrando a partir de produtos que tem o id diferente daquele recebido por parâmetro, ou seja remove 'product' de 'list'
        list.unshift(product) // coloca product na primeira posição da lista
        return list
    }

    updateField(event){
         const product = {...this.state.product}
         product[event.target.name] = event.target.value
         // product[event.target.thumb] = event.target.src = '/react/crud/frontend/src/assets/imgs/productGroupColor_1001_BiancoCovelano1.webp'
         this.setState({product})
    }

   
    renderForm(){

        // const [thumb, setThumb] = useState('');

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição </label>
                            <input type="text" className="form-control"
                                    name="description"
                                    value={this.state.product.description}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Descrição do produto" />
                         </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca </label>
                            <input type="text" className="form-control"
                                    name="brand"
                                    value={this.state.product.brand}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Marca do produto" />
                         </div>
                    </div>
                
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data </label>
                            <input type="date" className="form-control"
                                    name="date"
                                    value={this.state.product.date}
                                    onChange={e => this.updateField(e)}/>
                         </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Imagem </label>
                            <input type="file" className="form-control"
                                    name="thumb"
                                    value={this.state.product.thumb}
                                    onChange={e => this.updateField(e)}/>
                         </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ativo </label>
                            <input type="checkbox" className="form-control"
                                    name="active"
                                    value={this.state.product.active}
                                    onChange={e => this.updateField(e)}/>
                         </div>
                    </div>

        
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)} >
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}