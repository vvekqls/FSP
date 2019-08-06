import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../../actions/filter_actions';
import { closeModal } from '../../actions/modal_actions';

class IndexNavBaths extends React.Component {
  constructor(props) {
    super(props);
  }

  createOptions() {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const selected = (i === this.props.minBaths ? 'selected' : '');

      options.push(
        <li key={i} className={`bath-item ${selected}`}
          onClick={this.handleClick(i)}>
          {i}+
        </li>
      );
    }

    return options;
  }

  handleClick(num) {
    return () => {
      this.props.updateFilter('minBaths', num);
      this.props.closeModal();
    };
  }

  render() {
    const bathOptions = this.createOptions();

    return (
      <div className='bath-container'>
        <ul className='bath-list'>
          {bathOptions}
        </ul>
      </div>
    );
  }
}

const msp = state => {
  return {
    minBaths: state.ui.filters.minBaths
  };
};

const mdp = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(msp, mdp)(IndexNavBaths);
