import * as React from 'react';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {LoginData} from "../../app/utils/types";
import {Alert, AlertTitle, Divider} from "@mui/material";
import gog_pic from "../../images/icons8-google-48.png"
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetCode, setCode} from "../../features/codeSlice";
import {NavLink, useNavigate} from "react-router-dom";
import "./formStyle.css"

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://tel-ran.com/" target="_blank">
                Tel-Ran
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface Props {
    submitFn: (loginData: LoginData) => void;
}

export const LoginForm:React.FC<Props> = ({submitFn}) => {
    const {code} = useAppSelector(state => state.code)
    const dispatch = useAppDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        submitFn({
            login: data.get('email') as string,
            password: data.get('password') as string,
        });
        event.currentTarget.reset()
    };
    useEffect(() => {
        dispatch(setCode("OK"))
    }, []);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        {code!=="OK" && <Alert severity="error" onClose={() => {
                            dispatch(resetCode())
                        }}>
                            <AlertTitle>Error</AlertTitle>
                            {code}
                        </Alert>}

                        <Divider sx={{fontWeight:'bold'}}><b>or</b></Divider>
                        </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=>{submitFn({login:'GOOGLE', password:'123456'})}}
                    >
                        <Avatar src={gog_pic} alt='Google'/>
                    </Button>

                    <Grid container>
                        <Grid item>

                            <NavLink  to={'/signup'} className={'my_class'}>
                                {"Don't have an account? Sign Up"}
                            </NavLink>

                        </Grid>
                    </Grid>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
