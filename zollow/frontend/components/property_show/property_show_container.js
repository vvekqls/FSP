import { connect } from 'react-redux';

import { fetchProperty } from '../../actions/property_actions';
import { selectProperty } from '../../reducers/selector'
import PropertyShow from './property_show';

const mapStateToProps = (state, ownProps) => {
  const propertyId = parseInt(ownProps.match.params.propertyId);
  const property = selectProperty(state.entities, propertyId);
  
  return {
    propertyId,
    property,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProperty: id => dispatch(fetchProperty(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyShow);
