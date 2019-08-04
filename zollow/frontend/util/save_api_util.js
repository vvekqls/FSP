export const createSave = (homeId) => {
  return $.ajax({
    method: 'POST',
    url: '/api/saves',
    data: { home_id: homeId },
    error: (err) => console.log(err)
  });
};

export const deleteSave = (home_id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/saves/${home_id}`,
    error: (err) => console.log(err)
  });
};