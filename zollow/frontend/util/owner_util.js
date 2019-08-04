export default ownerId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${ownerId}`
  })
)