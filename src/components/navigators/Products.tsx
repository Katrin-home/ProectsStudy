import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Products = () => {
    return (
        <div>
            <nav>
                <ul className={'nav-list nav-sublist'}>
                    <NavLink to={'/products/dairy'}>
                        <li className={'nav-item'}>Dairy</li>
                    </NavLink>
                    <NavLink to={'/products/bread'}>
                        <li className={'nav-item'}>Bread</li>
                    </NavLink>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
};

export default Products;