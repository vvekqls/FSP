export const selectProperty = ({ properties }, propertyId) => {
  return properties[propertyId] || {}
};