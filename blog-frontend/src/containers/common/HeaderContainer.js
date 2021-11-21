import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  // useSelector hooks를 사용해 현재 store의 state user값을 획득
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout}></Header>;
};

export default HeaderContainer;
