import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import { Header, Footer, Modal, Error } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ERROR } from './constants';
import { setUser } from './actions';

const Page = styled.div``;
const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
`;

export const Blog = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);
  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Authorization />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/post/" element={<Post />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/post/:id/edit" element={<Post />}></Route>
          <Route
            path="*"
            element={<Error error={ERROR.PAGE_NOT_EXIST} />}
          ></Route>
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
};
