import React, { Component } from "react";

export class Search extends Component {
  state = {
    text: "",
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text) {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    } else {
      this.props.setAlert("enter anthing to start search");
    }
    this.setState({ text: "" });
  };
  onClick = () => {
    this.props.clearUsers();
  };
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search for users'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type='submit' value='Search' className='btn bg-primary' />
        </form>
        {this.props.showClear && (
          <button
            className='btn bg-primary'
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#DDDDDD",
              border: "none",
              color: "black",
            }}
            onClick={this.onClick}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
