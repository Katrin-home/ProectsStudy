import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from "./components/pages/Home";
import Customers from "./components/pages/Customers";
import Orders from "./components/pages/Orders";
import ShoppingCart from "./components/pages/ShoppingCart";
import Dairy from "./components/pages/Dairy";
import Bread from "./components/pages/Bread";
import Error404 from "./components/servicePages/Error404";
import {navItemsArray, navProductsArray} from "./app/configurations/navigationConfig";
import NavigatorDesktop from "./components/navigators/NavigatorDesktop";
import Login from "./components/servicePages/Login";
import Logout from "./components/servicePages/Logout";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {ProductType, RouteType} from "./app/utils/types";
import {Roles} from "./app/utils/Roles";
import SignUp from "./components/servicePages/SignUp";
import {getProductsFB} from "./firebase/firebaseDBService";
import products from "./components/navigators/Products";
import {setProducts} from "./features/productSlice";

function App() {
    const authUser = useAppSelector(state =>
        state.auth.authUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        navigate('/')
        const subscribtion = getProductsFB().subscribe({
            next: (products:ProductType[]) => {
                console.log(products)
                dispatch(setProducts(products))
            }
        })
        return ()=> subscribtion.unsubscribe()
    }, [])
    const getRoutes = (): RouteType[] => navItemsArray.filter(item =>
        item.role === Roles.ALL ||
        (item.role === Roles.USER && authUser) ||
        (item.role === Roles.ADMIN && authUser.includes('admin')) ||
        item.role === Roles.NO_AUTH && !authUser
    );

    return (
        <Routes>
            <Route path={navItemsArray[0].path} element={<NavigatorDesktop items={getRoutes()}/>}>
                <Route index element={<Home/>}/>
                <Route path={navItemsArray[2].path} element={<Customers/>}/>
                <Route path={navItemsArray[1].path} element={<Orders/>}/>
                <Route path={navItemsArray[3].path} element={<ShoppingCart/>}/>
                <Route path={navItemsArray[4].path}
                       element={<NavigatorDesktop items={navProductsArray} subnav={true}/>}>
                    <Route path={navProductsArray[0].path} element={<Dairy/>}/>
                    <Route path={navProductsArray[1].path} element={<Bread/>}/>
                    <Route path={navProductsArray[2].path}
                           element={<NavigatorDesktop items={getRoutes()} tabValue={0}/>}/>
                </Route>
                <Route path={navItemsArray[5].path} element={<Login/>}/>
                <Route path={navItemsArray[6].path} element={<Logout/>}/>
                <Route path={navItemsArray[7].path} element={<SignUp/>}/>
            </Route>
            <Route path={'*'} element={<Error404/>}/>
        </Routes>
    );
}

export default App;
