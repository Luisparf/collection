import './Nav.css'
import React from 'react' 
import { Link } from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className='fa fa-home'></i> Início
            </ Link>
            <Link to="/products">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> Produtos
            </Link>
            <a href="https://github.com/Luisparf/collection">
                <i class="fa fa-github " aria-hidden="true"></i> Visite
            </a>
        
        </nav>
       
    </aside>