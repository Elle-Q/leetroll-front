import React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {CancelButton, OKButton} from "../button/text-button";

export const ModalDialog = styled(Dialog)(({theme}) => ({
    zIndex: 999,
    '& .MuiPaper-root': {
        backgroundColor: alpha('#0a0908', 0.7),
        boxShadow: '0 0 1px white',
        borderRadius: '40px',
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },

    '& .MuiInputLabel-root': {
        fontSize: '14px',
        color: alpha('#3399ff', 0.5)
    },
    '& .MuiInput-root:before': {
        borderBottom: '1px solid #252422'
    },
}));

const ModalDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


export function Modal(props) {
    const {children, open, handleClose, handleOK, maxWidth, actions = true} = props;

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullWidth={true}
            maxWidth={maxWidth}
            onClick={(event) => {
                event.stopPropagation()
            }}
        >
            <ModalDialogTitle id="dialog-title" onClose={handleClose}/>
            <DialogContent sx={{mt: '20px', ml: '20px'}}>
                {children}
            </DialogContent>

            {
                actions &&
                <DialogActions sx={{justifyContent: "center", mt: '30px'}}>
                    <OKButton handleClick={handleOK}>确定</OKButton>
                    <CancelButton handleClick={handleClose}>关闭</CancelButton>
                </DialogActions>
            }

        </Dialog>
    );
}

