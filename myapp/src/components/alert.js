import React from 'react';
import {Alert, AlertIcon, CloseButton} from '@chakra-ui/react'

const AlertHandler = (props) => {
    let displayProp = false
    if(props.message !== null || undefined){
        displayProp = true
    }
    return (
        <>
        {displayProp ? <Alert status='error'>
    <AlertIcon />
    {props.message}
    <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => props.setMessage(null)}/>
  </Alert> : <></>}
        </>
        
    )
}

export default AlertHandler;