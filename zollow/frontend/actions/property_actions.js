import * as APIUtil from '../util/property_api_util';

export const RECEIVE_PROPERTIES = "RECEIVE_PROPERTIES"
export const RECEIVE_PROPERTY = "RECEIVE_PROPERTY"
export const RECEIVE_PROPERTY_ERRORS = "RECEIVE_PROPERTY_ERRORS"

const receiveProperties = (properties) => {
  return({
    type: RECEIVE_PROPERTIES,
    properties
  })
}

const receiveProperty = (property) => {
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



export const fetchProperties = () => dispatch => (
  APIUtil.fetchProperties().then(properties => (
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

export const updateProperty = (property) => dispatch => (
  APIUtil.updateProperty(property.id).then(property => (
    dispatch(receiveProperty(property))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const deleteProperty = (id) => dispatch => (
  APIUtil.deleteProperty(id).then(message => (
    console.log(message)
  ), err => {
    return dispatch(receiveErrors(err.responseJSON))
  })
);