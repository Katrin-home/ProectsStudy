import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../../features/authSlice";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";
import {logoutFB} from "../../firebase/firebaseAuthService";
import {AUTH_USER_ITEM} from "../../app/utils/constants";

const Logout = () => {
    const navigate = useNavigate()
    const dispatch  = useAppDispatch();
    const logoutFn = async  () => {
        await logoutFB()
        dispatch(logout())
        localStorage.removeItem(AUTH_USER_ITEM)
        navigate('/')
    }
    return (
        <div>
            <p>Are you sure?</p>

    <Button variant="contained" endIcon={<SendIcon />} size={"large"}
            onClick={logoutFn}>
        Confirm
    </Button>
        </div>
    );
};

export default Logout;