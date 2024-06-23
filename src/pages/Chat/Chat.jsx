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
import LoadingButton from '@mui/lab/LoadingButton';

//styles
import "./Chat.css";

import API from "../../api";
import Components from "../../components/ChatText";
import { useRef, useState } from "react";
import utils from "../../utils";

const Chat = () => {

  const [conversation, setConversation] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);

  const messageHistoryRef = useRef();

  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  }

  const scrollToBottom = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear input
    setUserPrompt('');

    setLoadingResponse(true);

    //add prompt to conversation
    const currConversation = [...conversation];

    currConversation.push({
      'role': 'user',
      'parts': [
        {
          "text": userPrompt
        }
      ]
    });

    setConversation(currConversation)

    //api call
    let reply = await API.chatCompletionAPI({ conversation: currConversation });

    // convert reply md to html
    reply = {
      ...reply,
      parts: [{
        text: utils.convertMDtoHTML(reply?.parts[0]?.text)
      }],
    };


    setConversation((prevConversation) => {
      return [...prevConversation, reply]
    })


    setLoadingResponse(false);

    // scrollToBottom(messageHistoryRef);
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
          padding: "20px 20px",
          marginBottom: "20px"
        }}
        display={"flex"}
        flexDirection="column"
        gap={4}
        ref={messageHistoryRef}
      >
        {
          conversation?.map((content) => {

            return <Components.ChatText key={Math.random() * 1000000 + 1} style={{ 'maxWidth': '80%', }} message={content?.parts[0]?.text} isReply={content.role === 'model'} />
          })
        }
      </Box>
      <Box
        className="chat-action-items-container"
      >
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          width: "100%"
        }}>
          <TextField value={userPrompt} onChange={handleUserPromptChange} fullWidth placeholder="Ask anything....." />
          <LoadingButton loading={loadingResponse} aria-label="send" color="primary" size="large" type="submit">
            <SendIcon />
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
