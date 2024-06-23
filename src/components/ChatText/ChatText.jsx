import { Paper, Typography } from '@mui/material'
import React from 'react'

function ChatText({message,isReply, style}) {
  return (
    <Paper
          elevation={0}
          sx={{
            width: "fit-content",
            ml: isReply?'default':'auto',
            ...style
          }}
        >
          <Typography
            variant="h4"
            bgcolor={"#e3e3e3"}
            sx={{
              width: "fit-content",
              padding: "20px",
              borderRadius: isReply?"0px 10px 10px 10px":"10px 0px 10px 10px",
            }}
          >
            {message}
          </Typography>
        </Paper>
  )
}

export default ChatText