import { useState } from 'react';

import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import BaseModal from '../../components/BaseModal/BaseModal';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';
import WaterModal from '../../components/WaterModal/WaterModal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';

import css from './TrackerPage.module.scss';

const TrackerPage = () => {
  const [modals, setModals] = useState({
    logout: false,
    settings: false,
    addWater: false,
    editWater: false,
    deletewater: false,
  });

  const openModal = modalName =>
    setModals(prev => ({ ...prev, [modalName]: true }));

  const closeModal = modalName =>
    setModals(prev => ({ ...prev, [modalName]: false }));

  const closeMultipleModals = (...modalNames) =>
    setModals(prev =>
      modalNames.reduce((acc, modalName) => ({ ...acc, [modalName]: false }), {
        ...prev,
      })
    );

  return (
    <div className={css.body}>
      <DocumentTitle>Tracker</DocumentTitle>
      <Section>
        <WaterMainInfo openAddWaterModal={() => openModal('addWater')} />

        <WaterDetailedInfo
          openSettings={() => openModal('settings')}
          openLogout={() => openModal('logout')}
          openAddWaterModal={() => openModal('addWater')}
          openEditWaterModal={() => openModal('editWater')}
          openDeleteWaterModal={() => openModal('deletewater')}
        />
      </Section>

      <BaseModal
        isOpen={modals.settings}
        onClose={() => closeModal('settings')}
        classNameModal={css.settingsModal}
      >
        <UserSettingsModal onClose={() => closeModal('settings')} />
      </BaseModal>

      <BaseModal
        isOpen={modals.logout}
        onClose={() => closeModal('logout')}
        classNameModal={css.logoutModal}
      >
        <LogOutModal onClose={() => closeModal('logout')} />
      </BaseModal>

      <BaseModal
        isOpen={modals.addWater || modals.editWater}
        onClose={() => closeMultipleModals('addWater', 'editWater')}
        classNameModal={css.waterModal}
      >
        <WaterModal
          onAddWater={modals.addWater}
          onEditWater={modals.editWater}
        />
      </BaseModal>

      <BaseModal
        isOpen={modals.deletewater}
        onClose={() => closeModal('deletewater')}
        classNameModal={css.deletewaterModal}
      >
        <DeleteWaterModal onClose={() => closeModal('deletewater')} />
      </BaseModal>
    </div>
  );
};

export default TrackerPage;
