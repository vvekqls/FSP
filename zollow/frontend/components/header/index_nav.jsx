import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// import FilterModal from '../modal/filter_modal';

class IndexNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = { area: this.props.filters.area };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSavedProperties = this.handleSavedProperties.bind(this);
  }

  handleFilter(type) {
    return (e) => {
      this.props.openFilter(type);
    };
  }

  priceString(minPrice, maxPrice) {
    let priceStr;

    if (minPrice === 0 && maxPrice === 0) {
      priceStr = 'Any Price';
    } else if (minPrice === 0) {
      const mag = this.numMagnitude(maxPrice);
      priceStr = `Up To ${mag}`;
    } else if (maxPrice === 0) {
      const mag = this.numMagnitude(minPrice);
      priceStr = `${mag}+`;
    } else {
      const minMag = this.numMagnitude(minPrice);
      const maxMag = this.numMagnitude(maxPrice);
      priceStr = `${minMag} - ${maxMag}`;
    }

    return priceStr;
  }

  numMagnitude(num) {
    let mag = Math.round(num * 10) / 10;
    if (num > 1000000) {
      mag = `$${this.numRound(num, 1000000)}M`;
    } else if (num > 1000) {
      mag = `$${this.numRound(num / 1000)}K`;
    } else {
      mag = `$${num}`;
    }
    return mag;
  }

  numRound(num, mag) {
    return Math.round(num * 10) / 10;
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ area: e.target.value });
  }

  handleSubmit() {
    this.props.updateFilter('area', this.state.area);
  }

  handleSavedProperties() {
    if (this.props.loggedIn) {
      this.props.history.push('/savedProperties');
    } else {
      this.props.openModal('login');
    }
  }

  render() {
    const { maxPrice, minBaths, minBeds, minPrice } = this.props.filters;
    const priceStr = this.priceString(minPrice, maxPrice);

    return (
      <nav className='filter-nav'>
        {/* <FilterModal /> */}
        <ul className='filter-nav-lists'>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleSearch}
                className='index-search-bar'
                placeholder='Address, Neighborhoods, or ZIP'
                value={this.state.area}>
              </input>
            </form>
          </li>
          <li>
            <button
              onClick={this.handleFilter('price')}>
              {priceStr} <span>&#9660;</span>
            </button>
          </li>
          <li>
            <button
              onClick={this.handleFilter('beds')}>
              {minBeds}+ Beds <span>&#9660;</span>
            </button>
          </li>
          <li>
            <button
              onClick={this.handleFilter('baths')}>
              {minBaths}+ Baths <span>&#9660;</span>
            </button>
          </li>
        </ul>
        <button onClick={this.handleSavedProperties} id='saved-homes-button'>{`Saved Homes (${this.props.savedProperties.length})`}</button>
      </nav>
    );
  }
}

export default IndexNav;
