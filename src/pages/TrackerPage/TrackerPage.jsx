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
        <div>
          <h2>TrackerPage</h2>
          <WaterMainInfo openWaterModal={() => openModal('water')} />
        </div>
        <div>
          <WaterDetailedInfo
            openSettings={() => openModal('settings')}
            openLogout={() => openModal('logout')}
            openWaterModal={() => openModal('water')}
            openDeleteWaterModal={() => openModal('deletewater')}
          />
        </div>

        <BaseModal
          isOpen={modals.settings}
          onClose={() => closeModal('settings')}
        >
          <UserSettingsModal />
        </BaseModal>

        <BaseModal isOpen={modals.logout} onClose={() => closeModal('logout')}>
          <LogOutModal title="Log out" />
        </BaseModal>

        {/* <BaseModal isOpen={modals.water} onClose={() => closeModal('water')}>
          <WaterModal title="Add water" />
        </BaseModal> */}

        {/* <BaseModal
          isOpen={modals.deletewater}
          onClose={() => closeModal('deletewater')}
        >
          <DeleteWaterModal title="Delete entry" />
        </BaseModal> */}
      </Section>
    </div>
  );
};

export default TrackerPage;
