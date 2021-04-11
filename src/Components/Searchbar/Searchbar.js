import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
  };

  changeHandler = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);

    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.submitHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeHandler}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
