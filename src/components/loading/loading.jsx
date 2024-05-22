import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const loading = () => {

  
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100dvh'
  }

  return (
    <div styles={styles}>
        <CircularProgress color="success" />
    </div>
    
  )
}

export default loading