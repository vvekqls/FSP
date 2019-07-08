export const fecthProperties = () => (
  $.ajax({
    method: 'GET',
    url: 'api/properties',
    error: (err) => console.log(err)
  })
)

export const fetchProperty = id => (
  $.ajax({
    method: 'GET',
    url: `api/properties/${id}`,
    error: (err) => console.log(err)
  })
)

export const createProperty = propertyform => (
  $.ajax({
    method: 'POST',
    url: 'api/properties',
    data: propertyform,
    contentType: false,
    processData: false,
    error: (err) => console.log(err)
  })
);

export const updateProperty = (property) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/properties/${property.id}/`,
    data: {property},
    contentType: false,
    processData: false,
    error: (err) => console.log(err)
  });
};

export const deleteProperty = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/properties/${id}`,
    error: err => console.log
  });
};

