import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import SignSection from '../../components/Layout/SignSection/SignSection';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import css from './SignUpPage.module.scss';

const SignUpPage = () => {
  return (
    <div className={css.body}>
      <DocumentTitle>Sign Up</DocumentTitle>
      <Section>
        <SignSection>
          <Logo />
          <SignUpForm />
        </SignSection>
        <div className={css.visibil}>
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default SignUpPage;
