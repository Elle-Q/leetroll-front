import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppLogo from "../../../app/home/head/AppLogo";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {CustomBadge} from "../../../../components/ui/CustomBadge";


function HeaderBar(props) {
    return (
        <Box sx={{
            flexGrow: 1,
            boxShadow: "0 0 10px #252422",
            position: "sticky",
            zIndex: 50,
            top: 0,
            width: '100%',
            alignItems: 'flex-end',
        }}>

            <AppBar position="static">
                <Toolbar sx={{
                    display: 'inline-flex',
                    minHeight: '64px',
                    backgroundColor:'secondary.dark'
                }}>
                    <AppLogo title="leetroll 管理系统" color='#3399ff'/>
                    <Box sx={{flexGrow: 10}}/>
                    <span style={{color: '#999', fontSize: '15px', marginRight: '5px'}}>Admin--elle</span>
                    <CustomBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                        component={Link} to={"/app/account"}
                    >
                        <Avatar alt="elle" src="/avatar/avatar1.jpg"/>
                    </CustomBadge>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {HeaderBar};