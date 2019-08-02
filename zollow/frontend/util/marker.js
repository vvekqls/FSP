
// class MarkerManager {
//   constructor(map, handleClick) {
//     this.map = map;
//     this.handleClick = handleClick;
//     this.markers = {};
//   }
  
//   updateMarkers(properties) {
//     const propertiesObj = {};
//     properties.forEach(property => propertiesObj[property.id] = property)

//     properties
//       .filter(property => !this.markers[property.id])
//       .forEach(newProperty => this.createMarkerFromProperty(newProperty, this.handleClick))
//   }

//   createMarkerFromProperty(property) {
//     const position = new google.map.LatLng(property.latittude, property.longitude)
//     const marker = new google.maps.Marker({
//       position,
//       map: this.map,
//       propertyId: property.id
//     });

//     marker.addListener('click', ()=> this.handleClick(property));
//     this.marker[marker.propertyId] = marker;
//   }

//   removeMarker(marker) {
//     this.markers[marker.propertyId].setMap(null);
//     delete this.markers[marker.propertyId];
//   }
// }

// export default MarkerManager