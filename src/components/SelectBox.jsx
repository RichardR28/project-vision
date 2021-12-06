import React, { Component } from 'react';

export default class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
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
      disabled,
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
          onChange={(e) => this.handleChange(e)}
          title={title || null}
          value={this.state.value}
          style={{
            height: 33,
            borderRadius: 5,
            border: 'solid 1px #00000078',
          }}
          disabled={disabled}
        >
          <option value="" key={0}>
            Selecione
          </option>
          {list && list.length > 0
            ? list.map((item) => {
                return (
                  <option key={item[idCol]} value={item[idCol]}>
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
