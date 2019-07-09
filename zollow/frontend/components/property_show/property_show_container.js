import { connect } from 'react-redux';

import { fetchProperty } from '../../actions/property_actions';
import PropertyShow from './property_show';

const mapStateToProps = (state, { match }) => {
  const propertyId = parseInt(match.params.property.id);
  const property = selectProperty(state.entities, propertyId);
  
  return {
    propertyId,
    property,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBench: id => dispatch(fetchProperty(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyShow);
