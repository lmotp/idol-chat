import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@/layouts/Container';
import Main from '@/pages/Main';
import Login from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import { withAuthCheck } from '@/HOC/withAuthCheck';
import Home from '@/pages/Home';
import MyClass from '@/pages/MyClass';
import SeeMore from '@/pages/SeeMore';
import Search from '@/pages/Search';
import PageContainer from '@/layouts/PageContainer';
import FirstLoginCategory from '@/pages/FirstLoginCategory';
import DetailSearch from '@/pages/DetailSearch';
import Class from '@/pages/Class';
import MakeClass from '@/pages/MakeClass';
import ChatRoom from '@/pages/ChatRoom';

function App() {
  return (
    <>
      <Container>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={withAuthCheck(Main)} />
            <Route path="/login" element={withAuthCheck(Login, null)} />
            <Route path="/signup" element={withAuthCheck(SignUp, null)} />
            <Route path="/category" element={<FirstLoginCategory />} />
            <Route path="/pages/*" element={<PageContainer />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="search/:category" element={<DetailSearch />} />
              <Route path="my-class" element={<MyClass />} />
              <Route path="see-more" element={<SeeMore />} />
              <Route path="class/make" element={<MakeClass />} />
              <Route path="class/:id" element={<Class />} />
              <Route path="class/:id/chat" element={<ChatRoom />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
