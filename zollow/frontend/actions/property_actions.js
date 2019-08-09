import * as APIUtil from '../util/property_api_util';

export const RECEIVE_PROPERTIES = "RECEIVE_PROPERTIES"
export const RECEIVE_PROPERTY = "RECEIVE_PROPERTY"
export const RECEIVE_PROPERTY_ERRORS = "RECEIVE_PROPERTY_ERRORS"
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY'

export const receiveProperties = (properties) => {
  return({
    type: RECEIVE_PROPERTIES,
    properties
  })
}

export const receiveProperty = (property) => {
  return({
    type: RECEIVE_PROPERTY,
    property
  })
}

export const receiveErrors = errors => {
  return {
    type: RECEIVE_PROPERTY_ERRORS,
    errors
  };
};

// export const removeProperty = (property) => {
//   return({
//     type: REMOVE_PROPERTY,
//     property
//   })
// }

export const fetchProperties = (filters) => dispatch => (
  APIUtil.fetchProperties(filters).then(properties => (
    dispatch(receiveProperties(properties))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const fetchProperty = id => dispatch => (
  APIUtil.fetchProperty(id).then(property => (
    dispatch(receiveProperty(property))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const createProperty = property => dispatch => (
  APIUtil.createProperty(property).then(property => (
    dispatch(receiveProperty(property))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateProperty = (property, id) => dispatch => (
  APIUtil.updateProperty(property, id).then(property => (
    dispatch(receiveProperty(property))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const deleteProperty = (id) => dispatch => (
  APIUtil.deleteProperty(id).then(message => (
    console.log(message)
  ), err => {
    return dispatch(receiveErrors(err.responseJSON));
  })
);

export const savedProperties = (propertyIds) => dispatch => (
  APIUtil.savedProperties(propertyIds).then(properties => (
    dispatch(receiveProperties(properties))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);