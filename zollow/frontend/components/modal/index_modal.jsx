// import React from 'react';
// import { closeModal } from '../../actions/modal_actions';
// import { connect } from 'react-redux';

// import IndexPriceFilter from '../filter_modals/index_nav_price';
// import IndexBedsFilter from '../filter_modals/index_nav_beds';
// import IndexBathsFilter from '../filter_modals/index_nav_baths';

// function FilterModal({ modal, closeModalCB }) {
//   if (!modal) {
//     return null;
//   }
//   let component;
//   let filterType = '';

//   switch (modal) {
//     case 'price':
//       component = <IndexPriceFilter />;
//       filterType = 'price';
//       break;
//     case 'beds':
//       component = <IndexBedsFilter />;
//       filterType = 'beds';
//       break;
//     case 'baths':
//       component = <IndexBathsFilter />;
//       filterType = 'baths';
//       break;
//     default:
//       return null;
//   }
//   return (
//     <div className='modal-background filter' onClick={closeModalCB}>
//       <div className={`modal-child ${filterType}`} onClick={e => e.stopPropagation()}>
//         {component}
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = state => {
//   return {
//     modal: state.ui.modal
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     closeModalCB: () => dispatch(closeModal())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);