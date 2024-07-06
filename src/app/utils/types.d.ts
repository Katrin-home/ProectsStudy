import {Roles} from "./Roles";

export interface RouteType {
    path: string
    title: string
    role?: Roles
}

export interface LoginData {
    login: string,
    password: string
}

export interface SignupData {
    firstName?: string,
    lastName?:string,
    email:string,
    password:string
}

export interface ProductType {
    id?: string
    title: string
    category: string
    unit: string
    cost: number
    img: string
}

export interface CategoryType {
    name: string
}