class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }

  updateMarkers(properties) {
    const PropertiesObj = {};
    properties.forEach(property => PropertiesObj[property.id] = property);
    
    properties
      .filter(property => !this.markers[property.id])
      .forEach(newProperty => this.createMarkerFromHome(newProperty));
  
    Object.keys(this.markers)
      .filter(propertyId => !PropertiesObj[propertyId])
      .forEach((propertyId) => this.removeMarker(this.markers[propertyId]));
  }

  createMarkerFromHome(property) {
    const icon = {
      url: window.blueDot,
      scaledSize: new google.maps.Size(15, 15)
    };
    const position = new google.maps.LatLng(property.latitude, property.longitude);
    
    const marker = new google.maps.Marker({
      
      icon,
      position,
      map: this.map,
      propertyId: property.id
    });

    marker.addListener('click', () => this.handleClick(property));
    this.markers[marker.propertyId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.propertyId].setMap(null);
    delete this.markers[marker.propertyId];
  }
}

export default MarkerManager;