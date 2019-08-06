import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../../actions/filter_actions';
import { closeModal } from '../../actions/modal_actions';
import IndexNavPriceButtons from './navbar_price_button';

class IndexNavPrice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: 'min',
      minPrice: this.props.minPrice,
      maxPrice: this.props.maxPrice
    };

    this.handlePrice = this.handlePrice.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refs['min'].focus();
  }

  changeFocus() {
    if (this.state.viewing === 'min') {
      this.setState({ viewing: 'max' });
      this.refs['max'].focus();
    } else {
      this.props.closeModal();
    }
  }

  handlePrice(type) {
    return (e) => {
      const numsOnly = e.target.value.replace(/\D/g, '');
      const amt = this.strToInt(numsOnly);
      this.setState({ [type]: amt });
    };
  }

  handleView(type) {
    return () => this.setState({ viewing: type });
  }

  strToInt(x) {
    if (typeof x === 'number') return x;
    return parseInt(x.replace(/,/g, '')) || 0;
  }

  handleSubmit(type) {
    return (e) => {
      e.preventDefault();
      let price = this.state[type];
      if (type === 'maxPrice' && this.state.minPrice > this.state.maxPrice) {
        price = 0;
      }
      this.props.updateFilter(type, price);
      this.changeFocus();
    };
  }

  render() {
    const { viewing } = this.state;
    const minPrice = this.state.minPrice !== 0 ? this.state.minPrice : "";
    const maxPrice = this.state.maxPrice !== 0 ? this.state.maxPrice : "";

    return (
      <div>
        <div className='price-input'>
          <form onSubmit={this.handleSubmit('minPrice')}>
            <input
              onChange={this.handlePrice('minPrice')}
              onClick={this.handleView('min')}
              type='text' placeholder='Min'
              ref='min'
              value={minPrice}
            />
          </form>
          &ndash;
          <form onSubmit={this.handleSubmit('maxPrice')}>
            <input
              onChange={this.handlePrice('maxPrice')}
              onClick={this.handleView('max')}
              type='text'
              placeholder='Max'
              ref='max'
              value={maxPrice}
            />
          </form>
        </div>

        <hr />

        {
          this.state.viewing === 'min' ?
            <IndexNavPriceButtons
              type='min'
              minPrice={this.strToInt(minPrice)}
              maxPrice={this.strToInt(maxPrice)}
              updateFilter={this.props.updateFilter}
              setState={this.setState.bind(this)}
              changeFocus={this.changeFocus.bind(this)}
            /> :
            <IndexNavPriceButtons
              type='max'
              minPrice={this.strToInt(minPrice)}
              maxPrice={this.strToInt(maxPrice)} updateFilter={this.props.updateFilter}
              setState={this.setState.bind(this)}
              changeFocus={this.changeFocus.bind(this)}
            />
        }
      </div>
    );
  }
}

const msp = state => {
  return {
    minPrice: state.ui.filters.minPrice,
    maxPrice: state.ui.filters.maxPrice
  };
};

const mdp = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(msp, mdp)(IndexNavPrice);