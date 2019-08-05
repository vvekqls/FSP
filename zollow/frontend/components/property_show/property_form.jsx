import React from 'react';
import { Redirect } from 'react-router-dom';
import merge from 'lodash/merge';

class PropertyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = merge({
      close: false, lat: null, lng: null,
      validAddress: null, disabled: true,
      disabledClass: 'disabled', submit: false,
      photoUrl: [], currentPhoto: 0, amtPhotos: 0
    }, props.property);

    this.closeShow = this.closeShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handeChange = this.handleChange.bind(this);
    this.handleRentSell = this.handleRentSell.bind(this);
    this.setDisability = this.setDisability.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.property.streetAddress !== prevProps.property.streetAddress) {
      this.setState(this.props.property);
    }
  }

  closeShow() {
    this.setState({ close: true });
    this.props.changeFilter(this.props.prevLoc, true);
  }

  handleFile(e) {
    const files = Object.values(e.currentTarget.files);
    this.setState({ photos: files, amtPhotos: files.length });

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          this.setState({ photoUrl: this.state.photoUrl.concat([fileReader.result]) });
        };

        fileReader.readAsDataURL(files[i]);
      }
    } else {
      this.setState({ photoUrl: '' });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('property[address]', this.state.address);
    formData.append('property[baths]', this.state.baths);
    formData.append('property[beds]', this.state.beds);
    formData.append('property[price]', this.state.price);
    formData.append('property[sale]', this.state.sale);
    formData.append('property[rent]', this.state.rent);
    formData.append('property[latitude]', this.state.lat);
    formData.append('property[longitude]', this.state.lng);
    this.state.photos.forEach((photo) => {
      formData.append('property[photos][]', photo);
    });

    this.props.processProperty(formData,
      this.props.property.id).then((response) => {
        this.setState({ id: response.property.id, submit: true });
      });
  }

  handleChange(type) {
    return (e) => {
      let val = e.target.value;
      if (type === 'baths' || type === 'beds') val = parseInt(val);
      if (type === 'price') val = parseInt(/\d+/.exec(val));
      this.setState({ [type]: val }, this.handleValidAddress);
    };
  }

  setDisability() {
    if (this.state.validAddress && this.handleValidSubmit()) {
      this.setState({ disabled: false, disabledClass: '' });
    } else {
      this.setState({ disabled: true, disabledClass: 'disabled' });
    }
  }

  handleRentSell(e) {
    switch (e.target.value) {
      case 'rent':
        this.setState({ rent: true, sale: false }, this.handleValidAddress);
        break;
      case 'sale':
        this.setState({ rent: false, sale: true }, this.handleValidAddress);
        break;
      case 'both':
        this.setState({ rent: true, sale: true }, this.handleValidAddress);
        break;
      default:
        return;
    }
  }

  getLatLng(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }, () => {

          if (this.state.lat !== null, this.state.lng !== null) {
            this.setState({ validAddress: true, address }, this.setDisability);
          }
        });
      }
    }.bind(this));
  }

  handleValidSubmit() {
    const { baths, beds, sale, rent, price } = this.state;
    return baths > 0 && beds > 0 && price > 0 && sale !== null && rent !== null;
  }

  handleValidAddress() {
    const { streetAddress, city, state, zip, lat, lng } = this.state;
    if (streetAddress !== '', city !== '', state !== '', zip !== '') {
      const address = [streetAddress, city, state, zip].join(', ');
      this.getLatLng(address);
    }
  }

  prevImage() {
    const { currentPhoto, amtPhotos } = this.state;
    const newPhotoPOS = currentPhoto === 0 ? amtPhotos - 1 : currentPhoto - 1;
    this.setState({ currentPhoto: newPhotoPOS });
  }

  nextImage() {
    const { currentPhoto, amtPhotos } = this.state;
    this.setState({ currentPhoto: (currentPhoto + 1) % amtPhotos });
  }

  render() {
    let saleRent;
    let errorText = '';

    if (this.state.sale && this.state.rent) {
      saleRent = 'both';
    } else if (this.state.sale) {
      saleRent = 'sale';
    } else if (this.state.rent) {
      saleRent = 'rent';
    } else {
      saleRent = 'Type';
    }

    if (this.state.validAddress === false) {
      errorText = 'Invalid Address';
    }

    if (this.props.errors.length > 0) {
      this.props.errors.map(err => {
        if (err.includes('Latitude')) {
          errorText += 'Address is already taken';
        } else {
          errorText += err;
        }
      });
    }

    let redirectPath = '';
    if (this.state.sale) {
      redirectPath = 'buy';
    } else {
      redirectPath = 'rent';
    }

    const preview = this.state.photoUrl.length > 0 ?
      <div className='upload-image-container'>
        <button
          className='image-traversal prev'
          onClick={this.prevImage}>{'<'}
        </button>
        <img className='upload-image'
          src={this.state.photoUrl[this.state.currentPhoto]} />
        <button
          className='image-traversal next'
          onClick={this.nextImage}>{'>'}
        </button>
      </div> : '';

    return (
      <div
        onClick={this.closeShow}
        className='home-background'
      >
        {this.state.submit ? <Redirect to={`/${redirectPath}/${this.state.id}`} /> : ''}
        {!this.state.userId ? <Redirect exact to='/' /> : ''}
        {this.state.close ? <Redirect exact to={`/${this.props.prevLoc}`} /> : ''}
        <div
          onClick={e => e.stopPropagation()}
          className='home-child manage'>

          <div className='home-header'>
            <button
              onClick={this.closeShow}
              className='home-header-close new-home'>X CLOSE
            </button>
          </div>

          <div className='new-home-title'>
            <h1>Home information</h1>
            <hr />
            <span className='home-errors'>{errorText}</span>
          </div>
          <div className='manage-home-form'>
            <div className='manage-home-info'>
              <label className='new-home-label'>Address</label>
              <input
                onChange={this.handleChange('streetAddress')}
                className='new-home-input'
                placeholder='Address'
                value={this.state.streetAddress}></input>
              <label className='new-home-label'>City</label>
              <input
                onChange={this.handleChange('city')}
                className='new-home-input'
                placeholder='City'
                value={this.state.city}></input>
              <label className='new-home-label'>State</label>
              <input
                onChange={this.handleChange('state')}
                className='new-home-input'
                placeholder='State'
                value={this.state.state}></input>
              <label className='new-home-label'>Zip Code</label>
              <input
                onChange={this.handleChange('zip')}
                className='new-home-input'
                placeholder='Zip Code'
                value={this.state.zip}></input>
            </div>
            <div className='manage-home-amenities'>
              <label className='new-home-label'>Number of Beds</label>
              <select
                onChange={this.handleChange('beds')}
                className='new-home-dropdown'
                defaultValue={this.state.beds === 0 ? 'Beds' : this.state.beds}>
                <option className='new-home-option' disabled>Beds</option>
                <option className='new-home-option' value='1'>1</option>
                <option className='new-home-option' value='2'>2</option>
                <option className='new-home-option' value='3'>3</option>
                <option className='new-home-option' value='4'>4</option>
                <option className='new-home-option' value='5'>5</option>
                <option className='new-home-option' value='6+'>6+</option>
              </select>
              <label className='new-home-label'>Number of Baths</label>
              <select
                onChange={this.handleChange('baths')}
                className='new-home-dropdown'
                defaultValue={this.state.baths === 0 ? 'Baths' : this.state.baths}>
                <option className='new-home-option' disabled>Baths</option>
                <option className='new-home-option' value='1'>1</option>
                <option className='new-home-option' value='2'>2</option>
                <option className='new-home-option' value='3'>3</option>
                <option className='new-home-option' value='4'>4</option>
                <option className='new-home-option' value='5'>5</option>
                <option className='new-home-option' value='6+'>6+</option>
              </select>
              <label className='new-home-label'>Sell or Rent</label>
              <select
                onChange={this.handleRentSell}
                className='new-home-dropdown'
                defaultValue={saleRent}>
                <option className='new-home-option' disabled>Type</option>
                <option className='new-home-option' value='sale'>Sell</option>
                <option className='new-home-option' value='rent'>Rent</option>
                <option className='new-home-option' value='both'>Both</option>
              </select>
              <label className='new-home-label'>Asking Price</label>
              <input
                onChange={this.handleChange('price')}
                className='new-home-input price-in'
                placeholder='$'
                value={this.state.price > 0 ? this.state.price : ''}></input>
            </div>
            <div>
              <button disabled={this.state.disabled} onClick={this.handleSubmit} className={`home-submit ${this.state.disabledClass}`}>Submit</button>
            </div>
          </div>
          <div className='add-image-button'>
            <label className='new-home-label'>Attach Images</label>
            <input onChange={this.handleFile} type='file' multiple />
          </div>
          {preview}
        </div>
      </div>
    );
  }
}

export default PropertyForm;
