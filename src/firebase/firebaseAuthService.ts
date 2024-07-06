import {createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {LoginData, SignupData} from "../app/utils/types";
import {auth} from "../app/configurations/firebase-config";

const loginWithGoogle = async () => {
    const credential = await signInWithPopup(auth, new GoogleAuthProvider())
    return credential.user.email as string
}
const loginWithEmail = async (loginData: LoginData) => {
    await signInWithEmailAndPassword(auth, loginData.login, loginData.password)
    //if all right this function no return nothing
    return loginData.login as string
}
export const loginFB = async (loginData: LoginData): Promise<string> => {
    return loginData.login === "GOOGLE"?  loginWithGoogle() :  loginWithEmail(loginData)
}
export const logoutFB = async () => {
    await signOut(auth)
}
export const signUpFB = async (data:SignupData) => {
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    return credential.user.email as string
}
// login - password for admin
// admin@gmail.com
// 123456

// login - password for admin
// admin@telran.co.il
// 123456

