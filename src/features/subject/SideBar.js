import React from 'react';
import Box from "@mui/material/Box";
import Sort from "../../common/Sort";
import Divider from "@mui/material/Divider";
import PriceFilter from "../../common/PriceFilter";
import {alpha} from "@mui/system";
import RatingFilter from "../../common/RatingFilter";
import FileFormatFilter from "../../common/FileFormatFilter";


function SideBar(props) {
    return (
        <Box sx={{
            backgroundColor: alpha('#0a0908',0.7),
            height: '950px',
            width: '300px',
            borderRadius: '10px',
            boxShadow: '0 0 5px #0a0908',
            padding:'10px'
        }}>
            <table >
                <tr>
                    <td><Sort/></td>
                </tr>
                <Divider sx={{mt: '30px',mb: '10px'}}/>
                <tr>
                    <PriceFilter/>
                </tr>
                <Divider sx={{mt: '30px',mb: '10px'}}/>
                <tr>
                    <RatingFilter/>
                </tr>
                <Divider sx={{mt: '30px',mb: '10px'}}/>
                <tr>
                    <FileFormatFilter/>
                </tr>
            </table>
        </Box>
    );
}

export default SideBar;