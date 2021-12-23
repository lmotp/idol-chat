import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './layouts/Container';
import { createGlobalStyle } from 'styled-components';
import Main from './pages/Main';
import Login from './pages/Login';
import { SignUp } from './pages/SignUp';
import { withAuthCheck } from './HOC/withAuthCheck';

import Home from './pages/Home';
import MyClass from './pages/MyClass';
import SeeMore from './pages/SeeMore';
import Search from './pages/Search';
import PageContainer from './layouts/PageContainer';

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

  a {
    text-decoration: none;
    color:inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={withAuthCheck(Main)} />
            <Route path="/login" element={withAuthCheck(Login, null)} />
            <Route path="/signup" element={withAuthCheck(SignUp, null)} />
            <Route path="/pages/*" element={withAuthCheck(PageContainer, true)}>
              <Route path="home" index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="my-class" element={<MyClass />} />
              <Route path="see-more" element={<SeeMore />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
