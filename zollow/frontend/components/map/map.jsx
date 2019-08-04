import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateFilter, changeFilter } from '../../actions/filter_actions';
import { receiveErrors } from '../../actions/property_actions';
// import MarkerManager from '../../util/marker_manager';

const mapOptions = {
  center: { lat: 39.8283, lng: -98.5795 },
  minZoom: 3,
  zoom: 4
};

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

class PropertyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  getLatLng(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

        mapOptions.center.lat = results[0].geometry.location.lat();
        mapOptions.center.lng = results[0].geometry.location.lng();
        mapOptions.zoom = 13;

        this.createMap();
        this.getAddressFromLatLng(mapOptions.center.lat, mapOptions.center.lng);
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    }.bind(this));
  }

  createMap() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    // this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.registerListeners();
    // this.MarkerManager.updateMarkers(this.props.homes);
  }

  getAddressFromLatLng(lat, lng) {
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          this.props.changeFilter('area', results[0].formatted_address);
        } else {
          this.props.createErrors('Address not found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    }.bind(this));
  }

  componentDidMount() {
    if (this.props.area !== '') {
      this.getLatLng(this.props.area);
    } else {
      this.createMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.area !== this.props.area) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'address': this.props.area }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          this.map.setCenter(new google.maps.LatLng(lat, lng));
          this.map.setZoom(13);
        }
      }.bind(this));
    }
    // if (this.MarkerManager) {
    //   this.MarkerManager.updateMarkers(this.props.homes);
    // }
  }

  render() {
    return (
      <div id='map-container' ref={map => this.mapNode = map}>
      </div>
    );
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.updateFilter('bounds', bounds);
    });
    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng);
      // this.handleClick(coords);
    });
  }

  handleMarkerClick(property) {
    this.props.history.push(`/${this.props.type}/${property.id}`);
  }

  // handleClick(coords) {
  //   this.props.history.push({
  //     pathname: '/homes/',
  //     search: `lat=${coords.lat}&lng=${coords.lng}`
  //   });
  // }
}

const msp = state => {
  return {
    filters: state.ui.filters,
    properties: Object.values(state.entities.properties)
  };
};

const mdp = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    createErrors: (err) => dispatch(receiveErrors(err))
  };
};


export default withRouter(connect(msp, mdp)(PropertyMap));
