import React, {useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {Checkbox} from "@mui/material";
import {pink} from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Markdown from 'react-markdown'
import {getAgreement} from "../../../api/config.service";
import './agreement.scss'

function Agreement(props) {
    const {handleAgree, agree} = props
    const [openAgreement, setOpenAgreement] = useState(false)
    const [agreement, setAgreement] = useState("")

    useEffect(() => {
        //获取默认背景
        getAgreement().then(resp => {
            setAgreement(resp)
        })
    }, []);

    const toggleOpenAgr = () => {
        setOpenAgreement(!openAgreement)
    }

    const handleOK = () => {
        handleAgree();
        toggleOpenAgr()
    }

    return (
        <React.Fragment>
            <div
                style={{marginLeft: "30px", color: '#6e6d6d', fontSize: "14px", display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    checked={agree}
                    onChange={handleAgree}
                    size="small"
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
                同意协议
                <HelpOutlineIcon sx={{
                    width: '14px',
                    verticalAlign: 'top',
                    '&:hover': {
                        color: '#8ecae6'
                    }
                }} onClick={toggleOpenAgr}/>
            </div>
            <Modal title="leetroll用户登录注册协议"
                   maxWidth="sm"
                   open={openAgreement}
                   handleClose={toggleOpenAgr}
                   handleOK={handleOK}>
                <Markdown children={agreement} className={'agreement'}/>
            </Modal>
        </React.Fragment>
    );
}

export default Agreement;