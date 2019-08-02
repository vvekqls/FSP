import React from 'react';
import PropertyIndexItem from './property_index_item';
import BenchMap from '../map/map';

class PropertyIndex extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.fetchProperties();
  }
  render() {
    
    // const properties  = this.props
    if (!this.props.properties) return (<p>test</p>)
    const propertyItems = this.props.properties.map(property=> (
        <PropertyIndexItem
          key={ property.id}
          property = {property}
          
        />
      )
    );

    return (
      <div className='index-container'>
        <div className='map-container'>
          <BenchMap 
          properties={this.props.properties}
          singleProperty={true}

          />
        </div>
        <div className="index-items-container">
          <div className='real-estate'>
            <h4>Real Estate {this.props.properties.length} homes to rent</h4>
          </div>
          <ul className="index-items">
            
              {propertyItems}
          </ul>
        </div>
      </div> 
    )
  }
}

export default PropertyIndex;
