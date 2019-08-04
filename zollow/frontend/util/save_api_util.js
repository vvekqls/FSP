export const createSave = (propertyId) => {
  return $.ajax({
    method: 'POST',
    url: '/api/saves',
    data: { property_id: propertyId },
    error: (err) => console.log(err)
  });
};

export const deleteSave = (property_id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/saves/${property_id}`,
    error: (err) => console.log(err)
  });
};