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
      <div>
        THis page will be my properties page
         {/* <BenchMap /> */}
        <ul>
          {propertyItems}
        </ul>
      </div>   
    )
  }
}

export default PropertyIndex;
