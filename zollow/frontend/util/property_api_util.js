export const fetchProperties = (data) => {
  return $.ajax({
    method: 'GET',
    url: '/api/properties',
    data,
    error: (err) => console.log(err)
  });
};

export const fetchProperty = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/properties/${id}`,
    error: (err) => console.log(err)
  });
};

export const createProperty = (property) => {
  return $.ajax({
    method: 'POST',
    url: '/api/properties',
    data: property,
    contentType: false,
    processData: false
  });
};

export const updateProperty = (property, id) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/properties/${id}`,
    data: property,
    contentType: false,
    processData: false
  });
};

export const deleteProperty = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/properties/${id}`,
    error: err => console.log
  });
};

// export const savedHomes = PropertyIds => {
//   return $.ajax({
//     method: 'GET',
//     url: '/api/homes/savedhomes',
//     data: { property_ids: propertyIds },
//     error: (err) => console.log(err)
//   });
// };
