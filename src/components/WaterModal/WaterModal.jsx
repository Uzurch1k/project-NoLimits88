import { useTranslation } from 'react-i18next';
import WaterForm from '../WaterForm/WaterForm';

import css from './WaterModal.module.scss';

const WaterModal = ({ onAddWater, onEditWater, onClose }) => {
  const { t } = useTranslation();
  const getTitleAndSubtitle = () => {
    if (onAddWater) {
      return {
        title: t('modals.addEdit.add'),
        subtitle: t('modals.addEdit.choose'),
      };
    } else if (onEditWater) {
      return {
        title: t('modals.addEdit.edit'),
        subtitle: t('modals.addEdit.correct'),
      };
    } else {
      return {
        title: '',
        subtitle: '',
      };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <div>
      <h2 className={css.titleModal}>{title}</h2>
      <p className={css.subtitleModal}>{subtitle}</p>
      <WaterForm onClose={onClose} />
    </div>
  );
};

export default WaterModal;
