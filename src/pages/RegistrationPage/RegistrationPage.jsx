import Section from '../../components/Layout/Section/Section';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';

import css from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  return (
    <Section>
      <DocumentTitle>Register</DocumentTitle>
      <RegistrationForm />
    </Section>
  );
};

export default RegistrationPage;
