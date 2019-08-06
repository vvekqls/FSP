import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../../actions/filter_actions';
import { closeModal } from '../../actions/modal_actions';

class IndexNavBeds extends React.Component {
  constructor(props) {
    super(props);
  }

  createOptions() {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const selected = (i === this.props.minBeds ? 'selected' : '');

      options.push(
        <li key={i} className={`bed-item ${selected}`}
          onClick={this.handleClick(i)}>
          {i}+
        </li>
      );
    }

    return options;
  }

  handleClick(num) {
    return () => {
      this.props.updateFilter('minBeds', num);
      this.props.closeModal();
    };
  }

  render() {
    const bedOptions = this.createOptions();

    return (
      <div className='bed-container'>
        <ul className='bed-list'>
          {bedOptions}
        </ul>
      </div>
    );
  }
}

const msp = state => {
  return {
    minBeds: state.ui.filters.minBeds
  };
};

const mdp = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(msp, mdp)(IndexNavBeds);
