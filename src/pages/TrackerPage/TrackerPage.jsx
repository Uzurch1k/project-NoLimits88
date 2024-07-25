import { useState } from 'react';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import BaseModal from '../../components/BaseModal/BaseModal';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';
// import WaterModal from '../../components/WaterModal/WaterModal';
// import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';

import css from './TrackerPage.module.scss';

const TrackerPage = () => {
  const [modals, setModals] = useState({
    logout: false,
    settings: false,
    water: false,
    deletewater: false,
  });

  const openModal = modalName =>
    setModals(prev => ({ ...prev, [modalName]: true }));

  const closeModal = modalName =>
    setModals(prev => ({ ...prev, [modalName]: false }));

  return (
    <div className={css.body}>
      <DocumentTitle>Tracker</DocumentTitle>
      <Section>
        <WaterMainInfo openWaterModal={() => openModal('water')} />

        <WaterDetailedInfo
          openSettings={() => openModal('settings')}
          openLogout={() => openModal('logout')}
          openWaterModal={() => openModal('water')}
          openDeleteWaterModal={() => openModal('deletewater')}
        />
      </Section>

      <BaseModal
        isOpen={modals.settings}
        onClose={() => closeModal('settings')}
        classNameModal={css.settingsModal}
      >
        <UserSettingsModal />
      </BaseModal>

      <BaseModal
        isOpen={modals.logout}
        onClose={() => closeModal('logout')}
        classNameModal={css.logoutModal}
      >
        <LogOutModal onClose={() => closeModal('logout')}/>
      </BaseModal>

      {/* <BaseModal
        isOpen={modals.water}
        onClose={() => closeModal('water')}
        classNameModal={css.waterModal}
      >
        <WaterModal />
      </BaseModal> */}

      {/* <BaseModal
        isOpen={modals.deletewater}
        onClose={() => closeModal('deletewater')}
        classNameModal={css.deletewaterModal}
      >
        <DeleteWaterModal onClose={() => closeModal('deletewater')}/>
      </BaseModal> */}
    </div>
  );
};

export default TrackerPage;
