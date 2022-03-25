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
    product: { description: '', brand: '', active: false, date: ''},
    list: []
}

export default class ProductCrud extends Component {

    state = {...initialState} // 

    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({ list: resp.data})
        })
    }

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

    getUpdatedList(product, add = true){
        const list = this.state.list.filter(p => p.id !== product.id) // gera uma nova lista filtrando a partir de produtos que tem o id diferente daquele recebido por parâmetro, ou seja remove 'product' de 'list'
        if(add) list.unshift(product) // coloca product na primeira posição da lista
        return list
    }

    updateField(event){
         const product = {...this.state.product}
         product[event.target.name] = event.target.value
         // product[event.target.thumb] = event.target.src = '/react/crud/frontend/src/assets/imgs/productGroupColor_1001_BiancoCovelano1.webp'
         this.setState({product})
    }

   
    renderForm(){ // o ideal seria refatorar...

        // const [thumb, setThumb] = useState('');

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição <i class="fa fa-clipboard" aria-hidden="true"></i> </label>
                            <input type="text" className="form-control"
                                    name="description"
                                    value={this.state.product.description}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Descrição do produto" />
                         </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca <i class="fa fa-tag" ></i></label>
                            <input type="text" className="form-control"
                                    name="brand"
                                    value={this.state.product.brand}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Marca do produto" />
                         </div>
                    </div>
                
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data <i class="fa fa-calendar" aria-hidden="true"></i></label>
                            <input type="date" className="form-control"
                                    name="date"
                                    value={this.state.product.date}
                                    onChange={e => this.updateField(e)}/>
                         </div>
                    </div>

                    {/* Apenas mostra o menu para upload de imagem, mas não reproduz */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Imagem <i class="fa fa-upload" aria-hidden="true"></i> </label>
                            <input type="file" className="form-control"
                                    name="thumb"
                                    value={this.state.product.thumb}
                                    onChange={e => this.updateField(e)}/>
                         </div>
                    </div>
                    

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ativo <i className="fa fa-thumb-tack" aria-hidden="true"></i></label>
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

    load(product){ // carrega para edição
        this.setState({ product })
    }

    remove(product){ // para aparecer a remoção tem q atualizar a página Oo
        axios.delete(`${baseUrl}/${product.id}`).then(resp => { // remove do backend
            // remove da lista local:
            const list = this.getUpdatedList(product, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Marca</th>
                        <th>Disponível</th>
                       {/* <th>Imagem</th> */}
                       <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderRows()}
                </tbody>
                
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(product => {
            return(
                <tr key={product.id}>
                   
                    <td>{product.description}</td>
                    <td>{product.brand}</td>
                    <td>{product.active}</td>
                    {/* <td>{product.thumb}</td> */}
                    <td>{product.date}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                             <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger ml-2"
                            onClick={() => this.remove(product)}>
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>

                </tr>
            )

        })
    }

    render(){   
        // console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}