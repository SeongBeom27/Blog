import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  // useSelector hooks를 사용해 현재 store의 state user값을 획득
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return <Header user={user}></Header>;
};

export default HeaderContainer;
