export const RECEIVE_PROPERTIES = "RECEIVE_PROPERTIES"
export const RECEIVE_PROPERTY = "RECEIVE_PROPERTY"

const receiveProperties = (properties) => {
  return({
    type: RECEIVE_PROPERTIES,
    properties
  })
}

const receiveProperty = (property, owner) => {
  return({
    type: RECEIVE_PROPERTY,
    property,
    owner
  })
}



export const fetchProperties = () => dispatch => (
  APIUtil.fetchProperties().then(properties => (
    dispatch(receiveProperties(properties))
  ))
);

export const fetchProperty = id => dispatch => (
  APIUtil.fetchProperty(id).then(property => (
    dispatch(receiveProperty(property))
  ))
);

export const createProperty = property => dispatch => (
  APIUtil.createProperty(property).then(property => (
    dispatch(receiveProperty(property))
  ))
);