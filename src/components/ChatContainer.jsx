import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import MediaQuery from 'react-responsive';
import { IoIosArrowDropleft } from 'react-icons/io';

export default function ChatContainer({ currentChat, socket, toggleChange }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      sendername: data.username,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (data) => {
        setArrivalMessage({ fromSelf: false, message: data.msg, data: data });
      });
    }
  }, []);

  useEffect(() => {
    if (currentChat?._id == arrivalMessage?.data?.from) {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    } else if (arrivalMessage?.data?.sendername) {
      toast('Messages from ' + arrivalMessage?.data?.sendername, toastOptions);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const changeCurrentChat = () => {
    console.log('button clicked');
    toggleChange();
  };
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <MediaQuery maxWidth={600}>
            <Button onClick={() => changeCurrentChat()}>
              <IoIosArrowDropleft />
            </Button>
          </MediaQuery>
          <div className='avatar'>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=''
            />
          </div>
          <div className='username'>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className='chatmsgwrapper'>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='content '>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    overflow: scroll;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    background: linear-gradient(rgb(78 57 216), rgb(216 9 177 / 40%));
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      /* gap: 1rem; */
      .avatar {
        margin-right: 1rem;
        img {
          height: 3rem;
        }
      }
      .username {
        margin-right: 1rem;
        h3 {
          color: white;
        }
      }
      @media screen and (max-width: 600px) {
        .username {
          overflow-x: hidden;

          h3 {
            color: white;
            width: 100px;
          }
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .chatmsgwrapper {
      margin-bottom: 1rem;
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        /* background-color: #4f04ff21; */
        /* background: linear-gradient(
          rgb(99 134 222 / 73%),
          rgb(22 42 160 / 92%)
        ); */
        background: #007aff;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        /* background-color: #9900ff20; */
        background: linear-gradient(
          rgb(235 61 222 / 85%),
          rgb(207 27 85 / 88%)
        );
      }
    }
    .Toastify .Toastify__toast-theme--light {
      color: black;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  /* background-color: #9a86f3; */
  background: #007aff;
  border: none;
  /* margin-right: 1rem; */
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  :hover {
  }
  float: left;
  margin: 0.5rem;
`;
