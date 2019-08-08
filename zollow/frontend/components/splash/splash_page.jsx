import React from 'react';
// import Footer from '../footer';
import { Redirect } from 'react-router-dom';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'buy', search: '', submit: false,
      loggedIn: this.props.loggedIn,
      
    };

    this.handleTypeButton = this.handleTypeButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById('home-page-search');
    const options = {
      componentRestrictions: { country: 'us' }
    };
    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    this.autocomplete.addListener('place_changed', this.handleChange);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: this.props.loggedIn });
    }
  }

  handleTypeButton(type) {
    return () => {
      this.setState({ type });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSearch();
  }

  handleSearch() {
    if (this.state.loggedIn || this.state.type !== 'sell') {
      this.props.updateFilter(this.type, true);
      this.props.updateFilter('area', this.state.search);
      this.setState({ submit: true });
    } else {
      this.props.openModal('login');
    }
  }

  handleChange(e) {
    if (this.autocomplete.getPlace()) {
      this.setState({ search: this.autocomplete.getPlace().formatted_address });
    } else {
      this.setState({ search: e.target.value });
    }
  }

  render() {
    const { selected, type, submit } = this.state;
    if (submit) return <Redirect to={`/${this.state.type}`} />;


    return (
      <div>
        <div className='splash-body'>
          {/* <h1 className="header-index">Reimagine home</h1>
          <h2 className="header-index-page">We'll help you find a place you'll love</h2> */}
          <div className='home-page-container'>
            <div className='home-page-buttons'>
              <button onClick={this.handleTypeButton('buy')} className={`home-page-button ${type === 'buy' ? 'selected' : ''}`}>Buy</button>
              <button onClick={this.handleTypeButton('rent')} className={`home-page-button ${type === 'rent' ? 'selected' : ''}`}>Rent</button>
              <button onClick={this.handleTypeButton('sell')} className={`home-page-button ${type === 'sell' ? 'selected' : ''}`}>Sell</button>
            </div>

            <span className={`search-selector ${type}`}></span>

            <div className='homepage-search-container'>
             
              <form onSubmit={this.handleSubmit}>
                <input
                  onChange={this.handleChange}
                  id='home-page-search'
                  placeholder='Enter a neighborhood, city, address or ZIP code'>
                </input>
              </form>
              <div className='hp-search-button-container'>
                <i onClick={this.handleSearch} className="fa fa-search fa-lg" aria-hidden="true"></i> 
                {/* <input  type='submit' className='home-page-search-button' value='Search' /> */}
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default SplashPage;
