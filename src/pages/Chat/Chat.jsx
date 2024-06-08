import { Box, Container, Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//styles
import "./Chat.css";

const Chat = () => {
  return (
    <Box
      fullWidth
      display={"flex"}
      flexDirection="column"
      height="100vh"
      ml={"20px"}
      mr={"20px"}
    >
      <Box
        flexGrow={1}
        fullWidth
        className="chat-message-history-container"
      ></Box>
      <Box display={'flex'} flexDirection={'row'} fullWidth className="chat-action-items-container">
        <TextField fullWidth flexGrow={1} placeholder="Ask anything....." />
        <IconButton aria-label="send" color="primary" size="large">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
