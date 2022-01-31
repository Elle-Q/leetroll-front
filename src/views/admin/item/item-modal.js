import React, {useEffect, useRef, useState} from 'react';
import {CatStatus} from "../../../common/constant/constant";
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../common/custom-input";
import Modal from "../../../common/modal";
import {selectItemModal, close} from "./item-slice";
import {useSelector, useDispatch} from 'react-redux'
import {openAlert} from "../../../features/alert/alertSlice";
import {upload} from "../../../api/qiniu.service";
import {ListCatName} from "../../../api/cat.service";
import MenuItem from "@mui/material/MenuItem";
import {UpdateItem} from "../../../api/item.service";
import AddIcon from '@mui/icons-material/Add';
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import {Input} from "@mui/material";

function ItemModal(props) {
    const {openModal, readOnly, data} = useSelector(selectItemModal);
    const dispatch = useDispatch();
    const [detail, setDetail] = React.useState(data);
    const [imgFile, setImgFile] = useState(null);
    const [imgUri, setImgUri] = useState(data.Preview);
    const [catNames, setCatNames] = useState(null);
    const [tags, setTags] = useState(["s", "sss"]);
    const [showTagInput, setShowTagInput] = useState(false);
    const tagRef = useRef();

    useEffect(() => {
        imgFile && setImgUri(URL.createObjectURL(imgFile));
    }, [imgFile])

    useEffect(() => {
        setDetail(data)
        setImgUri(data.Preview)
    }, [data])

    React.useEffect(() => {
        ListCatName().then((data) => {
            setCatNames(data)
        })
    }, [])

    const handleClose = () => {
        dispatch(close())
    }

    const handleInputChange = (event) => {
        // debugger
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.type === 'file') {
            setImgFile(event.target.files[0]);
        } else {
            setDetail({
                ...detail,
                [name]: value
            })
        }
    };

    //保存资源信息
    const handleSave = async () => {
        //上传文件到七牛, 获取图片外链
        imgFile && upload(imgFile).then(link => {
            let param = Object.assign({}, detail,
                {
                    Preview: link,
                    Tags: tags
                })
            debugger
            UpdateItem(param).then(() => {
                handleClose();
                dispatch(openAlert());
                setImgFile(null);
            })

        })


    };

    return (
        <Modal title="新增资源"
               maxWidth="md"
               open={openModal}
               handleClose={() => {
                   setImgUri(null);  //置空, 否则会影响其他modal
                   handleClose()
               }}
               handleSave={handleSave}>
            <div style={{display: "flex"}}>
                <InputWithHeader header="名称:"
                                 name="Name"
                                 value={data.Name}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="B站链接:"
                                 name="BLink"
                                 value={data.BLink}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <ImagInputWithHeader
                    header="预览图:"
                    name="Preview"
                    img={imgUri}
                    onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader header="作者:"
                                 name="Author"
                                 value={data.Author}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="价格:"
                                 name="Price"
                                 value={data.Price}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader fullWidth={false}
                                 multiline={true}
                                 name="Desc"
                                 header="描述:"
                                 value={data.Desc}
                                 placeholder="描述一下分类"
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <SelectInputWithHeader
                    name="Status"
                    header="状态:"
                    defaultValue="show"
                    handleChange={handleInputChange}
                    disabled={readOnly}
                    type="enum"
                    items={CatStatus}/>

                <SelectInputWithHeader
                    name="CatId"
                    header="类别:"
                    defaultValue={catNames && catNames[0].Title}
                    handleChange={handleInputChange}
                    disabled={readOnly}>
                    {
                        catNames && catNames.map((item, index) => (
                            <MenuItem key={item.ID} value={item.ID}>
                                {item.Title}
                            </MenuItem>
                        ))
                    }
                </SelectInputWithHeader>
            </div>
            <div style={{display: "flex", marginTop: '30px'}}>
                <span style={{marginRight: '15px', verticalAlign: "bottom"}}>标签:</span>
                {
                    tags && tags.map((key, index) => {
                        return <React.Fragment>
                            <Chip
                                sx={{
                                    // color: 'text.secondary',
                                    mr: "15px",
                                    boxShadow: '0 0 2px #CCC5B9',
                                    '& > .MuiChip-deleteIcon:hover': {
                                        color: 'red',
                                    }
                                }}
                                label={key}
                                key={index}
                                onDelete={() => {
                                    console.log(key)
                                    setTags(tags.filter(t => t !== key))
                                }}
                            />
                        </React.Fragment>
                    })
                }
                {
                    showTagInput === true &&
                    <Input
                        inputRef={tagRef}
                        placeholder="输入标签"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                console.log()
                                setTags([...tags, tagRef.current.value])
                                setShowTagInput(false)
                            }
                        }}
                        sx={{
                            fontStyle: 'italic',
                            fontSize: '12px',
                            width: '70px',
                            pl: '10px'
                        }}/>

                }
                <IconButton onClick={() => {
                    setShowTagInput(true)
                }}>
                    <AddIcon fontSize='small' sx={{color: '#3399ff'}}/>
                </IconButton>
            </div>
        </Modal>
    );
}

export default ItemModal;