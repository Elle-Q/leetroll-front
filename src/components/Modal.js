import React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {CancelButton, OKButton} from "./ui/CustomButton";

export const ModalDialog = styled(Dialog)(({theme}) => ({
    zIndex:999,
    '& .MuiPaper-root':{
        backgroundColor: alpha('#0a0908', 0.9),
        boxShadow: '0 0 1px white',
        borderRadius:'40px',
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
    const {title, children, open, handleClose, handleOK, handleCancel, maxWidth} = props;

    return (
        <ModalDialog
            onClose={handleClose}
            open={open}
            fullWidth={true}
            maxWidth={maxWidth}
            onClick={(event)=>{event.stopPropagation()}}
        >
            <ModalDialogTitle id="dialog-title" onClose={handleClose}>
                <span style={{color: '#3399ff', fontSize: '18px', marginLeft: '5px', textAlign: "center"}}>{title}</span>
            </ModalDialogTitle>
            <DialogContent sx={{mt: '20px', ml: '20px'}}>
                {children}
            </DialogContent>
            <DialogActions sx={{justifyContent: "center", mt: '30px'}}>
                <OKButton handleClick={handleOK}/>
                <CancelButton handleClick={handleCancel}/>
            </DialogActions>
        </ModalDialog>
    );
}

