import Modal from '../Modal/Modal';
// import WaterForm from '../WaterForm/WaterForm'; відсутній файл
import css from './WaterModal.module.scss';

// * в компоненті AddWaterBtn приблизно такий код для виклику модалки
// const [modalOpen, setModalOpen] = useState(false);
// const [operationType, setOperationType] = useState('add');
// const [initialData, setInitialData] = useState(null); * для редагування початкові дані

// const handleOpenModal = (type, data = null) => {
//   setOperationType(type);
//   setInitialData(data); * для редагування початкові дані
//   setModalOpen(true);
// };

// const handleCloseModal = () => {
//   setModalOpen(false);
// };

//return (
      //<button className={css.button} onClick={() => handleOpenModal('add')}>
        //   Add water
      // </button>
// * для редагування
//       <button className={css.button} onClick={() => handleOpenModal('edit', { id: 1, name: 'Test' })}>
//         Edit
      // </button>
//       *
      // <WaterModal
      //   isOpen={modalOpen}
      //   onClose={handleCloseModal}
      //   operationType={operationType} // Тип операції ('add' або 'edit')
      //   initialData={initialData} // Початкові дані для форми (для редагування)
      // /> )

const WaterModal = ({ isOpen, onClose, operationType, initialData }) => {
  const getTitle = (operationType) => {
    switch (operationType) {
      case 'add':
        return 'Add water';
      case 'edit':
        return 'Edit the entered amount of water';
      default:
        return 'Add water';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} classSectionBox={css.sectionBox}>
      <h2 className={css.modalTitle}>{getTitle(operationType)}</h2>
      {/* <WaterForm initialData={initialData} operationType={operationType} /> */}
    </Modal>
  );
};

export default WaterModal;
