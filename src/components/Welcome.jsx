import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
import Logout from './Logout';

export default function Welcome() {
  const [userName, setUserName] = useState('');
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <>
      <Container>
        <div className='logoutContainer'>
          <Logout />
        </div>
        <img src={Robot} alt='' />
        <h1>
          Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: white;
  flex-direction: column;
  background: linear-gradient(rgb(78 57 216), rgb(216 9 177 / 40%));
  img {
    height: 20rem;
  }
  span {
    /* color: #4e0eff; */
    color: #007aff;
  }
  .logoutContainer {
    width: 100%;
  }
`;
