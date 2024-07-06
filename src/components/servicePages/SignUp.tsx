import React from 'react';
import SignUpForm from "../forms/SignupForm";
import {SignupData} from "../../app/utils/types";
import {signUpFB} from "../../firebase/firebaseAuthService";
import {useAppDispatch} from "../../app/hooks";
import {login} from "../../features/authSlice";
import {useNavigate} from "react-router-dom";
import {setCode} from "../../features/codeSlice";

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const signupFn = async (signupData:SignupData)=>{
        // console.log(signupData)
        try {
            const email = await signUpFB(signupData)
            dispatch(login(email))
            navigate('/')
        } catch (e:any) {
            if (e.message === "Firebase: Error (auth/invalid-email).")
                dispatch(setCode("Invalid Email. Try again with correct email"))
            else dispatch(setCode(e.message))
        }
    }
    return (
        <div>
            <SignUpForm signupFn={signupFn}/>
        </div>
    );
};

export default SignUp;