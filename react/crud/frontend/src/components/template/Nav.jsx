import './Nav.css'
import React from 'react' 

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className='fa fa-home'></i> Início
            </a>
            <a href="#/products">
                <i class="fa fa-diamond" aria-hidden="true"></i> Produtos
            </a>
        </nav>
    </aside>