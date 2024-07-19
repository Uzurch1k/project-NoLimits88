import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';

import css from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={css.bloc}>
      <DocumentTitle>Sign In</DocumentTitle>
      <Section>
        <div>
          <h2>SignInPage</h2>
          <Logo />
          <SignInForm />
        </div>
        <div className={css.visibil}>
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default SignInPage;
