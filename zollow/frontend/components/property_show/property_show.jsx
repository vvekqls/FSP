import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPhoto: 0,
      close: false,
      saved: this.props.saved,
    };

    this.closeShow = this.closeShow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  componentDidMount() {
    if (this.props.property.ownerId === null) {
      this.props.fetchProperty(this.props.match.params.propertyId)
        .then((response) => this.props.fetchOwner(response.property.owner_id));
    } else if (this.props.fetchOwner) {
      this.props.fetchOwner(this.props.property.ownerId);
    }
  }

  priceToString(price) {
    price = Math.floor(price);
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  closeShow() {
    this.setState({ close: true });
  }

  handleDelete() {
    this.props.deleteProperty(this.props.property.id);
    this.closeShow();
  }

  handleContact() {
    if (this.props.sessionId) {
      const emailTo = this.props.property.ownerEmail;
      location.href = "mailto:" + emailTo;
    } else {
      this.props.openModal('login');
    }
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

  prevImage() {
    const { currentPhoto } = this.state;
    const { amtPhotos } = this.props;

    const newPhotoPOS = currentPhoto === 0 ? amtPhotos - 1 : currentPhoto - 1;
    this.setState({ currentPhoto: newPhotoPOS });
  }

  nextImage() {
    const { currentPhoto } = this.state;
    const { amtPhotos } = this.props;
    this.setState({ currentPhoto: (currentPhoto + 1) % amtPhotos });
  }

  render() {
    const saved = window.saved;
    const unsaved = window.unsaved;

    const { address, baths, beds, ownerEmail, sale, rent, price, photos } = this.props.property;
    const type = /^\/[a-z]+/.exec(this.props.location.pathname)[0];

    let editButton = '';
    if (this.props.property && this.props.property.ownerId === this.props.sessionId) {
      const id = this.props.property.id;
      editButton = <Link className='home-header-edit' to={`/sell/${id}/edit`}>EDIT</Link>;
    }

    let deleteButton = '';
    if (this.props.property && this.props.property.ownerId === this.props.sessionId) {
      const id = this.props.property.id;
      deleteButton = <button className='home-header-delete' onClick={this.handleDelete}>DELETE</button>;
    }

    const heart = this.state.saved ?
      <button
        onClick={this.handleSave}
        className='home-header-save'>
        <img className='home-saved-image' src={saved} /> SAVE</button> :
      <button
        onClick={this.handleSave}
        className='home-header-save'>
        <img className='home-unsaved-image' src={unsaved} /> SAVE</button>;

    return (
      <div onClick={this.closeShow}
        className='home-background'>
        {this.state.close || !this.props.property.id ? <Redirect exact to={`${type}`} /> : ''}
        <div
          onClick={e => e.stopPropagation()}
          className='home-child'>
          <ul className='home-header'>
            {heart}
            <div>
              {deleteButton}
              {editButton}
              <button
                onClick={this.closeShow}
                className='home-header-close'>X CLOSE
              </button>
            </div>
          </ul>

          <div className='home-address'>
            {address}
          </div>

          <hr />

          <div className='upload-image-container'>
            <button
              className='image-traversal prev'
              onClick={this.prevImage}>{'<'}
            </button>
            <img className='upload-image'
              src={this.props.property.photos[this.state.currentPhoto]} />
            <button
              className='image-traversal next'
              onClick={this.nextImage}>{'>'}
            </button>
          </div>

          <div className='home-info'>
            <ul>
              <li className='home-info-address'>
                {address}
              </li>
              <li className='home-amenities'>
                {beds} beds &middot; {baths} baths
              </li>
            </ul>
            <ul className='home-price-info'>
              {sale ?
                <li>
                  <span className='home-type'>FOR SALE</span>
                  <span
                    className='home-price'>{`$${this.priceToString(price)}`}
                  </span>
                  <span className='home-mortgage'>EST. MORTGAGE</span>
                  <span className='mortgage-price'>{`$${this.priceToString(price / 240)}/mo`}
                  </span>
                </li>
                : ''}
              {rent ?
                <li>
                  <span className='home-type'>FOR RENT</span>
                  <span
                    className='home-price'>
                    {`$${this.priceToString(price / 240)}`}
                    <span className='rent-month'>/mo</span>
                  </span>
                </li>
                : ''}
              <li><button onClick={this.handleContact} className='contact-button'>Contact</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Property;


