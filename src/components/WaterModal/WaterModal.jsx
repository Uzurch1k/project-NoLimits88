import WaterForm from '../WaterForm/WaterForm'; 
import css from './WaterModal.module.scss';

const WaterModal = ({operationType, initialData }) => {
//   const getTitle = operationType => {
//     switch (operationType) {
//       case 'add':
//         return 'Add water';
//       case 'edit':
//         return 'Edit the entered amount of water';
//       default:
//         return 'Add water';
//     }
//   };

  return (
    <div>
          {<h2 className={css.modalTitle}>
              {/* {getTitle(operationType)}  */}
              Add water
          </h2>}
      <WaterForm
        // initialData={initialData}
        // operationType={operationType}
      />
    </div>
  );
};

export default WaterModal;
