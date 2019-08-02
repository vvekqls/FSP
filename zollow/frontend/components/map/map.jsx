import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker';


const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13
};

class BenchMap extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    // this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));  
    // this.registerListeners();
    // this.MarkerManager.updateMarkers(this.props.properties);
    
  }

  // componentDidUpdate() {
  //   if (this.props.singleBench) {
  //     const targetBenchKey = Object.keys(this.props.benches)[0];
  //     const targetBench = this.props.benches[targetBenchKey];
  //     this.MarkerManager.updateMarkers([targetBench]); //grabs only that one bench
  //   } else {
  //     this.MarkerManager.updateMarkers(this.props.benches);
  //   }
  // }

  // registerListeners() {
  //   // google.maps.event.addListener(this.map, 'idle', () => {
  //     const { north, south, east, west } = this.map.getBounds().toJSON();
  //     const bounds = {
  //       northEast: { lat: north, lng: east },
  //       southWest: { lat: south, lng: west }
  //     };
  //     this.props.updateFilter('bounds', bounds);
  //   });
  //   google.maps.event.addListener(this.map, 'click', (event) => {
  //     const coords = getCoordsObj(event.latLng);
  //     this.handleClick(coords);
  //   });
  // }

  handleMarkerClick(bench) {
    this.props.history.push(`properties/${property.id}`);
  }

  handleClick(coords) {
    this.props.history.push({
      pathname: '/properties',
      search: `lat=${coords.lat}&lng=${coords.lng}`
    });
  }

  render() {
    return (
      <div className="map" ref="map">
        Map
        {/* <Marker google={this.props.google}
          name={'Dolores park'}
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        />
        <Marker /> */}
      </div>
    );
  }
}

export default withRouter(BenchMap);
