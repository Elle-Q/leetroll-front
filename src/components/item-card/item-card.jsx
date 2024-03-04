import React, {useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import PriceTag from "../PriceTag";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {openSider} from "../../store/sider-slice";
import {useDispatch} from "react-redux";
import "../../views/app/home/body/subject/subject.scss"
import Stack from "@mui/material/Stack";
import './index.scss'
import DownloadIcon from '@mui/icons-material/Download';
import {addItem2Cart} from "../../api/cart.service";
import {toggleAtion} from "../../api/action.service";
import Box from "@mui/material/Box";

function ItemCard(props) {
    const {item, width} = props;
    const [collected, setCollected] = useState(false);
    const [added, setAdded] = useState(false);
    let dispatch = useDispatch();

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
        window.location.href = item.attachments[0].link
    }

    const handleCollect = () => {
        toggleAtion(item.id, 'collect').then(resp => {
            setCollected(resp)
        })
    }

    const getClass = () => {
        if (item.type === 'hdri') {
            return 'hdri-container'
        } else if (item.type === 'doc') {
            return 'doc-container'
        } else if (item.type === 'model') {
            return 'model-container'
        } else {
            return 'normal-container'
        }
    }

    return (
        <Box className="item-card" sx={{width: `${width}`}}>
            <Link to={`/item/${item.id}`} key={item.id}>
                <div className={getClass()}>
                    <img src={item.main && item.main.link} alt="item"/>
                </div>
            </Link>

            <span> {item.name}</span>
            <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <IconButton onClick={handleCollect}>
                        <FavoriteIcon fontSize="small" sx={{color: `${collected ? '#ff0a54' : 'white'}`}}/>
                    </IconButton>
                    {
                        item.price === 0 ?
                            <IconButton onClick={handleDownload}>
                                <DownloadIcon fontSize="small"/>
                            </IconButton>
                            :
                            <IconButton onClick={handleAdd2Cart}>
                                <AddShoppingCartIcon fontSize="small" sx={{color: `${added ? '#ff0a54' : 'white'}`}}/>
                            </IconButton>
                    }
                </div>
                <span style={{fontSize: '10px', color: '#7b7b7b'}}>已有{item.downCnt}人下载</span>
                {
                    item.price !==0 && <PriceTag price={item.price}/>
                }
            </Stack>
        </Box>
    );
}

export default ItemCard;