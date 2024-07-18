import Section from '../../components/Layout/Section/Section';
import LoginForm from '../../components/LoginForm/LoginForm';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';

import css from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <Section>
      <DocumentTitle>Log In</DocumentTitle>
      <LoginForm />
    </Section>
  );
};

export default LoginPage;
