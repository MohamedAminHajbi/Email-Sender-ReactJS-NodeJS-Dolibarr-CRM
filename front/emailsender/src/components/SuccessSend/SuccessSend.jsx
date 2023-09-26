import React from 'react'
import "./SuccessSend.css"
import emailSent from "../../assets/success.gif"
import { Button } from '@mui/material'

const SuccessSend = () => {
  return (
    <div className='succesSend-container'>
        <img className='sent-img' src={emailSent} alt="" />
        <div>Email sent successfully !</div>
        <Button id='btn-back' variant="contained"
          sx={{
            backgroundColor: '#0F1B4C',
            width: "200px",
             fontWeight: 200,
            '&:hover': { backgroundColor: '#fff', color: '#0F1B4C' },
          }}>Go back</Button>
    </div>
  )
}

export default SuccessSend