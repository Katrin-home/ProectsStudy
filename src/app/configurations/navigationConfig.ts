import {RouteType} from "../utils/types";
import {Roles} from "../utils/Roles";

export  const navItemsArray:RouteType[] = [
    {path: "/", title: "Home", role:Roles.ALL},
    {path: "orders", title: "Orders", role:Roles.USER},
    {path: "customers", title: "Customers", role: Roles.ADMIN},
    {path: "cart", title: "Shopping Cart", role:Roles.USER},
    {path: "products", title: "Products", role: Roles.ALL},
    {path: "login", title: "Login",role: Roles.NO_AUTH},
    {path: "logout", title: "Logout",role:Roles.USER},
    {path: "signup", title: "SignUp",role:Roles.NO_AUTH},
]

export const navProductsArray = [
    {path: "dairy", title: "Dairy Products"},
    {path: "bread", title: "Bread Products"},
    {path: "back", title: "Back to main menu"}
]