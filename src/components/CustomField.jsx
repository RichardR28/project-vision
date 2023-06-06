import React from 'react';

export default function CustomField(props) {
  function handleChange(value) {
    if (props.onChange) {
      props.onChange(value);
    }
  }

  function onLeaveField(value) {
    if (props.onBlur) {
      props.onBlur(value);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={
          props.noLabel
            ? { display: 'none' }
            : { textAlign: 'start', padding: '5px 0' }
        }
      >
        {props.label || 'Custom Field'}:
        {props.required && '*'}
      </div>
      <input
        id={props.id}
        name={props.name}
        onKeyPress={(e) => (props.onKeyPress ? props.onKeyPress(e) : () => {})}
        placeholder={props.placeholder || ''}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={(e) => onLeaveField(e.target.value)}
        value={props.value}
        type={props.type || 'text'}
        title={props.title || null}
        disabled={props.disabled || null}
        maxLength={props.maxLength || null}
        min={
          props.type === 'number' &&
          props.min !== null &&
          props.min !== undefined
            ? props.min
            : null
        }
        style={
          !props.disabled
            ? {
                height: 33,
                borderRadius: 5,
                border: 'solid 1px #00000078',
              }
            : {
                cursor: 'not-allowed',
                height: 33,
                borderRadius: 5,
                border: 'solid 1px rgb(0 0 0 / 24%)',
              }
        }
      />
    </div>
  );
}
