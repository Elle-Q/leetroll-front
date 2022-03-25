import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import {alpha} from "@mui/system";
import {Input} from "@mui/material";
import {StyledInputElement, StyledSingleInputElement} from "../../../../components/ui/CustomInput";

const useStyles = makeStyles({
    quill: {
        width: '100%',
        color: 'white',
        textAlign: "center",
        '& > .ql-toolbar.ql-snow': {
            backgroundColor: '#252422 ',
            border: "1px solid #30363d",
            borderRadius: 0,
            borderBottom: 'none',
            borderTop: 'none',
        },
        '& > .ql-container.ql-snow': {
            backgroundColor: alpha('#1c1c1c', 1),
            border: "1px solid #30363d",
            borderRadius: '0 0 10px 10px',
        },
        '& .ql-editor': {
            height: '800px'
        },
    }
});


function Issue(props) {
    const [value, setValue] = useState('');
    const classes = useStyles()
    const contentRef = useRef()

    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            [{'color': []}, {'background': []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
        history: {          // Enable with custom configurations
            'delay': 2500,
            'userOnly': true
        },
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'background'
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            if (!contentRef.current.value) {
                contentRef.current.style.border = "1px solid #3399ff";
                contentRef.current.style.borderRadius = "10px";
                // contentRef.current.focus()
            } else {
                contentRef.current.style.border = "1px solid #30363d";
                contentRef.current.style.borderRadius = '10px 10px 0 0';
                contentRef.current.style.borderBottom="none"
            }
        }, 100);
        return () => clearInterval(interval);
    },[contentRef.current])

    return (
        <Box sx={{
            width: '60%',
            ml: '20%',
            mr: '20%',
            borderRadius: '10px',
            backgroundColor: "transparent",
            mt: '40px',
        }}>
            <StyledSingleInputElement
                style={{
                    backgroundColor: alpha('#1c1c1c', 1),
                    width: '100%',
                    border: "1px solid #30363d",
                    borderRadius: '10px 10px 0 0',
                    borderBottom:"none",
                    color: 'white',
                    fontSize:'20px',
                    padding:'10px',
                    verticalAlign:'center'
                }}
                placeholder='标题'
                ref={contentRef}
            >
            </StyledSingleInputElement>
            <ReactQuill
                className={classes.quill}
                theme="snow"
                placeholder='提出你的问题吧...'
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
            >
            </ReactQuill>


        </Box>
    );
}

export default Issue;