import React, {useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link, useNavigate} from "react-router-dom";
import PriceTag from "./price-tag";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {openSider} from "../../store/sider-slice";
import {useDispatch} from "react-redux";
import "../../views/app/home/body/subject/subject.scss"
import Stack from "@mui/material/Stack";
import './item-card.scss'
import DownloadIcon from '@mui/icons-material/Download';
import {addItem2Cart} from "../../api/cart.service";
import {toggleAtion} from "../../api/action.service";
import Box from "@mui/material/Box";
import ConfettiExplosion from 'react-confetti-explosion';

import Debugger from "../debugger/debugger";
import {download} from "../../api/item.service";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import {isVideo} from "../../utils/ToolUtil";
import Player from "../player/Player";
import SimplePlayer from "../player/SimplePlayer";

function ItemCard(props) {
    const {item, width} = props;
    const [collected, setCollected] = useState(false);
    const [added, setAdded] = useState(false);
    const [activated, setActivated] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        setCollected(item.collected)
    }, [item]);

    const handleAdd2Cart = () => {
        setAdded(!added)
        addItem2Cart(item.id).then(resp => {
            dispatch(openSider())
        })
    }

    //点击下载源文件
    const handleDownload = () => {
        download(item.id)
        if (item.attachments) {
            window.location.href = item.attachments[0].link
        }
    }

    const handleCollect = () => {
        if (!collected) {
            setActivated(true);
            setTimeout(() => setActivated(false), 1800);
        }
        toggleAtion(item.id, 'collect').then(resp => {
            setCollected(resp)
        })
    }

    const getClass = () => {
        let clName = "media-container circle"
        if (item.type === 'hdri') {
            return clName.concat(' media-container_hdri')
        } else if (item.type === 'model') {
            return clName
        } else if (item.type === 'model_bundle') {
            return clName.concat(' media-container_bundle')
        } else if (item.type === 'tutorial') {
            return clName.concat(' media-container_tutorial')
        } else if (item.type === 'image') {
            return clName.concat(' media-container_img')
        } else if (item.type === 'texture') {
            return clName.concat(' media-container_texture')
        }
    }

    return (
        <Box className="item-card" sx={{width: `${width}`}}>
            {/*<Link to={`/item/${item.id}`} key={item.id}>*/}
            {/*    <div className={getClass()}>*/}
            {/*        {*/}
            {/*            (item.main && isVideo(item.main.format)) ?*/}
            {/*                <SimplePlayer src={item.main && item.main.link} />*/}
            {/*                :*/}
            {/*                <img src={item.main && item.main.link} alt="item"/>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</Link>*/}

            {
                (item.main && isVideo(item.main.format)) ?
                    <div><SimplePlayer src={item.main && item.main.link}/></div>
                    :
                    <Link to={`/item/${item.id}`} key={item.id}>
                        <div className={getClass()}>
                            <img src={item.main && item.main.link} alt="item"/>
                        </div>
                    </Link>
            }
            <span className="item-card__heading"> {item.name}</span>
            <Stack className="item-card__btn-box" direction="row">
                <div>
                    <IconButton onClick={handleCollect}>
                        <FavoriteIcon fontSize="large" sx={{color: `${collected ? '#ff0a54' : 'white'}`}}/>
                    </IconButton>
                    {
                        item.type === 'tutorial' && item.bought &&
                        <IconButton onClick={() => navigate(`/play/${item.id}`)}>
                            <SlowMotionVideoIcon fontSize="large" sx={{color: "white"}}/>
                        </IconButton>
                    }
                    {
                        item.bought ?
                            <IconButton onClick={handleDownload}>
                                <DownloadIcon fontSize="large"/>
                            </IconButton>
                            :
                            <IconButton onClick={handleAdd2Cart}>
                                <AddShoppingCartIcon fontSize="large"
                                                     sx={{color: `${added ? '#ff0a54' : 'white'}`}}/>
                            </IconButton>
                    }
                </div>
                {
                    item.price !== 0 && <PriceTag price={item.price}/>
                }
            </Stack>
            {activated && <ConfettiExplosion/>}
            {/*调试窗口*/}
            {/*<Debugger item={item} />*/}
        </Box>
    );
}

export default ItemCard;