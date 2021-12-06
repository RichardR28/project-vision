import React, { Component } from 'react';

export default class CustomField extends Component {
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

  onLeaveField = (value) => {
    if (this.state.onBlur) {
      this.state.onBlur(value);
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
        <input
          id={this.state.id}
          name={this.state.name}
          placeholder={this.state.placeholder || ''}
          onChange={(e) => this.handleChange(e.target.value)}
          onBlur={(e) => this.onLeaveField(e.target.value)}
          value={this.state.value}
          type={this.state.type || 'text'}
          title={this.state.title || null}
          style={{
            height: 33,
            borderRadius: 5,
            border: 'solid 1px #00000078',
          }}
        />
      </div>
    );
  }
}
