import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SetAvatar from './components/SetAvatar';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';

export default function App() {
  const [isKeyboardopen, setkeyboardopen] = useState(false);
  const [initialHeight, setinitialHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.visualViewport.addEventListener('resize', (event) => {
      console.log('resize');
      setkeyboardopen(!isKeyboardopen);
    });
  }, []);

  useEffect(() => {
    // let initialWidth = window.innerWidth;
    // let initialHeight = window.innerHeight;
    // window.visualViewport.addEventListener('resize', (event) => {
    //   console.log('showkeyboard');
    if (isKeyboardopen) {
      console.log('opened');
      document.documentElement.style.setProperty('overflow', 'scroll');
      console.log(initialHeight);
      const metaViewport = document.querySelector('meta[name=viewport]');
      metaViewport.setAttribute(
        'content',
        'height=' +
          initialHeight +
          'px, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      );
    } else {
      console.log('closed');
      document.documentElement.style.setProperty('overflow', 'hidden');
      const metaViewport = document.querySelector('meta[name=viewport]');
      metaViewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      );
      setinitialHeight(window.innerHeight);
    }
    // });
  }, [isKeyboardopen]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
