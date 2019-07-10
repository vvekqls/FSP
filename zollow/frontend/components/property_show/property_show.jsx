import React from 'react';
import { Redirect } from 'react-router-dom'

class PropertyShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      close: false
    }
    this.closeShow = this.closeShow.bind(this);
  }

  closeShow() {
    this.setState({ close: true });
  }

  componentDidMount() {
    this.props.fetchProperty(this.props.match.params.propertyId)
  }

  render() {
    if (!this.props.property) return null
    const { address, baths, beds, ownerUsername, sale, rent, price, photoUrls } = this.props.property;
    return(
      
      <div className="image-show-container">
        <button
          onClick={this.closeShow}
          className='home-header-close'>X CLOSE
          {this.state.close || !this.props.property.id ? <Redirect exact to='/properties' /> : ''}
        </button>
        
        <div className='image-show-container'>
          <img className='image-show' src={photoUrls} alt="" />
        </div>

        <div className='index-item-data'>
          <span className="index-item-price"> ${price}</span>
          <span className="index-item-beds"> {beds} beds</span>
          <span className="index-item-beds"> {baths} baths</span>
          <br />
        </div>

        <div>
          <span className="index-item-adress"> {address}</span>
        </div>
      </div>
    )
  }
}


export default PropertyShow

