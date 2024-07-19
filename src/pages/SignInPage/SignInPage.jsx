import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import SignSection from '../../components/Layout/SignSection/SignSection';
import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';

import css from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={css.body}>
      <DocumentTitle>Sign In</DocumentTitle>
      <Section>
        <SignSection>
          <Logo />
          <SignInForm />
        </SignSection>
        <div className={css.visibil}>
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default SignInPage;
