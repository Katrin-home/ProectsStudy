import React, {useEffect, useState} from 'react';
import {RouteType} from "../../app/utils/types";
import {AppBar, Box, Tab, Tabs} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";

interface Props {
    items: RouteType[],
    subnav?: boolean,
    tabValue?:number
}
const NavigatorDesktop:React.FC<Props> =

    ({items, subnav,tabValue}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event:React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

    }
    const navigate = useNavigate();
// setValue(0)
    useEffect(()=> {
        // setValue(0)
        // console.log(value)
        if(!subnav){
            navigate('/')
        }
    },[])

    return (
        <Box sx={{textAlign:"center", marginTop:7}}>
            <AppBar sx={{backgroundColor: 'lightgray'}}>
                {/*<Tabs  value={value>items.length-1? 0:value} onChange = {handleChange}>*/}
                <Tabs  value={value>items.length-1 ? tabValue : value} onChange = {handleChange}>
                    {items.map((item, index) =>
                    <Tab key={index} component={Link} to={item.path} label={item.title}/>
                    )}
                </Tabs>
            </AppBar>
            <Outlet/>
        </Box>
    );
};

export default NavigatorDesktop;