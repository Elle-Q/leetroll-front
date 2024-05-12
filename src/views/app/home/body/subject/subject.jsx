import React from 'react';
import Stack from "@mui/material/Stack";
import ItemCard from "../../../../../components/item-card/item-card";
import {Link} from "react-router-dom";
import "./subject.scss"
import Button from "@mui/material/Button";
import SoundCard from "../../../../../components/sound-card/sound_card";

function Subject(props) {
    const {subject} = props;

    if (subject === undefined || subject.items.length < 1) return <></>

    return (
        <div className="subject">
            <div className="subject__heading-box">
                <div>
                    <h1 className="subject__heading subject__heading--main">
                        <span>{subject.title}</span>
                    </h1>
                    <h1 className="subject__heading subject__heading--sub">
                        <span>{subject.subTitle}</span>
                    </h1>
                </div>
                <Link to={`/search/${subject.catName}`} className="subject__btn-box">
                    <button className="subject__btn">更多</button>
                </Link>
            </div>
            <Stack
                direction='row'
                gap={2}
                justifyContent="center"
                alignItems="center"
                display="flex"
            >
                {
                    subject.items.map((item, index) => {
                        return item.type === 'sound' ?
                            <SoundCard key={item.id} item={item} width={350}/> :
                            <ItemCard key={item.id} item={item} width="23%"/>
                    })
                }
            </Stack>
        </div>

    );
}

export default Subject;