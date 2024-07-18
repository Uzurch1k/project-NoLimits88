import Wrapper from '../Layout/Wrapper/Wrapper';
import Header from '../Header/Header';
import Main from '../Layout/Main/Main';
import Footer from '../Footer/Footer';
import Section from '../Layout/Section/Section';

import './App.scss';

function App() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Section></Section>
      </Main>
      <Footer />
    </Wrapper>
  );
}

export default App;
