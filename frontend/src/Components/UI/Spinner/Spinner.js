import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Spinner = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress color="secondary"/>
            </Backdrop>
        </Box>
    );
};


export default Spinner;