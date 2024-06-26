import React, {useEffect, useRef, useState} from 'react';
import {updatePrice, updateTag} from "../../api/item.service";
import './debugger.scss'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ListMetrics} from "../../api/cat.service";
import ColorButton from "../button/color-button";

function Debugger(props) {
    const {item} = props;
    const priceRef = useRef();
    const [tags, setTags] = useState([])


    useEffect(() => {
        ListMetrics(item.catId).then((metrics) => {
            setTags(metrics)
        })
    }, [item]);

    const handleUpdatePrice = () => {
        updatePrice(item.id, priceRef.current.value).catch()
    }

    const handleUpdateTag = (e) => {
        updateTag(item.id, e.target.value).catch()
    }

    return (
        <div className="debugger">
            <span>{item.id}</span>
            <ColorButton color="#e82986">删除</ColorButton>
            <div>
                <input defaultValue={item.price} ref={priceRef}></input>
                <ColorButton color="#ffd166" handleClick={handleUpdatePrice}>修改价格</ColorButton>
            </div>
            <div>
                <FormControl className="select-container" size="small">
                    <Select
                        value={item.tag}
                        label="打标签"
                        onChange={handleUpdateTag}
                    >
                        {
                            tags.map((tag, index) => (
                                <MenuItem key={index} value={tag.alias}>{tag.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Debugger;