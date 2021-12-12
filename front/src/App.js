import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './layouts/Container';
import { createGlobalStyle } from 'styled-components';
import Main from './pages/Main';
import Login from './pages/Login';
import { SignUp } from './pages/SignUp';

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  body {
    background: #e9ecef;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
