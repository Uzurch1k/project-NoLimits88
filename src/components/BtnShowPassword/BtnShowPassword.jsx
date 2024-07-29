import { useRef } from 'react';

import icons from '../../img/icons/symbol.svg';
import css from './BtnShowPassword.module.scss';

const BtnShowPassword = ({ setIsPasswordVisible }) => {
  const btnRef = useRef();
  const toggleBtn = () => {
    const svgElement = btnRef.current.firstElementChild;

    if (svgElement.dataset.eye === 'closed') {
      svgElement.remove();
      btnRef.current.insertAdjacentHTML(
        'afterbegin',
        `<svg width="20" height="20" class=${css.eye} data-eye="opened">
        <use href=${icons}#icon-eye-on></use>
        </svg>`
      );
      setIsPasswordVisible(true);

      return;
    }

    if (svgElement.dataset.eye === 'opened') {
      svgElement.remove();
      btnRef.current.insertAdjacentHTML(
        'afterbegin',
        `<svg width="20" height="20" class=${css.eye} data-eye="closed">
        <use href=${icons}#icon-eye-off></use>
        </svg>`
      );
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
        <use href={`${icons}#icon-eye-off`}></use>
      </svg>
    </button>
  );
};

export default BtnShowPassword;
