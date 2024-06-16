import { Paper, Typography } from '@mui/material'
import React from 'react'

function ChatText({message,isReply}) {
  return (
    <Paper
          elevation={0}
          sx={{
            width: "fit-content",
            ml: isReply?'default':'auto'
          }}
        >
          <Typography
            variant="h4"
            bgcolor={"gray"}
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