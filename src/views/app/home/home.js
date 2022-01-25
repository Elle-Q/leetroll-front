import React from 'react';
import {HeaderBar} from "./appbar/HeaderBar";
import {Route, Routes, useLocation} from "react-router-dom";
import Play from "../play/Play";
import Body from "./body/Body";
import Category from "../category/Category";
import Account from "../account/Account";
import Item from "../item/Item";
import CssBaseline from "@mui/material/CssBaseline";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "../../../styles.css";

function Home(props) {

    const routes = [
        {path: '/home', name: 'home', component: <Body/>},
        {path: '/', name: 'home_', component: <Body/>},
        {path: '/play', name: 'play', component: <Play/>},
        {path: '/category/:subject', name: 'category', component: <Category/>},
        {path: '/item/:id', name: 'item', component: <Item/>},
        {path: '/account', name: 'account', component: <Account/>},
    ]

    const AnimatedSwitch = () => {
        const location = useLocation();
        return (
            <TransitionGroup className="router-wrapper">
                <CSSTransition
                    key={location.key}
                    timeout={2000}
                    classNames="page"
                >
                    <Routes>
                        {routes.map(({path, component}) => (
                            <Route path={path} element={component}/>
                        ))}
                    </Routes>
                </CSSTransition>

            </TransitionGroup>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <HeaderBar/>
            <AnimatedSwitch/>
        </React.Fragment>
    );
}

export default Home;