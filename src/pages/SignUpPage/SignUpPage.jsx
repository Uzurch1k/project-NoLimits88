import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import SignSection from '../../components/Layout/SignSection/SignSection';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Languages from '../../components/Languages/Languages';
import { useTranslation } from 'react-i18next';

import css from './SignUpPage.module.scss';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <div className={css.body}>
      <DocumentTitle>{t('page.signUp')}</DocumentTitle>

      <Section>
        <Languages />

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
