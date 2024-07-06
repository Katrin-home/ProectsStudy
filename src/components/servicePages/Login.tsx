import React from 'react';
import {LoginForm} from "../forms/LoginForm";
import {useAppDispatch} from "../../app/hooks";
import {login} from "../../features/authSlice";
import {LoginData} from "../../app/utils/types";
import {loginFB} from "../../firebase/firebaseAuthService";
import {useNavigate} from "react-router-dom";
import {AUTH_USER_ITEM} from "../../app/utils/constants";
import {setCode} from "../../features/codeSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const  loginFn = async (loginData:LoginData) => {
        try {
            const email = await loginFB(loginData)
            dispatch(login(email))
            dispatch(setCode('OK'))
            localStorage.setItem(AUTH_USER_ITEM, email)
            navigate('/')
        } catch (e) {
                dispatch(setCode('Wrong credentials!'))
        }
    }
    return (
        <div>
            <LoginForm submitFn={loginFn}/>
        </div>
    );
};

export default Login;