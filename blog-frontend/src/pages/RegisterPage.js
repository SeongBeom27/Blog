import React from 'react';
import AuthTemplate from '../auth/AuthTemplate';
import AuthForm from '../auth/AuthForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register"></AuthForm>
    </AuthTemplate>
  );
};

export default RegisterPage;
