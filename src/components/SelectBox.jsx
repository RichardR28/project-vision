import React, { Component } from 'react';

export default class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  handleChange = (value) => {
    this.setState({ value: value });
    if (this.state.onChange) {
      this.state.onChange(value);
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'start' }}>
          {this.state.label || 'Custom Field'}:
        </div>
        <select
          id={this.state.id}
          name={this.state.name}
          onChange={(e) => this.handleChange(e.target.value)}
          title={this.state.title || null}
          value={this.state.value}
          style={{
            height: 33,
            borderRadius: 5,
            border: 'solid 1px #00000078',
          }}
        >
          {this.state.list
            ? this.state.list.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })
            : null}
        </select>
      </div>
    );
  }
}
