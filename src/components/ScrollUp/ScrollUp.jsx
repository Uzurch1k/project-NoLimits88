import { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import css from './ScrollUp.module.scss';

const ScrollUp = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${css.scroll} ${showButton && css.show}`}
    >
      <IoIosArrowUp />
    </button>
  );
};

export default ScrollUp;
