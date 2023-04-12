import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import './MyAlert.css';


const MyAlert = ({alertText, alertTitle}) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
          <Alert severity="error" onClick={() => setShow(false)}>{alertText}</Alert>
        );
    };
};


export default MyAlert;