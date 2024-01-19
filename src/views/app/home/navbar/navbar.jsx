import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./logo";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../../api/authSlice";
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import useScroll from "../../../../hook/useScroll";
import {openCart} from "../../cart/cart-slice";
import {setKeyword, toggleSearch} from "../../../../store/Search";

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SearchIcon from '@mui/icons-material/Search';
import "./navbar.scss"

function NavBar(props) {
    const navigate = useNavigate();
    const {user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const scroll = useScroll()

    const enterAccount = (e) => {
        navigate('/account')
    };

    const handleOpenCart = () => {
        dispatch(openCart())
    }

    const handleEnter = (event) => {
        if(event.nativeEvent.keyCode === 13){
            dispatch(setKeyword(event.target.value))
            dispatch(toggleSearch());
            navigate('/search')
        }
    }

    return (
        <div className="navbar-container" style={{transform: `${scroll.direction === 'down' ? 'translateY(-100%)' : ''}`}}>
            <AppBar position="static" sx={{backgroundColor: '#252422'}}>
                <Toolbar>
                    <Logo title="LEETROLL"/>
                    <input type="text" className="search-bar" onKeyDown={handleEnter}/>
                    <Stack direction="row" spacing={2} sx={{width: '20%'}}>
                        <Link color="inherit" to={"/home"}>
                            <HomeIcon fontSize="small"/>
                        </Link>
                        <Link color="inherit" to={"/search"}>
                            <SearchIcon fontSize="small"/>
                        </Link>
                        <a color="inherit" onClick={handleOpenCart}>
                            <ShoppingCartIcon fontSize="small"/>
                        </a>
                        <Link color="inherit" to={"/community"}>
                            <SupervisorAccountIcon fontSize="small"/>
                        </Link>
                        <CustomBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            onClick={enterAccount}
                            sx={{
                                cursor: 'pointer',
                                '& .MuiBadge-badge': {
                                    backgroundColor: user && getColorFromUserStatus(user.status),
                                    color: user && getColorFromUserStatus(user.status),
                                }
                            }}
                        >
                            <Avatar alt="avatar" src={user && user.avatar}/>
                        </CustomBadge>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {NavBar};