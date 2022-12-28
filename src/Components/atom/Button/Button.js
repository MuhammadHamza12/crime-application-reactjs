import React from 'react';
import { useStyles } from './Button.style';

export default function Button({ className, onPress, children, isLoading = false,...props}) {
    const classes = useStyles(props);
    return (
        <button className={`${classes.buttonContainer} ${className}`} disabled={isLoading} onClick={onPress} >
            {!isLoading && children}
            {isLoading && <div class="spinner-border"></div>}
        </button>
    );
}