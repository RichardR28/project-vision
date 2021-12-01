import React, { Component } from 'react';

export default class SelectBox extends Component {
  handleChange = (value) => {
    this.setState({ value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const {
      idCol,
      valueCol,
      complementCol,
      list,
      label,
      id,
      name,
      title,
      value,
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'start' }}>{label || 'Custom Field'}:</div>
        <select
          id={id}
          name={name}
          onChange={(e) => this.handleChange(e.target.value)}
          title={title || null}
          value={value}
          style={{
            height: 33,
            borderRadius: 5,
            border: 'solid 1px #00000078',
          }}
        >
          {list && list.length > 0
            ? list.map((item, index) => {
                return (
                  <option key={index} value={item[idCol]}>
                    {complementCol
                      ? `${item[valueCol]} - ${item[complementCol]}`
                      : item[valueCol]}
                  </option>
                );
              })
            : null}
        </select>
      </div>
    );
  }
}
