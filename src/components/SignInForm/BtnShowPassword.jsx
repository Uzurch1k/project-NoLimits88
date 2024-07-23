import { useRef } from 'react';
import icons from '../../img/icons/icons.svg';
import css from './SignInForm.module.scss';

const BtnShowPassword = ({ setIsPasswordVisible }) => {
  const btnRef = useRef();

  const toggleBtn = () => {
    const svgElement = btnRef.current.firstElementChild;

    if (svgElement.dataset.eye === 'closed') {
      svgElement.firstElementChild.href.baseVal =
        '/src/img/icons/icons.svg#opened-eye';
      svgElement.dataset.eye = 'opened';
      setIsPasswordVisible(true);
      return;
    }

    if (svgElement.dataset.eye === 'opened') {
      svgElement.firstElementChild.href.baseVal =
        '/src/img/icons/icons.svg#closed-eye';
      svgElement.dataset.eye = 'closed';
      setIsPasswordVisible(false);
      return;
    }
  };

  return (
    <button
      type="button"
      ref={btnRef}
      onClick={toggleBtn}
      className={css.showPwdBtn}
    >
      <svg width="20" height="20" className={css.eye} data-eye="closed">
        <use href={`${icons}#closed-eye`}></use>
      </svg>
    </button>
  );
};

export default BtnShowPassword;
