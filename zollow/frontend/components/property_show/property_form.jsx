import React from 'react';
import { Redirect} from 'react-router-dom';
import merge from 'lodash/merge';

class PropertyForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = merge({
      close: false, 
      lat: null, 
      lng: null,
      validAddress: null, 
      disabled: true,
      disabledClass: 'disabled', 
      submit: false,
      photoUrl: [], 
      currentPhoto: 0, 
      amtPhotos: 0,
      id: null
    }, props.property);
    

    this.closeShow = this.closeShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeShow() {
    this.setState({ close: true });
    // this.props.changeFilter(this.props.prevLoc, true);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('property[address]', this.state.address);
    formData.append('property[beds]', this.state.beds);
    formData.append('property[baths]', this.state.baths);
    formData.append('property[sale]', this.state.sale);
    formData.append('property[rent]', this.state.rent);
    formData.append('property[price]', this.state.price);
    formData.append('property[latitude]', this.state.lat);
    formData.append('property[longitude]', this.state.lng);
    // this.state.photos.forEach((photo) => {
    //   formData.append('property[photos][]', photo);
    // });
    debugger
    this.props.processHome(formData, this.props.property.id).then((response) => {
      this.setState({ id: response.property.id, submit: true });
    });
  }
  render() {
    return(
      <div className='home-header'>
        <div>
          <button
            onClick={this.closeShow}
            className='home-header-close new-home'>X CLOSE
            {this.state.close ? <Redirect exact to='/properties' /> : ''}
          </button>
        </div>
        <div className='new-home-title'>
          <h1>Property Information</h1>
        </div>
              <div className='manage-home-form'>
                <div className='manage-home-info'>
                  <label className='new-home-label'>Address</label>
                  <input
                    // onChange={this.handleChange('streetAddress')}
                    className='new-home-input'
                    placeholder='Address'
                    value={this.state.streetAddress}></input>
                  <label className='new-home-label'>City</label>
                  <input
                    // onChange={this.handleChange('city')}
                    className='new-home-input'
                    placeholder='City'
                    value={this.state.city}></input>
                  <label className='new-home-label'>State</label>
                  <input
                    // onChange={this.handleChange('state')}
                    className='new-home-input'
                    placeholder='State'
                    value={this.state.state}></input>
                  <label className='new-home-label'>Zip Code</label>
                  <input
                    // onChange={this.handleChange('zip')}
                    className='new-home-input'
                    placeholder='Zip Code'
                    value={this.state.zip}></input>
                </div>
              </div>
          <div className='manage-home-amenities'>
            <label className='new-home-label'>Number of Beds</label>
            <select
              // onChange={this.handleChange('beds')}
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
          </div>
          <div className='manage-home-amenities'>
            <label className='new-home-label'>Number of Beds</label>
            <select
              // onChange={this.handleChange('beds')}
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
          </div>
        <div>
          <button  onClick={this.handleSubmit} className='property-submit'>Submit
          {this.state.submit ? <Redirect to={`/properties/${this.state.id}`} /> : ''}
          </button>
        </div>
      </div>
    )
  }
}

export default PropertyForm