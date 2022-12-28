import React from 'react';
import { useStyles } from './Input.style';

export default function CustomInput({ onKeyHandleChange, maxLength, type, className, placeholder, value, onHandleChange, error, errorLabel, ...props }) {
    const { name } = props;
    const classes = useStyles(props);
    return (
        <div className={'col m-1 p-0'} >
            <input
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"

                className={`form-control ${classes.inputContainer}  ${className}`}
                type={type || 'text'}
                placeholder={placeholder || ''}
                value={value}
                onChange={onHandleChange}
                name={name}
                onKeyPress={onKeyHandleChange}
                maxLength={maxLength}

            />
            {error && <p className={`animate__animated animate__shakeX ${classes.error}`}>{errorLabel}</p>}
        </div>
    )
}