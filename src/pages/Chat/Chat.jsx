import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//styles
import "./Chat.css";

import API from "../../api";
import Components from "../../components/ChatText";
import { useState } from "react";

const Chat = () => {

  const [conversation, setConversation]= useState([]);
  const [userPrompt, setUserPrompt] = useState('');


  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //add prompt to conversation
    const currConversation = [...conversation];

    currConversation.push({
      'role':'user',
      'parts':[
        {
          "text":userPrompt
        }
      ]
    });

    setConversation(currConversation)

    //api call
    const reply = await API.chatCompletionAPI({conversation:currConversation});

    setConversation((prevConversation) => {
      return [...prevConversation,reply]
    })

    // clear input
    setUserPrompt('');
  }

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      height="100vh"
      padding={"20px"}
    >
      <Box
        flexGrow={1}
        className="chat-message-history-container"
        sx={{
          overflow: "auto",
        }}
         display={"flex"}
      flexDirection="column"
        gap={4}
      >
        {
          conversation?.map((content) => {
          return <Components.ChatText style={{'maxWidth':'80%',}} message={content?.parts[0]?.text} isReply={content.role === 'model'} />
          })
        }
      </Box>
      <Box
        className="chat-action-items-container"
      >
        <form onSubmit={handleSubmit} style={{
          display:'flex',
          width:"100%"
        }}>
        <TextField value={userPrompt} onChange={handleUserPromptChange} fullWidth placeholder="Ask anything....." />
        <IconButton aria-label="send" color="primary" size="large" type="submit">
          <SendIcon />
        </IconButton>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
