import React from 'react';
import {RouteType} from "../../app/utils/types";
import {NavLink, Outlet} from "react-router-dom";
import './navigation.css'
type Props = {
    items: RouteType[],
    subnav?: boolean
}
const Navigator:React.FC<Props> = ({items, subnav}) => {
    return (
        <div>
            <nav>
                <ul className={`nav-list ${subnav? 'nav-sublist' : ''}`}>
                    {items.map((item, index) =>
                    <NavLink to={item.path} key={index}>
                        <li className={'nav-item'}>{item.title}</li>
                    </NavLink>
                    )}
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
};

export default Navigator;