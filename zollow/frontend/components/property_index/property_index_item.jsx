import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { createSave, deleteSave } from '../../actions/save_actions';
import { openModal } from '../../actions/modal_actions';

class PropertyIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { saved: this.props.saved };
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    if (!this.props.loggedIn) {
      this.props.openModal('login');
    } else if (this.state.saved) {
      this.setState({ saved: false });
      this.props.deleteSave(this.props.property.id);
    } else {
      this.setState({ saved: true });
      this.props.createSave(this.props.property.id);
    }
  }

  componentDidUpdate() {
    if (this.props.saved !== this.state.saved) {
      this.setState({ saved: this.props.saved });
    }
  }

  render() {
    const { property } = this.props;
    const saved = window.saved;
    const unsaved = window.unsaved;

    let price = 0;
    let beds = '$';

    if (property) {
      price = property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      beds = property.beds === 1 ? 'bd' : 'bds';
    }

    const heart = this.state.saved ?
      <button
        onClick={this.handleSave}
        className='index-save-button'><img className='index-saved-image' src={saved} /></button> :
      <button
        onClick={this.handleSave}
        className='index-save-button'><img className='index-unsaved-image' src={unsaved} /></button>;

    return (
      <li className='index-item'>
        <div className='index-save'>
          {heart}
        </div>
        <Link
          to={`/${this.props.type}/${property.id}`}
          className='home-show-link'
        >
          <div className='thumbnail-image-container'>
            <div className='thumbnail-image-gradient' />
            {/* {
              <img className='thumbnail-image' src={property.photos[0]} />
            } */}
          </div>
          <div className='index-item-data'>
            <div className='index-item-info'>
              <span className='index-item-price'>${price}</span>&middot;
              <span className='index-item-room'>{property.beds} beds</span>&middot;
              <span className='index-item-room'>{property.baths} ba</span>
            </div>
            <div className='index-item-address'>
              {property.address}
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

const msp = state => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};

const mdp = dispatch => {
  return {
    createSave: (propertyId) => dispatch(createSave(propertyId)),
    deleteSave: (propertyId) => dispatch(deleteSave(propertyId)),
    openModal: modal => dispatch(openModal(modal))
  };
};

export default connect(msp, mdp)(PropertyIndexItem);
