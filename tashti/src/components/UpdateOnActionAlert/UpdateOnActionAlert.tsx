import { Alert } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { AlertMessageProps } from '../../common/types';
import { useNavigate } from 'react-router-dom';




function UpdateOnActionAlert(props: AlertMessageProps) {
    const chooseIcon = () => {
        switch (props.severity) {
            case "success":
                return <CheckIcon />
            case "error":
                return <PriorityHighIcon />
        }
    }
    return (
        <Alert severity={props.severity} icon={chooseIcon()}>
            {props.message}
        </Alert>
    )
}

export default UpdateOnActionAlert