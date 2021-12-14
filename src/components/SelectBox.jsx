import React, { useState } from 'react';

export default function SelectBox(props) {
  const [value, setValue] = useState(props.value);
  function handleChange(e) {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

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
  } = props;

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
        onChange={(e) => handleChange(e)}
        title={title || null}
        value={value}
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
