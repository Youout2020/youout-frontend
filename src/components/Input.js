import React from 'react';
import styles from './Input.module.scss';

const Input = ({
  type,
  id,
  labelName,
  value,
  name,
  placeholder,
  onChange,
  ...attrs
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{labelName}</label>
      {
        type === 'text' &&
        <input
          type='text'
          value={value}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required
          {...attrs}
        />
      }
      {
        type === 'select' &&
        <select
          name={name}
          id={id}
          onChange={onChange}
          defaultValue={1000 * 60 * 10}
        >
          <option value={1000 * 60 * 10}>10분</option>
          <option value={1000 * 60 * 20}>20분</option>
          <option value={1000 * 60 * 30}>30분</option>
          <option value={1000 * 60 * 40}>40분</option>
          <option value={1000 * 60 * 50}>50분</option>
          <option value={1000 * 60 * 60}>1시간</option>
        </select>
      }
    </div>
  );
};

export default React.memo(Input);