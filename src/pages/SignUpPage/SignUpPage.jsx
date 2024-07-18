import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import css from './SignUpPage.module.scss';

const SignUpPage = () => {
  return (
    <div className={css.bloc}>
      <DocumentTitle>Sign Up</DocumentTitle>
      <Section>
        <div>
          <h2>SignUpPage</h2>
          <Logo />
          <SignUpForm />
        </div>
        <div>
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default SignUpPage;
