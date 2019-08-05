import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { ProtectedRoute } from '../../util/route_util';

import PropertyMap from '../map/map';
import PropertyListing from './property_listing';
import PropertyShow from '../property_show/property_show_container'
import CreateProperty from '../property_show/create_property'
import EditProperty from '../property_show/edit_property';
import SavedProperties from './saved_properties';

class PropertyIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      area: props.filters.area,
      completedType: false
    };
  }

  // componentDidMount() {
  //   // debugger
  //   if (this.state.type !== 'sell' || this.state.type !== 'savedproperties') {
  //     this.props.updateFilter(this.state.type, true);
  //   }
  // }

  componentDidUpdate(prevProps) {
    const keys = Object.keys(this.props.filters);
    const newType = /[a-z]{3,}/.exec(this.props.location.pathname)[0];

    if (newType === 'savedproperties') return;

    for (let i = 0; i < keys.length; i++) {
      if (prevProps.filters[keys[i]] !== this.props.filters[keys[i]]) {
        this.setState({
          area: this.props.filters.area,
          type: newType
        });

        this.props.fetchProperties(this.props.filters);
        break;
      }
    }
  }


  render() {
    const type = this.props.type;

    return (
      <div className='index-body'>
        <PropertyMap area={this.state.area} />
        {type === 'savedproperties' ?
          <ProtectedRoute component={SavedProperties} type={type} /> :
          <PropertyListing type={type} />}
        <Switch>
          <ProtectedRoute exact path={'/sell'} component={CreateProperty} />
          <ProtectedRoute path={'/sell/:propertyId/edit'} component={EditProperty} />
          <Route path={`/${type}/:propertyId`} component={PropertyShow} />
        </Switch>
      </div>
    );
  }
}

export default PropertyIndex;

